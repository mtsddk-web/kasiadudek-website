# Strona Katarzyny Dudek - Doradca Zawodowy

Profesjonalna strona internetowa dla doradcy zawodowego, stworzona z najwyższą dbałością o szczegóły, UX i wydajność.

## 🎨 Funkcje

### Sekcje strony
- **Hero Section** - Imponujące wprowadzenie z animacjami
- **O mnie** - Prezentacja doświadczenia i podejścia do pracy
- **Oferta** - 4 główne usługi w eleganckich kartach:
  - Konsultacje 1-1
  - Budowanie CV
  - Przygotowanie do rozmowy kwalifikacyjnej
  - Testy predyspozycji zawodowych
- **Blog** - Artykuły i poradniki
- **E-book** - Lead magnet z formularzem zapisu
- **Kontakt** - Formularz kontaktowy i dane

### Funkcjonalności
✅ W pełni responsywna (mobile, tablet, desktop)
✅ Nowoczesne animacje i efekty przejść
✅ Smooth scroll i aktywne podświetlanie nawigacji
✅ Interaktywne formularze z walidacją
✅ System powiadomień
✅ Przycisk scroll to top
✅ Accessibility (WCAG 2.1)
✅ Performance optimization
✅ SEO-friendly struktura
✅ Lazy loading obrazów

## 🚀 Jak uruchomić

### Metoda 1: Bezpośrednio w przeglądarce
```bash
open index.html
```

### Metoda 2: Lokalny serwer (zalecane dla pełnej funkcjonalności)
```bash
# Python 3
python3 -m http.server 8000

# Następnie otwórz w przeglądarce:
# http://localhost:8000
```

### Metoda 3: Live Server (VS Code)
1. Zainstaluj rozszerzenie "Live Server" w VS Code
2. Kliknij prawym przyciskiem na `index.html`
3. Wybierz "Open with Live Server"

## 📁 Struktura plików

```
strona-kasi/
├── index.html          # Główna strona HTML
├── styles.css          # Wszystkie style CSS
├── script.js           # JavaScript dla interaktywności
└── README.md          # Ten plik
```

## 🎨 Paleta kolorów

- **Główny**: `#04685A` (ciemny turkus)
- **Ciemniejszy**: `#034d43`
- **Jaśniejszy**: `#05836f`
- **Drugorzędny**: `#3a6244` (zielony)
- **Akcent**: `#f1f1f7` (jasny szary)

## 🔤 Typografia

- **Główna czcionka**: Inter (Google Fonts)
- **Akcentowa**: Caveat (dla osobistego charakteru)

## 📱 Responsywność

Strona została zaprojektowana mobile-first i jest w pełni responsywna:
- Mobile: < 480px
- Tablet: 481px - 1024px
- Desktop: > 1024px

## ✨ Co dalej?

### Niezbędne modyfikacje:
1. **Zdjęcia**:
   - Dodaj zdjęcie Kasi w sekcji Hero
   - Dodaj zdjęcie w sekcji "O mnie"
   - Dodaj zdjęcia do kart blogowych

2. **Dane kontaktowe**:
   - Zmień email na prawdziwy (obecnie: kontakt@doradcazawodowy.pl)
   - Zmień numer telefonu (obecnie: +48 123 456 789)
   - Dodaj linki do social media (LinkedIn, Facebook, Instagram)

3. **Treść**:
   - Rozwiń sekcję "O mnie" o prawdziwą biografię
   - Dodaj certyfikaty/wykształcenie
   - Uzupełnij linki do artykułów blogowych

4. **Backend**:
   - Podłącz formularze do prawdziwego endpointu (obecnie symulowane)
   - Zintegruj z systemem email marketingu (np. Mailchimp)
   - Dodaj Google Analytics lub podobne

### Opcjonalne ulepszenia:
- [ ] Blog z pełnymi artykułami
- [ ] System rezerwacji spotkań (Calendly integration)
- [ ] Testimoniale/opinie klientów
- [ ] Portfolio - case studies
- [ ] Sekcja FAQ
- [ ] Newsletter
- [ ] Wersja angielska
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

## 🔧 Konfiguracja

### Zmiana kolorów
Edytuj CSS variables w `styles.css` (linie 1-30):
```css
:root {
    --color-primary: #04685A;
    --color-secondary: #3a6244;
    /* ... */
}
```

### Zmiana czcionek
Edytuj link w `<head>` pliku `index.html` i zmień zmienne w CSS:
```css
:root {
    --font-primary: 'Inter', sans-serif;
    --font-accent: 'Caveat', cursive;
}
```

## 🌐 Deployment

### Netlify (zalecane - darmowe)
1. Utwórz konto na [Netlify](https://netlify.com)
2. Przeciągnij folder projektu na dashboard
3. Strona jest live!

### Vercel
1. Zainstaluj Vercel CLI: `npm i -g vercel`
2. Uruchom: `vercel`
3. Postępuj zgodnie z instrukcjami

### GitHub Pages
1. Utwórz repozytorium na GitHub
2. Wgraj pliki
3. Włącz GitHub Pages w Settings → Pages
4. Wybierz branch `main` i folder `/ (root)`

### Tradycyjny hosting
1. Spakuj wszystkie pliki do ZIP
2. Wgraj przez FTP/Panel administracyjny
3. Upewnij się, że `index.html` jest w głównym katalogu

## 📊 Performance

Strona została zoptymalizowana pod kątem wydajności:
- Minimalny JavaScript (vanilla JS, bez frameworków)
- Efektywny CSS (bez nadmiarowych stylów)
- Lazy loading obrazów
- Debounced scroll handlers
- Optymalizacja animacji (GPU acceleration)
- Przygotowana pod preload/prefetch

## ♿ Accessibility

Strona spełnia standardy WCAG 2.1:
- Semantyczny HTML5
- ARIA labels
- Keyboard navigation
- Focus states
- Skip links
- Reduced motion support
- Kontrast kolorów

## 📝 Licencja

Strona stworzona dla Katarzyny Dudek. Wszystkie prawa zastrzeżone.

## 💡 Wsparcie

W razie pytań lub problemów:
- Email: [twój email]
- GitHub Issues: [link do repo]

---

**Stworzone z ❤️ przy użyciu:**
- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- Miłości do czystego kodu

Wersja: 1.0.0
Data: Listopad 2024
