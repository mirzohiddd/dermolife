# Psoriaz Webinar Landing Page

Vue 3 + Vite bilan qurilgan premium webinar landing page.

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
public/
  images/doctor.png   ← shifokor rasmi (siz yuborgan rasm shu yerga joylashtirilgan)
  favicon.svg
```

## Eslatma

- Doctor rasmini almashtirish uchun `public/images/doctor.png` faylini o‘zingiznikiga almashtiring (nom bir xil bo‘lsin: `doctor.png`).
- Ranglar `src/style.css` ichidagi CSS o‘zgaruvchilarda (`--bg-black`, `--gold`) belgilangan — shu yerdan tezda o‘zgartirish mumkin.
- Font: Google Fonts orqali `Unbounded` (sarlavhalar) va `Manrope` (matn) ulangan, `index.html` ichida.
