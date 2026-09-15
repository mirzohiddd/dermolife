<template>
  <button
    class="cta"
    :class="{ 'cta--block': block }"
    type="button"
    @click="$emit('click')"
  >
    <span class="cta__text">{{ label }}</span>

    <svg
      class="cta__arrow"
      width="20"
      height="16"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H17M17 7L11 1M17 7L11 13"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
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

  width: auto;

  background: linear-gradient(
    180deg,
    var(--gold-soft) 0%,
    var(--gold) 100%
  );

  color: #1A1204;

  font-family: var(--font-body);

  /* BUTTON TEXT */
  font-weight: 800;
  font-size: 16px;
  line-height: 1;

  letter-spacing: 0.03em;

  padding: 19px 36px;

  border: none;
  border-radius: 100px;

  cursor: pointer;

  box-shadow:
    0 10px 30px -8px rgba(223, 165, 43, 0.55);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;

  white-space: nowrap;
}

/* TEXT */
.cta__text {
  font-weight: 800;
}

/* ARROW */
.cta__arrow {
  flex-shrink: 0;

  transition:
    transform 0.2s ease;
}

/* HOVER */
.cta:hover {
  transform: translateY(-2px);

  box-shadow:
    0 14px 36px -8px rgba(223, 165, 43, 0.7);

  filter: brightness(1.05);
}

.cta:hover .cta__arrow {
  transform: translateX(4px);
}

/* CLICK */
.cta:active {
  transform: translateY(0);

  box-shadow:
    0 8px 20px -8px rgba(223, 165, 43, 0.5);
}

/* FULL WIDTH */
.cta--block {
  width: 100%;
}

/* MOBILE */
@media (max-width: 480px) {
  .cta {
    width: 100%;

    padding: 17px 24px;

    font-size: 15px;

    gap: 12px;
  }

  .cta__text {
    font-weight: 800;
  }

  .cta__arrow {
    width: 19px;
    height: 15px;
  }
}
</style>