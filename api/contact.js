// Vercel Serverless Function - Contact Form
// Handles contact form submissions and sends emails

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        const { name, email, phone, service, message, consent } = req.body;

        // Validate input
        if (!name || !email || !message || !consent) {
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

        // Get Web3Forms key
        const web3FormsKey = process.env.WEB3FORMS_KEY;

        if (!web3FormsKey) {
            console.error('WEB3FORMS_KEY not configured');
            return res.status(500).json({
                success: false,
                error: 'Email service not configured'
            });
        }

        // Service labels
        const serviceLabels = {
            'konsultacja': 'Konsultacja 1-1',
            'cv': 'Budowanie CV',
            'rozmowa': 'Przygotowanie do rozmowy',
            'testy': 'Testy predyspozycji',
            'inne': 'Inne'
        };

        const serviceLabel = serviceLabels[service] || service || 'Nie wybrano';

        // Send to Kasia
        const emailData = {
            access_key: web3FormsKey,
            subject: `📩 Nowa wiadomość z formularza kontaktowego - ${serviceLabel}`,
            from_name: `${name} (via kasiadudek.pl)`,
            email: 'kontakt@kasiadudek.pl',
            replyto: email,
            message: `
Nowa wiadomość z formularza kontaktowego!

📋 Szczegóły:
──────────────────────────────────
Imię i nazwisko: ${name}
Email: ${email}
Telefon: ${phone || 'Nie podano'}
Interesująca usługa: ${serviceLabel}

💬 Wiadomość:
──────────────────────────────────
${message}

──────────────────────────────────
Data: ${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}
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
        console.log('Contact email sent successfully:', responseData);

        // Send auto-reply to user
        const autoReplyData = {
            access_key: web3FormsKey,
            subject: '✅ Otrzymaliśmy Twoją wiadomość - kasiadudek.pl',
            from_name: 'Katarzyna Dudek - Doradca Zawodowy',
            email: email,
            name: name,
            message: `
Cześć ${name}!

Dziękuję za wiadomość! 🙏

Otrzymałam Twoje zapytanie dotyczące: **${serviceLabel}**

Postaram się odpowiedzieć w ciągu 24 godzin (najczęściej znacznie szybciej!).

W międzyczasie:
📱 Możesz też zadzwonić: 518 618 058
📧 Lub napisać bezpośrednio: kontakt@kasiadudek.pl

**Twoje dane:**
${phone ? `📞 Telefon: ${phone}` : ''}
💬 Twoja wiadomość: "${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"

Do szybkiego kontaktu!

---

Pozdrawiam serdecznie,
Katarzyna Dudek
Doradca Zawodowy

🌐 kasiadudek.pl
            `.trim()
        };

        // Send auto-reply (don't wait for response)
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(autoReplyData)
        }).catch(err => console.error('Failed to send auto-reply:', err));

        // Return success
        return res.status(200).json({
            success: true,
            message: 'Wiadomość została wysłana! Odpowiem najszybciej jak to możliwe.'
        });

    } catch (error) {
        console.error('Contact endpoint error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
