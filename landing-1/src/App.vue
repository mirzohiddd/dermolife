<template>
  <main class="page">
    <HeroSection @open-modal="isModalOpen = true" />
    <TopicsSection @open-modal="isModalOpen = true" />
    <RegistrationModal v-model="isModalOpen" />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from './components/HeroSection.vue'
import TopicsSection from './components/TopicsSection.vue'
import RegistrationModal from './components/RegistrationModal.vue'

const isModalOpen = ref(false)
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
}
</style>
