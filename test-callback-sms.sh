#!/bin/bash
# Test callback SMS endpoint
# Po weryfikacji konta SMSAPI możesz użyć tego skryptu do testowania

echo "🧪 Test Callback SMS Endpoint"
echo "=============================="
echo ""

# Test data
TEST_DATA='{
  "name": "Test User",
  "phone": "518618058",
  "preferredTime": "morning"
}'

echo "📤 Wysyłam test request do /api/callback-sms..."
echo "Dane: $TEST_DATA"
echo ""

# Send request
RESPONSE=$(curl -s -X POST https://kasiadudek.pl/api/callback-sms \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA")

echo "📥 Odpowiedź serwera:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

# Check if success
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ SUCCESS - Endpoint działa poprawnie!"
  echo ""
  echo "📱 Sprawdź czy SMS dotarł na numer 518618058"
  echo "Treść SMS powinna być:"
  echo "---"
  echo "🔔 Callback: Test User"
  echo "Tel: 518618058"
  echo "Pora: Rano (9:00-12:00)"
  echo "kasiadudek.pl"
  echo "---"
elif echo "$RESPONSE" | grep -q "SMS service not configured"; then
  echo "⚠️  SMSAPI_TOKEN nie jest skonfigurowany w Vercel"
  echo "Dodaj go w: https://vercel.com/dashboard → Settings → Environment Variables"
elif echo "$RESPONSE" | grep -q "Failed to send SMS"; then
  echo "❌ BŁĄD wysyłki SMS"
  echo ""
  echo "Możliwe przyczyny:"
  echo "1. Konto SMSAPI niezweryfikowane (sprawdź: https://ssl.smsapi.pl)"
  echo "2. Brak środków na koncie SMSAPI"
  echo "3. Niepoprawny token API"
  echo ""
  echo "Sprawdź logi w Vercel:"
  echo "https://vercel.com/dashboard → strona-kasi → Deployments → Logs"
else
  echo "❌ Nieznany błąd"
  echo "Sprawdź odpowiedź powyżej"
fi

echo ""
echo "💡 Tip: Sprawdź status konta SMSAPI:"
echo "   https://ssl.smsapi.pl → Dashboard → Status konta"
