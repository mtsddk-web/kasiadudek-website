// Vercel Serverless Function - Lead Magnet (E-book)
// Sends email with e-book download link

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        const { name, email, consent } = req.body;

        // Validate input
        if (!name || !email || !consent) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Get SMSAPI token for email sending
        // Note: SMSAPI also supports email sending via SMTP
        // Alternatively, use Web3Forms or SendGrid

        // For now, we'll use Web3Forms as it's simpler for email
        const web3FormsKey = process.env.WEB3FORMS_KEY;

        if (!web3FormsKey) {
            console.error('WEB3FORMS_KEY not configured');
            return res.status(500).json({
                success: false,
                error: 'Email service not configured'
            });
        }

        // Prepare email content
        const emailData = {
            access_key: web3FormsKey,
            subject: '📚 Twój e-book "5 kroków do wymarzonej kariery" - kasiadudek.pl',
            from_name: 'Katarzyna Dudek - Doradca Zawodowy',
            email: email,
            name: name,
            message: `
Cześć ${name}!

Dziękuję za zaufanie i pobranie mojego e-booka! 🎉

📥 **Pobierz e-book tutaj:**
https://kasiadudek.pl/ebook/5-krokow-do-wymarzonej-kariery.pdf

W e-booku znajdziesz:
✅ 5 konkretnych kroków do zmiany kariery
✅ Ćwiczenia do samopoznania
✅ Szablony CV i list motywacyjnych
✅ Wskazówki dotyczące rozmów kwalifikacyjnych

**Co dalej?**

Jeśli potrzebujesz indywidualnego wsparcia, umów darmową 15-minutową konsultację:
🔗 https://kasiadudek.pl/#contact

Pamiętaj - nie jesteś sam/sama w tej podróży! 💪

---

Pozdrawiam serdecznie,
Katarzyna Dudek
Doradca Zawodowy

📞 518 618 058
📧 kontakt@kasiadudek.pl
🌐 kasiadudek.pl
            `.trim()
        };

        // Send via Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Web3Forms error:', response.status, errorData);
            return res.status(500).json({
                success: false,
                error: 'Failed to send email'
            });
        }

        const responseData = await response.json();
        console.log('E-book email sent successfully:', responseData);

        // Also notify Kasia about new lead
        const notifyData = {
            access_key: web3FormsKey,
            subject: '🎯 Nowy lead - pobranie e-booka',
            from_name: 'Strona kasiadudek.pl',
            email: 'kontakt@kasiadudek.pl',
            message: `
Nowy lead pobrał e-book!

Imię: ${name}
Email: ${email}
Data: ${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}

Warto odezwać się za 2-3 dni z follow-upem! 📧
            `.trim()
        };

        // Send notification (don't wait for response)
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notifyData)
        }).catch(err => console.error('Failed to send notification:', err));

        // Return success
        return res.status(200).json({
            success: true,
            message: 'E-book został wysłany na Twój email!'
        });

    } catch (error) {
        console.error('E-book endpoint error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
