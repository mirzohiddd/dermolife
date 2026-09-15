<template>
  <button class="cta" :class="{ 'cta--block': block }" type="button" @click="$emit('click')">
    <span>{{ label }}</span>
    <svg class="cta__arrow" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'BEPUL QATNASHISH'
  },
  block: {
    type: Boolean,
    default: false
  }
})
defineEmits(['click'])
</script>

<style scoped>
.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: linear-gradient(180deg, var(--green-soft) 0%, var(--green) 100%);
  color: var(--white);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.01em;
  padding: 20px 38px;
  border-radius: 100px;
  box-shadow: var(--shadow-green);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 44px -12px rgba(8, 127, 99, 0.5);
}

.cta:active {
  transform: translateY(0);
}

.cta__arrow {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.cta:hover .cta__arrow {
  transform: translateX(3px);
}

.cta--block {
  width: 100%;
}

@media (max-width: 480px) {
  .cta {
    padding: 17px 26px;
    font-size: 15px;
  }
}
</style>
