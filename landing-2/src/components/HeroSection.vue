<template>
  <section class="hero">
    <div class="hero__grid">
      <div class="hero__content">
        <div class="hero__tags">
          <span class="hero__badge">Onlayn seminar</span>
          <span class="hero__date">27-sentabr • 19:00</span>
        </div>

        <h1 class="hero__title">
          <span class="hero__title-lead">Psoriaz haqida</span>
          <span class="hero__title-big">Batafsil</span>
        </h1>

        <span class="hero__pill">Dermatit • Ekzema</span>

        <p class="hero__subtitle">
          Terining surunkali kasalliklarini to‘g‘ri aniqlash va samarali
          davolash yo‘llarini shifokordan bevosita o‘rganing.
        </p>

        <CTAButton label="BEPUL QATNASHISH" @click="$emit('open-modal')" />
      </div>

      <div class="hero__visual">
        <div class="hero__blob" aria-hidden="true" />
        <div class="hero__photo-frame">
          <img
            class="hero__photo"
            src="/images/doctor.png"
            alt="Kamoliddin Kozimxonovich — Dermatonutritsiolog"
          />
        </div>
        <div class="hero__doctor-card">
          <span class="hero__doctor-name">Kamoliddin Kozimxonovich</span>
          <span class="hero__doctor-role">Dermatonutritsiolog</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CTAButton from './CTAButton.vue'

defineEmits(['open-modal'])
</script>

<style scoped>
.hero {
  background: var(--cream);
  position: relative;
  overflow: hidden;
}

.hero__grid {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 40px;
  min-height: 90vh;
  padding: 60px 64px;
  position: relative;
  z-index: 1;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}

.hero__tags {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hero__badge {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--white);
  background: var(--green);
  padding: 10px 20px;
  border-radius: 100px;
}

.hero__date {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-70);
  background: var(--white);
  border: 1px solid var(--line);
  padding: 9px 18px;
  border-radius: 100px;
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0.95;
}

.hero__title-lead {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(24px, 2.6vw, 30px);
  color: var(--text-70);
}

.hero__title-big {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(72px, 9vw, 128px);
  color: var(--dark-green);
  letter-spacing: -0.02em;
}

.hero__pill {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--green);
  background: var(--light-green);
  padding: 8px 18px;
  border-radius: 100px;
}

.hero__subtitle {
  font-size: 17px;
  line-height: 1.65;
  color: var(--text-70);
  max-width: 440px;
}

.hero__visual {
  position: relative;
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__blob {
  position: absolute;
  inset: 0;
  background: var(--light-green);
  border-radius: 46% 54% 58% 42% / 48% 44% 56% 52%;
  transform: scale(1.05);
  z-index: 0;
}

.hero__photo-frame {
  position: relative;
  z-index: 1;
  width: 82%;
  aspect-ratio: 3 / 3.7;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: var(--dark-green);
}

.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.hero__doctor-card {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  width: 84%;
  background: var(--white);
  border-radius: 18px;
  padding: 18px 24px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: center;
}

.hero__doctor-name {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 700;
  color: var(--dark-green);
}

.hero__doctor-role {
  font-size: 13px;
  font-weight: 600;
  color: var(--green);
}

/* Tablet */
@media (max-width: 1024px) {
  .hero__grid {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 52px 40px 76px;
    gap: 8px;
  }

  .hero__content {
    align-items: center;
    text-align: center;
    order: 1;
  }

  .hero__subtitle {
    max-width: 520px;
  }

  .hero__visual {
    order: 0;
    min-height: 480px;
    max-width: 420px;
    margin: 0 auto 32px;
  }

  .hero__tags,
  .hero__title,
  .hero__pill {
    align-items: center;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .hero__grid {
    padding: 40px 20px 64px;
  }

  .hero__title-big {
    font-size: clamp(56px, 18vw, 76px);
  }

  .hero__title-lead {
    font-size: 20px;
  }

  .hero__subtitle {
    font-size: 15.5px;
  }

  .hero__visual {
    min-height: 380px;
    max-width: 300px;
  }

  .hero__doctor-card {
    padding: 14px 18px;
    width: 90%;
  }

  .hero__doctor-name {
    font-size: 16px;
  }
}
</style>
