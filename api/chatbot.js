// Vercel Serverless Function - Chatbot AI Endpoint
// Bezpieczne wywołanie Claude API (klucz ukryty w environment variables)

// Google Sheets logging endpoint
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwIjiWW5Fd5XtizXHiBXV0SRk9OFM1rnuLULMq8oHmdqDZIYPm_CPuQo12vsrhCRVph/exec';

async function logToGoogleSheets(question, answer, source) {
    try {
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
        }
    } catch (error) {
        console.error('Error logging to Google Sheets:', error);
    }
}

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        const { message } = req.body;

        // Validate input
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Invalid message'
            });
        }

        // Get API key from environment variable
        const apiKey = process.env.CLAUDE_API_KEY;

        if (!apiKey) {
            console.error('CLAUDE_API_KEY not configured');
            return res.status(500).json({
                success: false,
                error: 'AI not configured'
            });
        }

        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 500,
                system: `Jesteś asystentem chatbota na stronie Katarzyny Dudek - doradcy zawodowego.

TWOJA ROLA:
- Odpowiadaj na pytania o doradztwo zawodowe, karierę, CV, rekrutację
- Bądź pomocny, przyjazny i profesjonalny
- Używaj polskiego języka
- WAŻNE: Odpowiedzi MAX 3-4 krótkie zdania! Nie pisz długich wypracowań!

KONTEKST O KASII:
- Doradca zawodowy z 5-letnim doświadczeniem
- Specjalizacja: zmiana pracy/branży, CV, przygotowanie do rozmów
- Lokalizacja: Mikołów (śląskie), pracuje też online
- Ceny: Konsultacja 180 zł, CV 140 zł, Rozmowa 200 zł, Testy 250 zł
- Kontakt: kontakt@kasiadudek.pl, +48 733 111 874

ZASADY:
1. NIE odpowiadaj na pytania o:
   - Rabaty, promocje, negocjacje cen
   - Szczegółowe terminy, rezerwacje
   - Kwestie biznesowe (targi, współpraca B2B)

2. W tych przypadkach ZAWSZE przekieruj do Kasi:
   "To pytanie najlepiej omówić bezpośrednio z Kasią: kontakt@kasiadudek.pl lub +48 733 111 874"

3. Jeśli pytanie dotyczy czegoś poza doradz twem zawodowym (np. "czy naprawiasz samochody?"):
   Wyjaśnij że to strona doradcy zawodowego, nie [co user myśli]

4. WAŻNE - Jeśli ktoś PODAJE swój numer telefonu prosząc o kontakt:
   "Świetnie! Aby Kasia mogła do Ciebie oddzwonić, kliknij zielony przycisk 📞 'Oddzwonię do Ciebie' (prawy dolny róg) i wpisz swój numer tam - dostaniesz telefon w ciągu 2-4h! Możesz też zadzwonić bezpośrednio: +48 733 111 874"

5. Bądź empatyczny - ludzie często mają problemy zawodowe i potrzebują wsparcia`,
                messages: [{
                    role: 'user',
                    content: message
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Claude API error:', response.status, errorData);
            return res.status(500).json({
                success: false,
                error: 'AI service error'
            });
        }

        const data = await response.json();

        // Extract response text
        const aiResponse = data.content?.[0]?.text;

        if (!aiResponse) {
            console.error('Invalid AI response format:', data);
            return res.status(500).json({
                success: false,
                error: 'Invalid AI response'
            });
        }

        // Log conversation to Google Sheets (async, don't wait)
        logToGoogleSheets(message, aiResponse, 'AI').catch(err => {
            console.error('Failed to log to Google Sheets:', err);
            // Don't fail the request if logging fails
        });

        // Return successful response
        return res.status(200).json({
            success: true,
            response: aiResponse
        });

    } catch (error) {
        console.error('Chatbot API error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
