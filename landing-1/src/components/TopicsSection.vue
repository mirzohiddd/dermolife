<template>
  <section id="topics" class="topics">
    <div class="topics__inner">
      <div class="topics__head">
        <span class="topics__eyebrow">Dastur</span>
        <h2 class="topics__title">Nimalarni o‘rganasiz?</h2>
      </div>

      <ul class="topics__grid">
        <li v-for="(item, i) in topics" :key="i" class="topics__item">
          <span class="topics__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="topics__text">{{ item }}</span>
        </li>
      </ul>

      <div class="topics__cta">
        <CTAButton label="BEPUL QATNASHISH" @click="$emit('open-modal')" />
        <span class="topics__cta-note">O‘rinlar soni cheklangan — hoziroq ro‘yxatdan o‘ting</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import CTAButton from './CTAButton.vue'

defineEmits(['open-modal'])

const topics = [
  'Psoriaz nima uchun paydo bo‘ladi va u qanday rivojlanadi',
  'Terining surunkali yallig‘lanishiga olib keluvchi asosiy sabablar',
  'Dermatit va ekzemani bir-biridan qanday farqlash mumkin',
  'Ovqatlanish terining holatiga qanday ta’sir qiladi',
  'Uy sharoitida qo‘llash mumkin bo‘lgan xavfsiz usullar',
  'Qachon shifokorga murojaat qilish shart bo‘ladi',
  'Qaytalanishning oldini olish uchun amaliy tavsiyalar',
  'Savol-javob: eng ko‘p uchraydigan holatlar tahlili'
]
</script>

<style scoped>
.topics {
  background: var(--white);
  color: #0F0E0C;
  padding: 100px 0 110px;
}

.topics__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 64px;
}

.topics__head {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 56px;
}

.topics__eyebrow {
  font-size: 14px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.02em;
}

.topics__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 4vw, 46px);
  letter-spacing: -0.01em;
}

.topics__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border-top: 1px solid rgba(15, 14, 12, 0.1);
}

.topics__item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px 24px 28px 0;
  border-bottom: 1px solid rgba(15, 14, 12, 0.1);
}

.topics__item:nth-child(odd) {
  border-right: 1px solid rgba(15, 14, 12, 0.1);
  padding-right: 40px;
}

.topics__item:nth-child(even) {
  padding-left: 40px;
}

.topics__num {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--gold);
  flex-shrink: 0;
  padding-top: 2px;
}

.topics__text {
  font-size: 16.5px;
  line-height: 1.55;
  font-weight: 500;
  color: #26241F;
}

.topics__cta {
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.topics__cta-note {
  font-size: 14px;
  color: rgba(15, 14, 12, 0.5);
}

/* Tablet */
@media (max-width: 1024px) {
  .topics {
    padding: 80px 0 88px;
  }

  .topics__inner {
    padding: 0 40px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .topics {
    padding: 64px 0 64px;
  }

  .topics__inner {
    padding: 0 24px;
  }

  .topics__head {
    margin-bottom: 36px;
  }

  .topics__grid {
    grid-template-columns: 1fr;
  }

  .topics__item:nth-child(odd) {
    border-right: none;
    padding-right: 0;
  }

  .topics__item:nth-child(even) {
    padding-left: 0;
  }

  .topics__item {
    padding: 22px 0;
    gap: 14px;
  }

  .topics__text {
    font-size: 15.5px;
  }

  .topics__cta {
    margin-top: 44px;
  }
}
</style>
