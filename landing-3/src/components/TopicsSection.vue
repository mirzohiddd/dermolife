<template>
  <section class="topics">
    <div class="container">
      <div class="topics-card">
        <h2 class="topics-title">SEMINARDA NIMALARNI BILIB OLASIZ?</h2>

        <div class="topics-grid">
          <div class="topic-item" v-for="t in topics" :key="t.num">
            <span class="topic-num">{{ t.num }}</span>
            <p class="topic-text">{{ t.text }}</p>
          </div>
        </div>

        <div class="info-bar">
          <div class="info-item">
            <span class="info-dot"></span>
            <span>Ishonchli ma’lumot</span>
          </div>
          <div class="info-item">
            <span class="info-dot"></span>
            <span>Tajribali mutaxassis</span>
          </div>
          <div class="info-item">
            <span class="info-dot"></span>
            <span>Sog‘lom teri — baxtli hayot</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const topics = [
  { num: '01', text: 'Psoriazning sabablari va rivojlanish mexanizmi' },
  { num: '02', text: 'Kasallikning asosiy belgilari va bosqichlari' },
  { num: '03', text: 'Nimalar qo‘zg‘atuvchi omil bo‘lishi mumkin?' },
  { num: '04', text: 'Davolash usullari va zamonaviy yondashuvlar' },
  { num: '05', text: 'Teri parvarishi va kundalik hayotda qoidalar' },
  { num: '06', text: 'Dieta va ovqatlanishning ahamiyati' },
  { num: '07', text: 'Psoriazda qo‘llaniladigan dorilar va ularning ta’siri' },
  { num: '08', text: 'Savol-javob: shifokorga to‘g‘ridan-to‘g‘ri savollar' },
]
</script>

<style scoped>
.topics {
  padding: 0 0 96px;
  margin-top: -56px;
  position: relative;
  z-index: 2;
}

.topics-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  padding: 56px 56px 40px;
}

.topics-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(26px, 3vw, 34px);
  color: var(--color-navy);
  text-align: center;
  margin-bottom: 44px;
  line-height: 1.25;
}

.topics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 48px;
  margin-bottom: 44px;
}

.topic-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding-bottom: 24px;
  border-bottom: 1px solid #EEE7D8;
}

.topic-num {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 26px;
  color: var(--color-gold);
  min-width: 40px;
}

.topic-text {
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-navy-soft);
  padding-top: 4px;
}

.info-bar {
  background: linear-gradient(90deg, var(--color-bg-alt) 0%, #F7EFD9 100%);
  border-radius: var(--radius-md);
  padding: 24px 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 15px;
  color: var(--color-navy);
}

.info-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-gold);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .topics-card {
    padding: 40px 28px 32px;
  }

  .topics-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

@media (max-width: 640px) {
  .topics {
    margin-top: -32px;
    padding-bottom: 64px;
  }

  .info-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 24px;
  }
}
</style>
