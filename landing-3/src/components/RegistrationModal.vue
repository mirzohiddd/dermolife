<template>
  <Transition name="fade">
    <div v-if="modelValue" class="overlay" @click.self="close">
      <Transition name="pop">
        <div v-if="modelValue" class="modal">
          <button class="close-btn" @click="close" aria-label="Yopish">&times;</button>

          <h3 class="modal-title">Ro‘yxatdan o‘tish</h3>
          <p class="modal-subtitle">Ma’lumotlaringizni to‘ldiring, seminarga qatnashish havolasini olasiz.</p>

          <p
            v-if="status !== 'idle'"
            class="status-banner"
            :class="status === 'success' ? 'status-banner--success' : 'status-banner--error'"
            role="status"
          >
            {{ statusMessage }}
          </p>

          <form class="form" novalidate @submit.prevent="submit">
            <label class="field">
              <span class="field-label">Ism-familiya</span>
              <input
                v-model.trim="form.fullName"
                type="text"
                placeholder="Ism-familiyangiz"
                :class="{ 'field-input--error': errors.fullName }"
                @input="errors.fullName = ''"
              />
              <span v-if="errors.fullName" class="field-error">{{ errors.fullName }}</span>
            </label>

            <label class="field">
              <span class="field-label">Kasallik turi</span>
              <select
                v-model="form.condition"
                :class="{ 'field-input--error': errors.condition }"
                @change="errors.condition = ''"
              >
                <option value="" disabled>Tanlang</option>
                <option value="psoriaz">Psoriaz</option>
                <option value="dermatit">Dermatit</option>
                <option value="ekzema">Ekzema</option>
                <option value="boshqa">Boshqa</option>
              </select>
              <span v-if="errors.condition" class="field-error">{{ errors.condition }}</span>
            </label>

            <label class="field">
              <span class="field-label">Qachondan beri bezovta qiladi?</span>
              <input
                v-model.trim="form.duration"
                type="text"
                placeholder="Masalan: 6 oydan beri"
                :class="{ 'field-input--error': errors.duration }"
                @input="errors.duration = ''"
              />
              <span v-if="errors.duration" class="field-error">{{ errors.duration }}</span>
            </label>

            <label class="field">
              <span class="field-label">Telefon raqami</span>
              <input
                v-model.trim="form.phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                :class="{ 'field-input--error': errors.phone }"
                @input="errors.phone = ''"
              />
              <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
            </label>

            <CTAButton
              :label="submitting ? 'Yuborilmoqda...' : 'RO‘YXATDAN O‘TISH'"
              size="md"
              :disabled="submitting"
            />
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CTAButton from './CTAButton.vue'
import { registerParticipant } from '../api'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const TELEGRAM_URL = 'https://t.me/marafonpsoriaz'

const form = reactive({
  fullName: '',
  condition: '',
  duration: '',
  phone: ''
})

const errors = reactive({
  fullName: '',
  condition: '',
  duration: '',
  phone: ''
})

// submitting: request in flight (button disabled, prevents duplicate submits)
// status: 'idle' | 'success' | 'error' — drives the banner shown above the form
const submitting = ref(false)
const status = ref('idle')
const statusMessage = ref('')

function close() {
  emit('update:modelValue', false)
  status.value = 'idle'
  statusMessage.value = ''
}

function validate() {
  let valid = true

  const name = form.fullName.trim()
  if (!name) {
    errors.fullName = 'Ism va familiyangizni kiriting'
    valid = false
  } else if (name.length < 2) {
    errors.fullName = 'Ism-familiya juda qisqa'
    valid = false
  } else {
    errors.fullName = ''
  }

  if (!form.condition) {
    errors.condition = 'Kasallik turini tanlang'
    valid = false
  } else {
    errors.condition = ''
  }

  if (!form.duration.trim()) {
    errors.duration = 'Muddatni ko‘rsating'
    valid = false
  } else {
    errors.duration = ''
  }

  const digits = form.phone.replace(/\D/g, '')
  if (!form.phone.trim()) {
    errors.phone = 'Telefon raqamingizni kiriting'
    valid = false
  } else if (digits.length < 9 || digits.length > 13) {
    errors.phone = 'Telefon raqami noto‘g‘ri, qaytadan tekshiring'
    valid = false
  } else {
    errors.phone = ''
  }

  return valid
}

function resetForm() {
  form.fullName = ''
  form.condition = ''
  form.duration = ''
  form.phone = ''
  errors.fullName = ''
  errors.condition = ''
  errors.duration = ''
  errors.phone = ''
}

async function submit() {
  if (submitting.value) return // guards against duplicate submits
  if (!validate()) return

  submitting.value = true
  status.value = 'idle'
  statusMessage.value = ''

  try {
    const result = await registerParticipant({
      name: form.fullName,
      disease: form.condition,
      duration: form.duration,
      phone: form.phone
    })

    status.value = 'success'
    statusMessage.value = result.message || 'Ro‘yxatdan muvaffaqiyatli o‘tdingiz!'
    resetForm()

    // Give the person a moment to read the confirmation before handing
    // them off to the Telegram group.
    setTimeout(() => {
      window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer')
      close()
    }, 1200)
  } catch (error) {
    if (error.fieldErrors) {
      Object.entries(error.fieldErrors).forEach(([field, message]) => {
        const key = field === 'name' ? 'fullName' : field === 'disease' ? 'condition' : field
        if (key in errors) errors[key] = message
      })
    }
    status.value = 'error'
    statusMessage.value = error.message || 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 43, 53, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
}

.modal {
  position: relative;
  width: 100%;
  max-width: 460px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 44px 36px 36px;
  box-shadow: var(--shadow-soft);
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-bg-alt);
  color: var(--color-navy);
  font-size: 22px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
}

.close-btn:hover {
  background: #EADFC2;
}

.modal-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 26px;
  color: var(--color-navy);
  margin-bottom: 8px;
}

.modal-subtitle {
  font-size: 14px;
  color: var(--color-ink-muted);
  line-height: 1.5;
  margin-bottom: 26px;
}

.status-banner {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  margin-bottom: 20px;
}

.status-banner--success {
  color: #2E7D4F;
  background: rgba(46, 125, 79, 0.1);
  border: 1px solid rgba(46, 125, 79, 0.3);
}

.status-banner--error {
  color: #C0392B;
  background: rgba(192, 57, 43, 0.08);
  border: 1px solid rgba(192, 57, 43, 0.3);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-navy-soft);
  letter-spacing: 0.02em;
}

.field input,
.field select {
  border: 1.5px solid #E5DEC9;
  border-radius: var(--radius-sm);
  padding: 13px 16px;
  font-size: 15px;
  color: var(--color-navy);
  background: var(--color-bg);
  transition: border-color 0.15s ease;
}

.field input:focus,
.field select:focus {
  border-color: var(--color-gold);
  outline: none;
}

.field-input--error,
.field input.field-input--error,
.field select.field-input--error {
  border-color: #C0392B;
}

.field-error {
  font-size: 12.5px;
  color: #C0392B;
}

.form .cta-button,
.form :deep(.cta-button) {
  margin-top: 8px;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.22s ease;
}
.pop-leave-active {
  transition: transform 0.16s ease, opacity 0.16s ease;
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0.94) translateY(8px);
  opacity: 0;
}

@media (max-width: 480px) {
  .modal {
    padding: 36px 24px 28px;
  }
}
</style>
