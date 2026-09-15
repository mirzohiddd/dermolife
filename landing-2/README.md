# Psoriaz Webinar Landing Page — v3 (Green / Cream Premium Medical)

Vue 3 + Vite bilan qurilgan premium webinar landing page, 3-dizayn variantida.

Berilgan rang palitrasi asosida: dark green, green, light green, cream, oq va
matn rangi. 1- va 2-versiyalardan vizual jihatdan farqli — katta typography
hierarchy (kichik "Psoriaz haqida" + gigant "Batafsil" so‘zi), organik blob
shakli doctor rasmi ortida, va topics uchun bitta yaxlit katta rounded card
(checkmark ikonalar bilan, raqamlarsiz).

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:5173` manzilini oching.

## Build (production)

```bash
npm run build
npm run preview
```

## Struktura

```
src/
  App.vue
  main.js
  style.css
  components/
    HeroSection.vue
    TopicsSection.vue
    CTAButton.vue
    RegistrationModal.vue
public/
  images/doctor.png
  favicon.svg
```

## Dizayn tokenlari (`src/style.css`)

- `--dark-green: #0D3B3E`
- `--green: #087F63`
- `--light-green: #DFF1E9`
- `--cream: #F8F7F2`
- `--white: #FFFFFF`
- `--text: #17383A`
- `--gold-accent` / `--gold-soft` — faqat modal ichida "ro‘yxatdan o‘tish" tugmasi uchun nozik urg‘u sifatida ishlatilgan
- `--font-display` — Sora (sarlavhalar)
- `--font-body` — Work Sans (matn)

## Eslatma

- Registratsiya modali dark green fon (`--dark-green`) va gold accent tugma bilan.
- Telegram guruh havolasi: `https://t.me/marafonpsoriaz` (yangi tabda ochiladi).
- Doctor rasmini almashtirish uchun `public/images/doctor.png` faylini almashtiring.
