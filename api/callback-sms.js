// Vercel Serverless Function - Callback widget SMS notification

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        const { name, phone, preferredTime } = req.body;

        // Validate input
        if (!name || !phone || !preferredTime) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Get SMSAPI token from environment
        const smsApiToken = process.env.SMSAPI_TOKEN;

        if (!smsApiToken) {
            console.error('SMSAPI_TOKEN not configured');
            return res.status(500).json({
                success: false,
                error: 'SMS service not configured'
            });
        }

        // Translate preferred time to Polish
        const timeLabels = {
            'morning': 'Rano (9:00-12:00)',
            'afternoon': 'Popołudnie (12:00-16:00)',
            'evening': 'Wieczór (16:00-18:00)'
        };

        const timeLabel = timeLabels[preferredTime] || preferredTime;

        // Prepare SMS message
        const smsMessage = `🔔 Callback: ${name}\nTel: ${phone}\nPora: ${timeLabel}\nkasiadudek.pl`;

        // Send SMS via SMSAPI.pl
        const smsResponse = await fetch('https://api.smsapi.pl/sms.do', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${smsApiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: '518618058', // Numer Kasi
                message: smsMessage,
                format: 'json',
                from: 'Kasia' // Nazwa nadawcy (max 11 znaków)
            })
        });

        if (!smsResponse.ok) {
            const errorData = await smsResponse.text();
            console.error('SMSAPI error:', smsResponse.status, errorData);
            return res.status(500).json({
                success: false,
                error: 'Failed to send SMS'
            });
        }

        const smsData = await smsResponse.json();
        console.log('SMS sent successfully:', smsData);

        // Return success
        return res.status(200).json({
            success: true,
            message: 'SMS notification sent'
        });

    } catch (error) {
        console.error('Callback SMS error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
