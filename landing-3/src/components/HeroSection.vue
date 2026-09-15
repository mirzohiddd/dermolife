<template>
  <section class="hero">
    <div class="hero-glow"></div>
    <div class="container hero-inner">
      <div class="hero-text">
        <div class="badge">ONLAYN SEMINAR</div>

        <div class="datetime">20-SENTABR&nbsp;•&nbsp;20:00</div>

        <h1 class="headline">
          PSORIAZ HAQIDA
          <span class="headline-gold">BATAFSIL</span>
        </h1>

        <p class="tagline">DERMATIT&nbsp;•&nbsp;EKZEMA</p>

        <p class="subtitle">
          Terining surunkali kasalliklari haqida tajribali dermatonutritsiolog
          bilan birga — sabablari, davolash usullari va kundalik hayotda
          amal qilish kerak bo‘lgan qoidalar haqida to‘liq ma’lumot oling.
        </p>

        <CTAButton label="BEPUL QATNASHISH" size="lg" @click="$emit('open-modal')" />

        <p class="meta-line">
          Joylar cheklangan&nbsp;• 20-sentabr, 20:00&nbsp;• Onlayn format
        </p>
      </div>

      <div class="hero-visual">
        <div class="doctor-frame">
          <img src="/images/doctor.png" alt="Kamoliddin Kozimxonovich" class="doctor-img" />
          <div class="doctor-caption">
            <p class="doctor-name">Kamoliddin Kozimxonovich</p>
            <p class="doctor-role">Dermatonutritsiolog</p>
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
  position: relative;
  background: linear-gradient(180deg, #FDFBF6 0%, var(--color-bg) 55%, var(--color-bg-alt) 100%);
  padding: 64px 0 96px;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -180px;
  right: -160px;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(217,154,24,0.16) 0%, rgba(217,154,24,0) 70%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 40px;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.badge {
  display: inline-flex;
  align-items: center;
  background: var(--color-navy);
  color: var(--color-gold);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.14em;
  padding: 10px 20px;
  border-radius: 999px;
  margin-bottom: 22px;
}

.datetime {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.1em;
  color: var(--color-gold-dark);
  margin-bottom: 14px;
}

.headline {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(38px, 4.6vw, 58px);
  line-height: 1.04;
  color: var(--color-navy);
  margin-bottom: 8px;
}

.headline-gold {
  display: block;
  color: var(--color-gold);
  font-size: clamp(56px, 7.2vw, 92px);
  font-weight: 700;
  line-height: 0.98;
  margin-top: 4px;
}

.tagline {
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.08em;
  color: var(--color-navy-soft);
  margin: 18px 0 16px;
}

.subtitle {
  font-size: 17px;
  line-height: 1.6;
  color: var(--color-ink-muted);
  max-width: 480px;
  margin-bottom: 34px;
}

.meta-line {
  margin-top: 18px;
  font-size: 14px;
  color: var(--color-ink-muted);
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.doctor-frame {
  position: relative;
  width: min(100%, 420px);
}

.doctor-img {
  width: 100%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  background: var(--color-navy);
  object-fit: cover;
  aspect-ratio: 4 / 5;
}

.doctor-caption {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  background: rgba(16, 43, 53, 0.72);
  backdrop-filter: blur(6px);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  border: 1px solid rgba(217, 154, 24, 0.35);
}

.doctor-name {
  color: var(--color-white);
  font-weight: 700;
  font-size: 16px;
}

.doctor-role {
  color: var(--color-gold);
  font-weight: 600;
  font-size: 13px;
  margin-top: 2px;
}

@media (max-width: 980px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    align-items: center;
  }

  .subtitle {
    max-width: 100%;
  }

  .hero-visual {
    order: -1;
    margin-bottom: 8px;
  }

  .doctor-frame {
    width: min(100%, 320px);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 40px 0 64px;
  }

  .headline-gold {
    font-size: clamp(48px, 15vw, 64px);
  }
}
</style>
