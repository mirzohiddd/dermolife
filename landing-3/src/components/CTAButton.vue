<template>
  <button
    class="cta-button"
    :class="size"
    :disabled="disabled"
    :aria-busy="disabled"
    @click="$emit('click')"
  >
    <span>{{ label }}</span>
    <svg v-if="!disabled" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'BEPUL QATNASHISH'
  },
  size: {
    type: String,
    default: 'lg'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
defineEmits(['click'])
</script>

<style scoped>
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(180deg, #E4A928 0%, var(--color-gold) 55%, var(--color-gold-dark) 100%);
  color: var(--color-navy);
  font-family: var(--font-body);
  font-weight: 800;
  letter-spacing: 0.03em;
  border-radius: 999px;
  box-shadow: 0 14px 30px -8px rgba(217, 154, 24, 0.55), inset 0 1px 0 rgba(255,255,255,0.4);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  white-space: nowrap;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px -8px rgba(217, 154, 24, 0.65), inset 0 1px 0 rgba(255,255,255,0.4);
}

.cta-button:active {
  transform: translateY(0px);
}

.cta-button svg {
  flex-shrink: 0;
  transition: transform 0.18s ease;
}

.cta-button:hover svg {
  transform: translateX(3px);
}

.cta-button.lg {
  padding: 20px 40px;
  font-size: 19px;
}

.cta-button.md {
  padding: 16px 32px;
  font-size: 16px;
}

.cta-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 640px) {
  .cta-button.lg {
    padding: 18px 28px;
    font-size: 16px;
    width: 100%;
  }
}
</style>
