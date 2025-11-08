# Instrukcje dla Kasi - Aktualizacja Strony

## 📝 Co zostało zmienione?

### 1. Kolorystyka - Beżowo-Biała Paleta ✅
Zmieniona z zielono-turkusowej na elegancką paletę beżowo-białą:
- Główny beż: `#a89078`
- Ciemny brąz: `#8b7355`
- Jasny beż: `#f5f3f0`
- Akcent beżowy: `#e8e3dc`

### 2. Nawigacja ✅
Zmieniona z: `Start, O mnie, Oferta, Blog, Kontakt`
Na: `Oferta, Blog, Sklep, O mnie, Kontakt`

### 3. Sekcja Sklep ✅
Dodana nowa sekcja z 4 produktami i cenami:
- **Konsultacja 1-1**: 180 zł
- **Budowanie CV**: 140 zł
- **Przygotowanie do rozmowy**: 200 zł
- **Testy predyspozycji**: 250 zł

### 4. System Płatności ✅
Każdy produkt ma przycisk "Kup teraz" z:
- Modal wyboru metody płatności
- Opcja Przelewy24 (BLIK, karty, przelewy)
- Opcja przelewu tradycyjnego

## 🖼️ Co musisz TERAZ zrobić:

### A. Dodaj zdjęcia do Sklepu
Zamień placeholdery na prawdziwe zdjęcia. Znajdują się one w sekcji Sklep:

1. Otwórz plik `index.html`
2. Znajdź sekcję `<!-- Shop Section -->`
3. Zamień każdy link placeholder:

```html
<!-- PRZED -->
<img src="https://via.placeholder.com/400x300/a89078/ffffff?text=Konsultacje+1-1" alt="Konsultacje 1-1">

<!-- PO ZMIANIE (twoje zdjęcie) -->
<img src="zdjecia/konsultacje.jpg" alt="Konsultacje 1-1">
```

**Potrzebujesz 4 zdjęcia (400x300px lub większe):**
- `konsultacje.jpg` - dla Konsultacji 1-1
- `cv.jpg` - dla Budowania CV
- `rozmowa.jpg` - dla Przygotowania do rozmowy
- `testy.jpg` - dla Testów predyspozycji

**Gdzie umieścić zdjęcia:**
Stwórz folder `zdjecia` w folderze strony i wrzuć tam wszystkie zdjęcia.

### B. Zaktualizuj numer konta bankowego
1. Otwórz plik `script.js`
2. Znajdź linię 370 (szukaj: `XX XXXX XXXX XXXX`)
3. Zamień na prawdziwy numer konta:

```javascript
// PRZED
<p class="account-number">XX XXXX XXXX XXXX XXXX XXXX XXXX</p>

// PO ZMIANIE
<p class="account-number">12 3456 7890 1234 5678 9012 3456</p>
```

### C. Dostosuj teksty (opcjonalnie)
W sekcji Sklep możesz zmienić opisy usług:
1. Otwórz `index.html`
2. Znajdź sekcję `<!-- Shop Section -->`
3. Edytuj teksty w `<p class="shop__card-description">` i `<li>`

## 🔧 Integracja z Przelewy24 (Produkcja)

### Krok 1: Załóż konto w Przelewy24
1. Wejdź na https://www.przelewy24.pl/
2. Załóż konto biznesowe
3. Przejdź weryfikację

### Krok 2: Pobierz dane dostępowe
Z panelu Przelewy24 potrzebujesz:
- **Merchant ID** (ID sprzedawcy)
- **POS ID** (ID stanowiska)
- **CRC Key** (klucz)

### Krok 3: Podłącz backend
System płatności wymaga backend (serwer). Masz 2 opcje:

**Opcja A: Proste rozwiązanie - Formularze zewnętrzne**
Użyj gotowego rozwiązania np.:
- Stripe Payment Links (https://stripe.com/payments/payment-links)
- PayU (https://www.payu.pl/)

**Opcja B: Własny backend**
Potrzebujesz programisty do stworzenia:
- Endpoint API do inicjowania płatności
- Webhook do obsługi potwierdzeń płatności
- Bazę danych do zapisywania zamówień

### Krok 4: Zaktualizuj kod
W pliku `script.js` znajdź linię 345 i dodaj:

```javascript
// Zamiast demonstracji
window.location.href = `/api/payment/przelewy24?product=${product}&price=${price}`;
```

## 🎨 Jak zmienić kolory? (jeśli potrzeba)

Wszystkie kolory są w `styles.css` na początku pliku:

```css
:root {
    --color-primary: #a89078;        /* Główny beż - zmień tutaj */
    --color-primary-dark: #8b7355;   /* Ciemniejszy - zmień tutaj */
    --color-accent: #f5f3f0;         /* Jasny beż - zmień tutaj */
}
```

## 📊 Sprawdź działanie

### Test 1: Sprawdź sklep
1. Otwórz stronę
2. Przejdź do sekcji "Sklep"
3. Kliknij "Kup teraz"
4. Sprawdź czy modal się otwiera

### Test 2: Sprawdź płatności
1. Wybierz "Przelewy24" - powinno pokazać komunikat demo
2. Wybierz "Przelew tradycyjny" - powinno pokazać dane konta

### Test 3: Sprawdź responsywność
1. Zmień rozmiar okna przeglądarki
2. Sprawdź na telefonie
3. Wszystko powinno wyglądać dobrze

## 📁 Struktura plików

```
strona-kasi/
├── index.html              # Główny plik strony
├── styles.css              # Wszystkie style
├── script.js               # JavaScript (płatności, animacje)
├── README.md              # Dokumentacja techniczna
├── INSTRUKCJE-DLA-KASI.md # Ten plik
└── zdjecia/               # Folder na zdjęcia (STWÓRZ GO!)
    ├── konsultacje.jpg
    ├── cv.jpg
    ├── rozmowa.jpg
    └── testy.jpg
```

## ❓ FAQ - Najczęstsze pytania

### Jak zmienić cenę?
W pliku `index.html` znajdź sekcję Shop i zmień:
```html
<span class="shop__card-price-amount">180 zł</span>
```

### Jak dodać nowy produkt?
Skopiuj cały blok `<article class="shop__card">...</article>` i dostosuj treści.

### Jak ukryć sekcję Sklep?
W pliku `index.html` znajdź `<section class="shop section"` i dodaj `style="display: none;"`:
```html
<section class="shop section" id="shop" style="display: none;">
```

### Płatności nie działają
To normalne - musisz:
1. Dodać numer konta (instrukcja powyżej)
2. Zintegrować z prawdziwym systemem płatności (Przelewy24/PayU)
3. Lub skontaktować się z programistą

## 🆘 Potrzebujesz pomocy?

### Zdjęcia:
- Rozmiar: min. 400x300px (lepiej 800x600px)
- Format: JPG lub PNG
- Jakość: dobra, profesjonalna

### Teksty:
- Możesz edytować wszystko w `index.html`
- Szukaj sekcji `<!-- Shop Section -->`
- Zmieniaj tylko tekst między tagami

### Kolory:
- Jeśli obecne ci nie pasują, daj znać jakie chcesz
- Potrzebuję kodu HEX (np. #a89078) lub nazwę koloru

## ✅ Checklist przed publikacją

- [ ] Dodane zdjęcia do sekcji Sklep
- [ ] Zaktualizowany numer konta bankowego
- [ ] Sprawdzone wszystkie ceny
- [ ] Przetestowane przyciski "Kup teraz"
- [ ] Sprawdzona responsywność (telefon, tablet)
- [ ] Zaktualizowane dane kontaktowe (email, telefon)
- [ ] Dodane prawdziwe zdjęcie w sekcji "O mnie"
- [ ] Sprawdzone wszystkie linki

## 🚀 Gotowa do publikacji?

Gdy wszystko będzie gotowe:
1. Spakuj wszystkie pliki do ZIP
2. Wgraj na hosting
3. Skonfiguruj Przelewy24
4. Gotowe!

---

**Pytania? Coś nie działa?**
Napisz wiadomość z dokładnym opisem problemu + screenshot.

**Data ostatniej aktualizacji:** 2025-11-08
**Wersja:** 2.0 (z systemem płatności)
