# Dermolife — Psoriaz Webinar Landinglar + Backend

3 ta mustaqil Vue 3 + Vite landing page (`landing-1`, `landing-2`, `landing-3`) va ularning
barchasi ulanadigan bitta umumiy Node.js/Express backend (`backend`).

```
project/
├── landing-1/   → https://t.me/marafonpsoriaz ga olib boruvchi "Landing 1" dizayni
├── landing-2/   → "Landing 2" dizayni
├── landing-3/   → "Landing 3" dizayni
└── backend/     → Express API: validatsiya + Telegram guruhga xabar yuborish
```

Har bir landingning "RO‘YXATDAN O‘TISH" formasi backendga `POST /api/register` so‘rovi
yuboradi. `landing` maydoni orqali backend (va Telegram xabari) qaysi sahifadan
kelganini biladi — bu qiymat har bir landingning `src/api.js` faylida qattiq
belgilangan (`landing-1`, `landing-2`, `landing-3`).

---

## 1. Talablar

- Node.js 18+ (global `fetch` va zamonaviy npm uchun)
- Telegram bot (BotFather orqali yaratilgan) va guruh chat ID

---

## 2. Backendni sozlash

```bash
cd backend
npm install
cp .env.example .env   # allaqachon mavjud .env faylini ham tahrirlashingiz mumkin
```

`.env` faylini oching va quyidagilarni to‘ldiring:

```
PORT=5000
NODE_ENV=development
TELEGRAM_BOT_TOKEN=<BotFather bergan token>
TELEGRAM_CHAT_ID=<guruhning raqamli chat id'si>
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175
```

**Bot tokenni qanday olish kerak:**
1. Telegramda [@BotFather](https://t.me/BotFather) bilan yangi bot yarating, u sizga token beradi.
2. Botni kerakli guruhga qo‘shing va unga xabar yuborish huquqini bering (guruh sozlamalarida botni admin qiling, yoki guruhda "oddiy a'zolar xabar yubora oladi" ruxsatini yoqing).
3. Guruh chat ID'sini olish uchun guruhga biror xabar yozing, so‘ng shu botning `getUpdates` API'sini oching:
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
   Javobdagi `"chat":{"id": -100xxxxxxxxxx, ...}` qiymatini `TELEGRAM_CHAT_ID` ga qo‘ying.

Backendni ishga tushirish:

```bash
npm start          # rejimida
# yoki
npm run dev         # fayl o'zgarishlarini kuzatib, avtomatik qayta ishga 
```

Server `http://localhost:5000` da ko‘tariladi. Tekshirish uchun:

```bash
curl http://localhost:5000/api/health
```

---

## 3. Har bir landingni ishga tushirish

Uchala landing ham bir xil tartibda ishga tushadi. Har biri **alohida, belgilangan
portda** ishlaydi (backend CORS ro‘yxati shu portlarga moslangan):

| Landing    | Papka        | Dev port |
|------------|--------------|----------|
| Landing 1  | `landing-1/` | 5173     |
| Landing 2  | `landing-2/` | 5174     |
| Landing 3  | `landing-3/` | 5175     |

```bash
cd landing-1
npm install
npm run dev

cd ../landing-2
npm install
npm run dev

cd ../landing-3
npm install
npm run dev
```

Har uchalasini bir vaqtda ishlatish uchun 3 ta alohida terminal oyna kerak bo‘ladi
(yoki `concurrently` kabi vositadan foydalaning). Backend ham parallel ishlab turishi kerak.

Production uchun har bir landingda:

```bash
npm run build
```

Bu `dist/` papkasini yaratadi — uni istalgan static hosting'ga (Vercel, Netlify, Nginx va h.k.) joylashtirishingiz mumkin.

---

## 4. Production uchun API manzilini o'zgartirish

Lokal ishlashda frontendlar avtomatik `http://localhost:5000/api` ga murojaat qiladi.
Productionda backendni boshqa domenga joylashtirsangiz, har bir landing papkasida
`.env` fayl yarating:

```
VITE_API_URL=https://api.sizning-domeningiz.uz/api
```

va backend `.env` faylidagi `ALLOWED_ORIGINS` ga landinglaringizning haqiqiy
production domenlarini qo‘shing, masalan:

```
ALLOWED_ORIGINS=https://landing1.uz,https://landing2.uz,https://landing3.uz
```

---

## 5. Formaning ishlash tartibi

1. Foydalanuvchi "BEPUL QATNASHISH" tugmasini bosadi → modal ochiladi.
2. Ism-familiya, kasallik turi, muddat va telefon raqamini to‘ldiradi.
3. "RO‘YXATDAN O‘TISH" bosilganda:
   - Frontendda maydonlar tekshiriladi (bo‘sh yoki noto‘g‘ri bo‘lsa, xabar chiqadi, backendga so‘rov yuborilmaydi).
   - Tugma "Yuborilmoqda..." holatiga o‘tadi va qayta bosib bo‘lmaydi (duplicate submitni oldini oladi).
   - `POST /api/register` backendga yuboriladi.
4. Backend validatsiya qiladi, muvaffaqiyatli bo‘lsa Telegram guruhga xabar yuboradi.
5. **Muvaffaqiyatli bo‘lsa:** frontendda "Ro‘yxatdan muvaffaqiyatli o‘tdingiz!" xabari ko‘rinadi va ~1.2 soniyadan so‘ng avtomatik `https://t.me/marafonpsoriaz` ga o‘tkaziladi.
6. **Xatolik bo‘lsa** (validatsiya yoki Telegramga yetkazib bo‘lmasa): "Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring." xabari ko‘rinadi, foydalanuvchi qaytadan urinib ko‘rishi mumkin.

---

## 6. Xavfsizlik choralari (backendda amalga oshirilgan)

- **Helmet** — standart xavfsizlik HTTP headerlari.
- **CORS allow-list** — faqat `ALLOWED_ORIGINS`da ko‘rsatilgan manzillardan so‘rov qabul qilinadi.
- **express-rate-limit** — `/api/register` uchun IP boshiga 10 daqiqada 5 ta so‘rov, umumiy API uchun 15 daqiqada 100 ta so‘rov.
- **Validatsiya** — ism, kasallik, muddat, telefon raqami va `landing` qiymati serverda ham tekshiriladi (frontend tekshiruvi chetlab o‘tilsa ham himoyalangan).
- **Bot token va chat ID hech qachon frontendga yuborilmaydi** — ular faqat backend `.env` faylida saqlanadi va faqat server-to-server (backend → Telegram API) so‘rovida ishlatiladi.
- **Xatoliklar xavfsiz qaytariladi** — Telegram API'dan kelgan xato tafsilotlari hech qachon frontendga chiqmaydi, faqat server logiga yoziladi.
- `.env` fayllari `.gitignore`ga qo‘shilgan — git repo'ga tasodifan tushib qolmaydi.

---

## 7. Fayl tuzilishi (backend)

```
backend/
├── server.js                        # kirish nuqtasi
├── src/
│   ├── app.js                       # Express app: middleware va route'lar
│   ├── config/env.js                # .env o'qish va validatsiya qilish
│   ├── controllers/register.controller.js
│   ├── middleware/rateLimiter.js
│   ├── middleware/errorHandler.js
│   ├── routes/register.routes.js
│   ├── services/telegram.service.js # Telegram Bot API bilan ishlash
│   └── utils/validate.js            # forma validatsiyasi
├── package.json
├── .env                             # (git'ga qo'shilmaydi, real qiymatlar bilan to'ldiring)
├── .env.example
└── .gitignore
```
