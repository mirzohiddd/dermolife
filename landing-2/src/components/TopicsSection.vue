<template>
  <section id="topics" class="topics">
    <div class="topics__card">
      <div class="topics__head">
        <span class="topics__eyebrow">Dastur</span>
        <h2 class="topics__title">Nimalarni bilib olasiz?</h2>
      </div>

      <ul class="topics__list">
        <li v-for="(item, i) in topics" :key="i" class="topics__item">
          <span class="topics__icon" aria-hidden="true">
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L4.5 8.5L12 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
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
  background: var(--cream);
  padding: 0 64px 110px;
}

.topics__card {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--white);
  border-radius: 40px;
  box-shadow: var(--shadow-md);
  padding: 64px 68px;
}

.topics__head {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 44px;
}

.topics__eyebrow {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--green);
}

.topics__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(28px, 3.4vw, 40px);
  color: var(--dark-green);
  letter-spacing: -0.01em;
}

.topics__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 48px;
  row-gap: 28px;
}

.topics__item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.topics__icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  background: var(--light-green);
  margin-top: 2px;
}

.topics__text {
  font-size: 16px;
  line-height: 1.55;
  font-weight: 500;
  color: var(--text);
}

.topics__cta {
  margin-top: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  border-top: 1px solid var(--line);
  padding-top: 44px;
}

.topics__cta-note {
  font-size: 14px;
  color: var(--text-45);
}

/* Tablet */
@media (max-width: 1024px) {
  .topics {
    padding: 0 40px 88px;
  }

  .topics__card {
    padding: 52px 44px;
    border-radius: 32px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .topics {
    padding: 0 16px 64px;
  }

  .topics__card {
    padding: 40px 24px;
    border-radius: 26px;
  }

  .topics__head {
    margin-bottom: 32px;
  }

  .topics__list {
    grid-template-columns: 1fr;
    row-gap: 22px;
  }

  .topics__text {
    font-size: 15px;
  }

  .topics__cta {
    margin-top: 36px;
    padding-top: 32px;
  }
}
</style>
