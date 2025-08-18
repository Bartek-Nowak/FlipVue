import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  const seed = ref<number>(Math.floor(Math.random() * 1000000))

  const generateNewSeed = () => {
    seed.value = Math.floor(Math.random() * 1000000)
  }

  const shareLink = computed(() => {
    const baseUrl = window.location.origin + window.location.pathname
    return `${baseUrl}?seed=${seed.value}`
  })

  return {
    seed,
    generateNewSeed,
    shareLink,
  }
})
