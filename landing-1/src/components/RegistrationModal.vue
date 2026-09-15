<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @mousedown.self="close"
      >
        <div
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button class="modal__close" type="button" aria-label="Yopish" @click="close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>

          <span class="modal__tag">BEPUL JONLI EFIR</span>
          <h3 id="modal-title" class="modal__title">
            Qatnashish uchun ma’lumotlaringizni kiriting
          </h3>

          <p
            v-if="status !== 'idle'"
            class="modal__status"
            :class="status === 'success' ? 'modal__status--success' : 'modal__status--error'"
            role="status"
          >
            {{ statusMessage }}
          </p>

          <form class="modal__form" novalidate @submit.prevent="handleSubmit">
            <div class="field">
              <label class="field__label" for="fullName">Ism-familiyangiz</label>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                class="field__input"
                :class="{ 'field__input--error': errors.fullName }"
                placeholder="Ism va familiya"
                autocomplete="name"
                @input="clearError('fullName')"
              />
              <span v-if="errors.fullName" class="field__error">{{ errors.fullName }}</span>
            </div>

            <div class="field">
              <label class="field__label" for="condition">Kasallik turi</label>
              <div class="field__select-wrap">
                <select
                  id="condition"
                  v-model="form.condition"
                  class="field__input field__select"
                  :class="{ 'field__input--error': errors.condition }"
                  @change="clearError('condition')"
                >
                  <option value="" disabled>Tanlang</option>
                  <option value="Psoriaz">Psoriaz</option>
                  <option value="Dermatit">Dermatit</option>
                  <option value="Ekzema">Ekzema</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
                <svg class="field__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span v-if="errors.condition" class="field__error">{{ errors.condition }}</span>
            </div>

            <div class="field">
              <label class="field__label" for="duration">Qachondan beri bezovta qiladi?</label>
              <div class="field__select-wrap">
                <select
                  id="duration"
                  v-model="form.duration"
                  class="field__input field__select"
                  :class="{ 'field__input--error': errors.duration }"
                  @change="clearError('duration')"
                >
                  <option value="" disabled>Tanlang</option>
                  <option value="1 oydan kam">1 oydan kam</option>
                  <option value="1–6 oy">1–6 oy</option>
                  <option value="6 oydan ko‘p">6 oydan ko‘p</option>
                  <option value="Bir necha yil">Bir necha yil</option>
                </select>
                <svg class="field__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span v-if="errors.duration" class="field__error">{{ errors.duration }}</span>
            </div>

            <div class="field">
              <label class="field__label" for="phone">Telefon raqamingiz</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                inputmode="tel"
                class="field__input"
                :class="{ 'field__input--error': errors.phone }"
                placeholder="+998 90 123 45 67"
                autocomplete="tel"
                @input="clearError('phone')"
              />
              <span v-if="errors.phone" class="field__error">{{ errors.phone }}</span>
            </div>

            <button type="submit" class="modal__submit" :disabled="submitting" :aria-busy="submitting">
              <span>{{ submitting ? 'Yuborilmoqda...' : 'RO‘YXATDAN O‘TISH' }}</span>
              <svg v-if="!submitting" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref, watch, onBeforeUnmount } from 'vue'
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

function clearError(field) {
  errors[field] = ''
}

function validate() {
  let valid = true

  const name = form.fullName.trim()
  if (!name) {
    errors.fullName = 'Ism va familiyangizni kiriting'
    valid = false
  } else if (name.length < 3) {
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

  if (!form.duration) {
    errors.duration = 'Muddatni tanlang'
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

async function handleSubmit() {
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
    // Field-level errors from the backend (e.g. it rejected something the
    // client-side check missed) are mapped back onto the form; anything
    // else is shown as a general banner.
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

function close() {
  emit('update:modelValue', false)
  status.value = 'idle'
  statusMessage.value = ''
}

function handleKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  }
)

window.addEventListener('keydown', handleKeydown)
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(2, 2, 2, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.modal {
  position: relative;
  width: 100%;
  max-width: 460px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: var(--panel-black);
  border: 1px solid rgba(223, 165, 43, 0.5);
  border-radius: 24px;
  padding: 44px 40px 40px;
  box-shadow: 0 24px 70px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(223, 165, 43, 0.06);
}

.modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--hairline);
  background: transparent;
  color: var(--white-70);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.modal__close:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.modal__tag {
  display: inline-block;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--gold);
  background: rgba(223, 165, 43, 0.12);
  border: 1px solid rgba(223, 165, 43, 0.4);
  border-radius: 100px;
  padding: 8px 16px;
  margin-bottom: 20px;
}

.modal__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  line-height: 1.35;
  color: var(--white);
  margin-bottom: 28px;
  max-width: 340px;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--white-70);
}

.field__input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--hairline);
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  font-family: var(--font-body);
  color: var(--white);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.field__input::placeholder {
  color: var(--white-45);
}

.field__input:focus {
  outline: none;
  border-color: var(--gold);
  background: rgba(223, 165, 43, 0.06);
}

.field__input--error {
  border-color: #E0574A;
}

.field__select-wrap {
  position: relative;
}

.field__select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 40px;
  cursor: pointer;
}

.field__select option {
  background: var(--panel-black);
  color: var(--white);
}

.field__chevron {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: var(--white-45);
  pointer-events: none;
}

.field__error {
  font-size: 12.5px;
  color: #E0574A;
}

.modal__submit {
  margin-top: 10px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(180deg, var(--gold-soft) 0%, var(--gold) 100%);
  color: #1A1204;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.04em;
  padding: 17px 24px;
  border-radius: 100px;
  box-shadow: 0 10px 30px -8px rgba(223, 165, 43, 0.55);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.modal__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px -8px rgba(223, 165, 43, 0.7);
}

.modal__submit:active {
  transform: translateY(0);
}

.modal__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.modal__status {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 18px;
}

.modal__status--success {
  color: #2E9E5B;
  background: rgba(46, 158, 91, 0.12);
  border: 1px solid rgba(46, 158, 91, 0.35);
}

.modal__status--error {
  color: #E0574A;
  background: rgba(224, 87, 74, 0.1);
  border: 1px solid rgba(224, 87, 74, 0.35);
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.22s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(16px) scale(0.98);
  opacity: 0;
}

/* Mobile */
@media (max-width: 480px) {
  .modal-overlay {
    padding: 16px;
    align-items: flex-end;
  }

  .modal {
    max-width: 100%;
    max-height: calc(100vh - 32px);
    border-radius: 22px 22px 0 0;
    padding: 36px 24px 28px;
  }

  .modal__title {
    font-size: 19px;
    max-width: none;
  }

  .modal__close {
    top: 16px;
    right: 16px;
  }
}
</style>
