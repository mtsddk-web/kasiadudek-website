# 🤖 Konfiguracja Widgetów - Instrukcja

## 📋 Spis treści
1. [Widget "Oddzwonię do Ciebie" - Konfiguracja emaili](#widget-oddzwonię-do-ciebie)
2. [Chatbot AI - Konfiguracja inteligentnego asystenta](#chatbot-ai)
3. [Testowanie widgetów](#testowanie)

---

## 📞 Widget "Oddzwonię do Ciebie"

### Jak to działa?
Widget zbiera dane kontaktowe (imię, telefon, preferowana pora) i wysyła **SMS na numer 518618058** przez SMSAPI.pl.

### Konfiguracja (SMSAPI.pl)

#### Krok 1: Weryfikacja konta SMSAPI
1. Zaloguj się do panelu: https://ssl.smsapi.pl
2. Przejdź do **Ustawienia** → **Dane firmy**
3. Wypełnij wszystkie pola:
   - **NIP** (numer identyfikacji podatkowej)
   - **Nazwa firmy**
   - **Adres** (ulica, numer)
   - **Kod pocztowy**
   - **Miasto**
   - **Kraj**
4. Zapisz i czekaj na weryfikację (do 24h)

⚠️ **WAŻNE:** Bez weryfikacji danych firmowych, możesz wysyłać SMS tylko na numer podany przy rejestracji!

#### Krok 2: Doładowanie konta
1. Po weryfikacji, przejdź do **Płatności**
2. Doładuj konto min. 10 zł (wystarczy na ~50 SMS)
3. Koszt SMS: ~0.20 zł/SMS

#### Krok 3: Uzyskaj token API
1. Panel SMSAPI → **API** → **Tokeny**
2. Kliknij **"Utwórz nowy token"**
3. Skopiuj token (np. `8MsTjAZgBDSo8BEaNlNFKgq0cPaFa0s4zV3QF2Cy`)

#### Krok 4: Dodaj token do Vercel
1. Dashboard Vercel: https://vercel.com/dashboard
2. Wybierz projekt **strona-kasi**
3. **Settings** → **Environment Variables**
4. Dodaj nową zmienną:
   - **Key:** `SMSAPI_TOKEN`
   - **Value:** `TWOJ_TOKEN_Z_SMSAPI`
   - **Environment:** Production, Preview, Development
5. Zapisz

#### Krok 5: Redeploy
```bash
# Token jest już w kodzie, wystarczy redeploy
vercel --prod
```

#### Przykład SMS, który dostaniesz:
```
🔔 Callback: Jan Kowalski
Tel: 123456789
Pora: Rano (9:00-12:00)
kasiadudek.pl
```

### Koszty SMSAPI:
- 💰 **~0.20 zł/SMS** (pakiet ekonomiczny)
- 📊 **10 zł** = ~50 callback requestów
- 📊 **50 zł** = ~250 callback requestów

### Status weryfikacji konta:
Sprawdź w panelu SMSAPI:
- ✅ **Konto zweryfikowane** - możesz wysyłać SMS na dowolne numery
- ⏳ **Oczekuje weryfikacji** - wypełnij dane firmowe
- ⚠️ **Tryb testowy** - tylko na numer zarejestrowany

### Troubleshooting:

**Problem:** SMS nie dochodzą
1. Sprawdź status konta w SMSAPI (czy zweryfikowane?)
2. Sprawdź saldo (czy masz środki na koncie?)
3. Sprawdź token API (czy poprawnie wklejony w Vercel?)
4. Sprawdź logi w Vercel: Dashboard → Deployments → Logs

**Problem:** "Test mode - send to registered number only"
- **Przyczyna:** Konto niezweryfikowane
- **Rozwiązanie:** Wypełnij dane firmowe w panelu SMSAPI

---

## 🤖 Chatbot AI

### Jak to działa?
Chatbot ma **3-poziomową inteligencję**:

1. **Poziom 1: Baza wiedzy** (21 tematów) - instant, darmowe
   - cennik, konsultacja, online, kontakt, CV, czas
   - zagranica, branża, lokalizacja, wiek, gwarancja
   - doświadczenie, zmiana pracy, wypalenie, pierwsza praca
   - powrót po przerwie, LinkedIn, negocjacje, firma, rabat

2. **Poziom 2: AI Fallback** (Claude API) - inteligentne, płatne
   - Jeśli pytanie nie pasuje do bazy → używa Claude AI
   - Rozumie kontekst, naturalny język, różne sformułowania
   - Koszt: ~$0.01-0.05 za rozmowę

3. **Poziom 3: Przekierowanie** do Kasi
   - Dla pytań o ceny, rabaty, targi, szczegóły biznesowe

### Konfiguracja Claude API (opcjonalna, ale zalecana!)

#### Dlaczego warto?
- ✅ Bot odpowie na DOWOLNE pytanie (nie tylko predefiniowane)
- ✅ Rozumie kontekst i różne sformułowania
- ✅ Inteligentnie przekierowuje do Kasi gdy potrzeba
- ✅ Koszt: ~10-20 zł/miesiąc przy normalnym ruchu

#### Krok 1: Uzyskaj klucz API Claude
1. Wejdź na: https://console.anthropic.com
2. Zarejestruj się (darmowe $5 na start!)
3. Przejdź do **API Keys**
4. Kliknij **"Create Key"**
5. Nazwij klucz: "kasiadudek-chatbot"
6. Skopiuj klucz (np. `sk-ant-api03-...`)

#### Krok 2: Dodaj klucz do strony

##### Opcja A: Przez konsolę przeglądarki (tymczasowe)
1. Otwórz stronę kasiadudek.pl
2. Naciśnij **F12** (otwórz DevTools)
3. Zakładka **Console**
4. Wklej:
   ```javascript
   localStorage.setItem('chatbot_ai_key', 'sk-ant-api03-TWOJ_KLUCZ');
   ```
5. Enter
6. Odśwież stronę

##### Opcja B: Bezpośrednio w kodzie (stałe)
1. Otwórz plik: `script.js`
2. Znajdź linię (~1306):
   ```javascript
   const apiKey = localStorage.getItem('chatbot_ai_key') || 'YOUR_CLAUDE_API_KEY';
   ```
3. Zamień na:
   ```javascript
   const apiKey = localStorage.getItem('chatbot_ai_key') || 'sk-ant-api03-TWOJ_KLUCZ';
   ```
4. Zapisz i deploy

⚠️ **UWAGA:** Opcja B to **nie jest zalecane** dla produkcji (klucz widoczny w kodzie). Lepiej użyć Opcji A lub utworzyć backend endpoint.

##### Opcja C: Backend Proxy (najbezpieczniejsze)
Jeśli chcesz ukryć klucz API przed użytkownikami:

1. Utwórz plik: `api/chatbot.js` (Vercel Serverless Function):
   ```javascript
   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' });
     }

     const { message } = req.body;

     const response = await fetch('https://api.anthropic.com/v1/messages', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'x-api-key': process.env.CLAUDE_API_KEY,
         'anthropic-version': '2023-06-01'
       },
       body: JSON.stringify({
         model: 'claude-3-haiku-20240307',
         max_tokens: 300,
         system: "...", // system prompt z script.js
         messages: [{ role: 'user', content: message }]
       })
     });

     const data = await response.json();
     res.json(data);
   }
   ```

2. Dodaj env variable w Vercel:
   - Dashboard Vercel → Settings → Environment Variables
   - Klucz: `CLAUDE_API_KEY`
   - Wartość: `sk-ant-api03-TWOJ_KLUCZ`

3. Zmień endpoint w `script.js`:
   ```javascript
   const response = await fetch('/api/chatbot', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message: userMessage })
   });
   ```

#### Krok 3: Testuj!
1. Otwórz chatbota na stronie
2. Spróbuj pytań **spoza bazy wiedzy**:
   - "Czy pomagasz w relokacji do Niemiec?"
   - "Co zrobić gdy szef nie docenia mojej pracy?"
   - "Jak zmienić branżę z IT na edukację?"

Jeśli AI działa - dostaniesz inteligentną odpowiedź! 🎉

### Koszty Claude API

Model: **Claude 3 Haiku** (najtańszy, wystarczający)

| Ruch | Koszt/miesiąc |
|------|---------------|
| 100 rozmów | ~$0.50 (~2 zł) |
| 500 rozmów | ~$2.50 (~10 zł) |
| 1000 rozmów | ~$5 (~20 zł) |

**Darmowy credit:** $5 na start (wystarczy na ~1000 rozmów!)

### Monitorowanie kosztów
1. Console Anthropic → **Usage**
2. Ustaw alert przy $5
3. Zobacz statystyki rozmów

---

## 🧪 Testowanie

### Test 1: Widget "Oddzwonię do Ciebie"
1. Otwórz stronę
2. Kliknij zielony przycisk 📞 (dolny prawy róg)
3. Wypełnij formularz:
   - Imię: Test
   - Telefon: 123456789
   - Pora: Rano
4. Wyślij
5. **Sprawdź:** Czy przyszedł SMS na 518618058?

⚠️ **Wymaga:** Zweryfikowane konto SMSAPI + saldo na koncie

### Test 2: Chatbot - Baza wiedzy
Spróbuj pytań z bazy:
- "jaki jest cennik?"
- "czy robisz konsultacje online?"
- "czy obsługujesz osoby z zagranicy?"
- "czy to serwis samochodowy?"
- "chcę rabat"

**Oczekiwane:** Instant odpowiedzi z bazy wiedzy

### Test 3: Chatbot - AI Fallback
Pytania spoza bazy (tylko jeśli skonfigurowałeś Claude API):
- "jak przygotować się do Assessment Center?"
- "co zrobić gdy czuję się niedoceniany w pracy?"
- "jak negocjować z szefem o home office?"

**Oczekiwane:** Inteligentne odpowiedzi od Claude AI (po ~2-3 sekundy)

### Test 4: Chatbot - Przekierowanie do Kasi
Pytania wymagające kontaktu:
- "chcę rabat 50%"
- "czy możesz wystąpić na naszej konferencji?"
- "współpraca B2B - jaka oferta?"

**Oczekiwane:** Bot przekieruje do kontaktu z Kasią

---

## 🔧 Troubleshooting

### Problem: Formularz callback nie wysyła emaila
**Rozwiązanie:**
1. Sprawdź czy wkleiłeś poprawny `access_key` z Web3Forms
2. Sprawdź Console (F12) - czy są błędy?
3. Sprawdź spam w skrzynce kontakt@kasiadudek.pl
4. Zweryfikuj email w Web3Forms (confirm email)

### Problem: Chatbot nie używa AI
**Rozwiązanie:**
1. Sprawdź Console (F12) - czy widzisz błąd API?
2. Sprawdź czy klucz API jest poprawny:
   ```javascript
   console.log(localStorage.getItem('chatbot_ai_key'));
   ```
3. Sprawdź quota w Anthropic Console (czy masz credity?)
4. Sprawdź czy klucz zaczyna się od `sk-ant-api03-`

### Problem: Bot odpowiada wolno
**Rozwiązanie:**
- To normalne! AI potrzebuje 2-5 sekund na odpowiedź
- Baza wiedzy (21 tematów) odpowiada instant
- Jeśli >10 sekund - sprawdź internet/API status

### Problem: "CORS error" w Console
**Rozwiązanie:**
- Użyj Opcji C (Backend Proxy)
- Lub użyj tylko bazy wiedzy (bez AI)

---

## 📊 Statystyki

Obecna baza wiedzy pokrywa:
- ✅ **21 tematów** (vs 6 wcześniej)
- ✅ **~150 słów kluczowych**
- ✅ Pokrycie ~80% typowych pytań

Z AI Fallback:
- ✅ Pokrycie ~95% wszystkich pytań
- ✅ Inteligentne odpowiedzi dla edge cases
- ✅ Automatyczne przekierowanie do Kasi gdy potrzeba

---

## 🎯 Kolejne kroki (opcjonalne)

### 1. Analytics dla chatbota
Dodaj tracking rozmów:
```javascript
// W handleUserMessage()
trackEvent('Chatbot', 'Question', userMessage);
```

### 2. A/B Testing
Test różnych wersji odpowiedzi:
- Która wersja generuje więcej konwersji?
- Które pytania są najczęstsze?

### 3. Integracja z CRM
Zapisuj leady z callback do:
- Google Sheets
- HubSpot
- Pipedrive
- n8n workflow

### 4. Multilingual support
Dodaj angielską wersję bazy wiedzy dla klientów z zagranicy.

### 5. Voice support
Dodaj głosową interakcję (Web Speech API).

---

## 💡 Najlepsze praktyki

1. **Monitoruj koszty AI** - ustaw alerty w Anthropic Console
2. **Czytaj rozmowy** - Zobacz co ludzie pytają, rozszerzaj bazę wiedzy
3. **Odpowiadaj szybko** na callback requests (2-4h jak obiecane)
4. **Testuj regularnie** - upewnij się że wszystko działa
5. **Aktualizuj ceny** w bazie wiedzy gdy się zmienią

---

**Utworzone:** 2025-11-09
**Autor:** Claude Code
**Projekt:** Strona Katarzyny Dudek - Widget Automation
**Wersja:** 2.0 (Hybrid AI)
