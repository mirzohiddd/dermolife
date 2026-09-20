<template>
  <section class="hero">
    <div class="hero__grid">
      <div class="hero__content">
        <div class="hero__tags">
          <span class="hero__tag hero__tag--gold">BEPUL JONLI EFIR</span>
          <span class="hero__tag">27-SENTABR • 19:00</span>
        </div>

        <h1 class="hero__title">
          <span class="hero__title-main">PSORIAZ</span>
          <span class="hero__title-sub">DERMATIT · EKZEMA</span>
        </h1>

        <p class="hero__subtitle">
          Terining surunkali kasalliklaridan qutulishning tabiiy va ilmiy yo‘lini
          shifokordan bevosita o‘rganing — savol-javob, real amaliyot va aniq tavsiyalar bilan.
        </p>

        <CTAButton label="BEPUL QATNASHISH" @click="$emit('open-modal')" />

        <div class="hero__meta">
          <div class="hero__meta-item">
            <span class="hero__meta-num">1500+</span>
            <span class="hero__meta-label">bemor davolangan</span>
          </div>
          <div class="hero__meta-divider" />
          <div class="hero__meta-item">
            <span class="hero__meta-num">8 yil</span>
            <span class="hero__meta-label">tajriba</span>
          </div>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__photo-frame">
          <img
            class="hero__photo"
            src="/images/doctor.png"
            alt="Kamoliddin Kozimxonovich — Dermatonutritsiolog"
          />
          <div class="hero__photo-gradient" />
          <div class="hero__doctor-card">
            <span class="hero__doctor-name">Kamoliddin Kozimxonovich</span>
            <span class="hero__doctor-role">Dermatonutritsiolog</span>
          </div>
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
  background: var(--bg-black);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  left: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(223, 165, 43, 0.08) 0%, rgba(223, 165, 43, 0) 70%);
  pointer-events: none;
}

.hero__grid {
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  min-height: 92vh;
  position: relative;
  z-index: 1;
}

.hero__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 56px 80px 64px;
  gap: 28px;
}

.hero__tags {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.hero__tag {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 9px 18px;
  border-radius: 100px;
  border: 1px solid var(--hairline);
  color: var(--white-70);
}

.hero__tag--gold {
  background: rgba(223, 165, 43, 0.12);
  border-color: rgba(223, 165, 43, 0.4);
  color: var(--gold);
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  line-height: 1;
}

.hero__title-main {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(58px, 7vw, 96px);
  color: var(--gold);
  letter-spacing: -0.01em;
}

.hero__title-sub {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(20px, 2.2vw, 28px);
  color: var(--white-70);
  letter-spacing: 0.02em;
}

.hero__subtitle {
  font-size: 17px;
  line-height: 1.65;
  color: var(--white-70);
  max-width: 460px;
  font-weight: 400;
}

.hero__meta {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 8px;
}

.hero__meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero__meta-num {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--white);
}

.hero__meta-label {
  font-size: 13px;
  color: var(--white-45);
}

.hero__meta-divider {
  width: 1px;
  height: 34px;
  background: var(--hairline);
}

.hero__visual {
  position: relative;
  min-height: 92vh;
}

.hero__photo-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.hero__photo-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, var(--bg-black) 0%, rgba(5, 5, 5, 0) 18%),
    linear-gradient(0deg, var(--bg-black) 0%, rgba(5, 5, 5, 0.55) 22%, rgba(5, 5, 5, 0) 48%);
}

.hero__doctor-card {
  position: absolute;
  left: 48px;
  bottom: 48px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero__doctor-name {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  color: var(--white);
}

.hero__doctor-role {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--gold);
}

/* Tablet */
@media (max-width: 1024px) {
  .hero__grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero__content {
    padding: 64px 40px 48px;
    order: 1;
  }

  .hero__visual {
    order: 0;
    min-height: 60vh;
  }

  .hero__subtitle {
    max-width: 560px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .hero__content {
    padding: 40px 24px 40px;
    gap: 22px;
  }

  .hero__visual {
    min-height: 78vw;
  }

  .hero__doctor-card {
    left: 24px;
    bottom: 28px;
  }

  .hero__doctor-name {
    font-size: 19px;
  }

  .hero__tag {
    font-size: 11px;
    padding: 8px 14px;
  }

  .hero__title-main {
    font-size: clamp(44px, 15vw, 64px);
  }

  .hero__title-sub {
    font-size: 17px;
  }

  .hero__subtitle {
    font-size: 15.5px;
  }

  .hero__meta {
    gap: 18px;
  }
}
</style>
