<template>
  <main>
    <HeroSection @open-modal="showModal = true" />
    <TopicsSection />
    <RegistrationModal v-model="showModal" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from './components/HeroSection.vue'
import TopicsSection from './components/TopicsSection.vue'
import RegistrationModal from './components/RegistrationModal.vue'

const showModal = ref(false)
</script>
