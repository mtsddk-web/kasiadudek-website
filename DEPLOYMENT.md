# 🚀 Deployment - Strona Kasi na Vercel

**Data wdrożenia:** 2025-11-08
**Status:** ✅ LIVE (wymaga konfiguracji DNS)

---

## 🌐 Linki

### Strona na Vercel (działa już teraz!):
**URL:** https://strona-kasi-1jg5x1nip-mateusz-s-projects-3c07c74b.vercel.app

### Docelowa domena (po konfiguracji DNS):
**URL:** https://kasiadudek.pl
**URL:** https://www.kasiadudek.pl

### GitHub Repository:
**URL:** https://github.com/mtsddk-web/kasiadudek-website

---

## ⚙️ Konfiguracja DNS - WAŻNE!

Aby strona działała pod domeną **kasiadudek.pl**, musisz skonfigurować DNS w Zenbox:

### Krok 1: Zaloguj się do panelu Zenbox
1. Wejdź na panel Zenbox (gdzie masz domenę)
2. Znajdź domenę **kasiadudek.pl**
3. Przejdź do ustawień DNS

### Krok 2: Dodaj rekord A
Dodaj następujący rekord:

```
Typ: A
Nazwa: @ (lub puste pole)
Wartość: 76.76.21.21
TTL: 3600 (lub Auto)
```

### Krok 3: Dodaj rekord CNAME dla www
Dodaj drugi rekord:

```
Typ: CNAME
Nazwa: www
Wartość: strona-kasi-1jg5x1nip-mateusz-s-projects-3c07c74b.vercel.app
TTL: 3600 (lub Auto)
```

### Krok 4: Poczekaj (propagacja DNS)
- DNS potrzebuje 1-24h na propagację
- Zwykle działa w ciągu 1-2 godzin
- Vercel automatycznie ustawi SSL (HTTPS)

---

## 📊 Co zostało wdrożone?

✅ Kod strony na GitHub
✅ Automatyczne deploymenty z GitHub
✅ Hosting na Vercel (darmowy!)
✅ SSL/HTTPS (automatyczne po konfiguracji DNS)
✅ CDN globalny (szybka strona na całym świecie)

---

## 🔄 Jak robić zmiany w przyszłości?

### Metoda 1: Przez Git (ZALECANE)
```bash
cd /Users/mateuszdudek/Documents/atlas/FIRMOWE/strona-kasi

# Edytuj pliki (index.html, styles.css, etc.)

# Wyślij zmiany
git add .
git commit -m "Opis zmian"
git push

# Vercel automatycznie wdroży zmiany w ~30 sekund!
```

### Metoda 2: Przez Vercel Dashboard
1. Wejdź na https://vercel.com
2. Znajdź projekt "strona-kasi"
3. Kliknij "Redeploy"

### Metoda 3: Edycja plików lokalnie i vercel deploy
```bash
# Po edycji plików
vercel --prod
```

---

## 🎯 Status konfiguracji

| Element | Status | Uwagi |
|---------|--------|-------|
| GitHub Repo | ✅ GOTOWE | https://github.com/mtsddk-web/kasiadudek-website |
| Vercel Deploy | ✅ GOTOWE | Strona działa na URL Vercel |
| SSL Certificate | ✅ AUTO | Automatyczne od Vercel |
| Domena kasiadudek.pl | ⏳ CZEKA | Wymaga konfiguracji DNS |
| www.kasiadudek.pl | ⏳ CZEKA | Wymaga konfiguracji DNS |

---

## 📝 Instrukcja konfiguracji DNS w Zenbox

### Gdzie znaleźć ustawienia DNS w Zenbox?

1. **Zaloguj się:** panel.zenbox.pl (lub podobny URL)
2. **Domeny:** Znajdź sekcję "Domeny" lub "Zarządzanie domenami"
3. **kasiadudek.pl:** Kliknij na domenę
4. **DNS:** Znajdź zakładkę "DNS" lub "Rekordy DNS"
5. **Dodaj rekordy:** Jak opisano powyżej

### Screenshot (przykład):
```
+------------------------+
| Panel Zenbox           |
+------------------------+
| Domeny                 |
|  └ kasiadudek.pl      |
|     └ DNS             | <- TUTAJ
|     └ Email           |
|     └ Przekierowania  |
+------------------------+
```

---

## ⚠️ Ważne uwagi

### Stara zawartość na Zenbox
Jeśli masz starą stronę na Zenbox hosting:
1. Usuń wszystkie pliki ze starego hostingu
2. Albo zmień katalog główny na pusty
3. DNS będzie kierował na Vercel, więc hosting nie będzie używany

### Email na Zenbox
Email **kontakt@kasiadudek.pl** nadal będzie działał!
- Rekordy MX pozostają bez zmian
- Tylko strona WWW jest przekierowana na Vercel
- Email działa normalnie na Zenbox

### Backup
Przed zmianą DNS, zrób backup starej strony (jeśli jest):
```bash
# Połącz się przez FTP i pobierz wszystkie pliki
```

---

## 🔧 Troubleshooting

### "Strona nie działa pod kasiadudek.pl"
**Rozwiązanie:**
1. Sprawdź czy dodałeś rekordy DNS (A i CNAME)
2. Poczekaj 1-2h na propagację
3. Sprawdź DNS: `nslookup kasiadudek.pl`
4. Powinno pokazać IP: 76.76.21.21

### "Certyfikat SSL nie działa"
**Rozwiązanie:**
- Vercel automatycznie utworzy SSL w ciągu 10-60 minut po propagacji DNS
- Sprawdź status na dashboard Vercel

### "Zmiany nie są widoczne"
**Rozwiązanie:**
1. Sprawdź czy zrobiłeś `git push`
2. Sprawdź deployment na Vercel dashboard
3. Wyczyść cache przeglądarki (Cmd+Shift+R)

---

## 📊 Dashboard i Monitoring

### Vercel Dashboard
**URL:** https://vercel.com/mateusz-s-projects-3c07c74b/strona-kasi

Co możesz tam zobaczyć:
- ✅ Status deploymentów
- ✅ Logi błędów
- ✅ Statystyki ruchu
- ✅ Ustawienia domeny
- ✅ Environment variables

### GitHub Repository
**URL:** https://github.com/mtsddk-web/kasiadudek-website

Co możesz tam zobaczyć:
- ✅ Kod źródłowy
- ✅ Historia zmian (commits)
- ✅ Issues
- ✅ Pull requests

---

## 🚀 Automatyzacja

Dzięki połączeniu GitHub + Vercel:
1. **Push do GitHub** → Automatyczny deploy
2. **Każda zmiana** → Nowa wersja strony w ~30s
3. **Preview dla zmian** → Możesz testować przed wdrożeniem
4. **Rollback** → Możesz wrócić do poprzedniej wersji

---

## 💰 Koszty

| Usługa | Koszt | Limit |
|--------|-------|-------|
| GitHub | **DARMOWE** | Publiczne repo bez limitu |
| Vercel | **DARMOWE** | 100GB bandwidth/miesiąc |
| SSL | **DARMOWE** | Automatyczne od Vercel |
| Domena kasiadudek.pl | ~50-100 zł/rok | U Zenbox |

**Hosting = 0 zł!** 🎉

---

## 📚 Przydatne komendy

### Sprawdź status
```bash
vercel ls
```

### Zobacz logi
```bash
vercel logs
```

### Redeploy
```bash
vercel --prod
```

### Sprawdź domenę
```bash
vercel domains ls
```

### Usuń deployment (jeśli potrzeba)
```bash
vercel remove strona-kasi
```

---

## 🎯 Następne kroki

### Teraz (priorytet!):
1. [ ] Skonfiguruj DNS w Zenbox (rekordy A i CNAME)
2. [ ] Poczekaj 1-2h na propagację
3. [ ] Sprawdź czy strona działa na kasiadudek.pl
4. [ ] Sprawdź SSL (https://)

### Później:
1. [ ] Dodaj Google Analytics
2. [ ] Skonfiguruj Search Console
3. [ ] Dodaj monitoring uptime
4. [ ] Zrób backup kodu

---

## ✅ Checklist wdrożenia

- [x] Git repository zainicjalizowane
- [x] Kod na GitHub
- [x] Deploy na Vercel
- [x] Domena dodana do Vercel
- [x] SSL skonfigurowany (automatycznie)
- [ ] DNS skonfigurowany w Zenbox
- [ ] Strona działa na kasiadudek.pl
- [ ] Email testowy wysłany
- [ ] Google Analytics dodane

---

## 🆘 Potrzebujesz pomocy?

### Konfiguracja DNS
Jeśli nie wiesz jak skonfigurować DNS w Zenbox:
1. Zaloguj się do panelu Zenbox
2. Zrób screenshot ustawień DNS
3. Napisz - pomogę krok po kroku

### Problemy z Vercel
- Dashboard: https://vercel.com
- Dokumentacja: https://vercel.com/docs

### Problemy z GitHub
- Repository: https://github.com/mtsddk-web/kasiadudek-website
- Dokumentacja: https://docs.github.com

---

## 📱 Testowanie

Po konfiguracji DNS, przetestuj:

### Desktop:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox

### Mobile:
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad

### Funkcje:
- [ ] Nawigacja działa
- [ ] Przyciski "Kup teraz" działają
- [ ] Formularze działają
- [ ] Responsywność OK
- [ ] SSL (HTTPS) działa

---

**Gratulacje! Strona jest LIVE! 🎉**

Teraz tylko konfiguracja DNS i będzie dostępna pod kasiadudek.pl!

---

**Utworzone:** 2025-11-08 22:15
**Autor:** Claude Code + Vercel
**Projekt:** Strona Katarzyny Dudek - Doradca Zawodowy
**Status:** ✅ Deployed, czeka na DNS
