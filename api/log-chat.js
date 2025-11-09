// Vercel Serverless Function - Log chat conversations to Google Sheets

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwIjiWW5Fd5XtizXHiBXV0SRk9OFM1rnuLULMq8oHmdqDZIYPm_CPuQo12vsrhCRVph/exec';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        const { question, answer, source } = req.body;

        // Validate input
        if (!question || !answer || !source) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: question, answer, source'
            });
        }

        // Send to Google Sheets
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                question: question,
                answer: answer,
                source: source
            })
        });

        if (!response.ok) {
            console.error('Google Sheets logging failed:', response.status);
            return res.status(500).json({
                success: false,
                error: 'Failed to log to Google Sheets'
            });
        }

        // Return success
        return res.status(200).json({
            success: true
        });

    } catch (error) {
        console.error('Log chat error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
