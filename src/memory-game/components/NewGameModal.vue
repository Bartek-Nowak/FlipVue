<template>
  <BaseModal :is-open="isOpen" title="🎯 Ready to Play? 🎯" @close="closeModal">
    <div class="flex flex-col items-center justify-center gap-4 text-center">
      <div class="text-lg font-medium">Welcome to the Memory Game!</div>

      <div class="w-full">
        <label for="seed" class="mb-1 block text-sm font-medium">Seed:</label>
        <input
          id="seed"
          type="number"
          v-model.number="gameStore.seed"
          class="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        />
      </div>

      <div class="w-full">
        <span class="mb-1 block text-sm font-medium">Select Difficulty:</span>

        <div class="grid grid-cols-3 gap-2">
          <label
            class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 font-medium text-white transition hover:bg-gray-700 has-[:checked]:border-green-500 has-[:checked]:bg-green-600 has-[:checked]:text-white"
          >
            <input type="radio" value="6" v-model.number="difficulty" class="hidden" />
            Easy
          </label>

          <label
            class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 font-medium text-white transition hover:bg-gray-700 has-[:checked]:border-green-500 has-[:checked]:bg-green-600 has-[:checked]:text-white"
          >
            <input type="radio" value="12" v-model.number="difficulty" class="hidden" />
            Medium
          </label>

          <label
            class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 font-medium text-white transition hover:bg-gray-700 has-[:checked]:border-green-500 has-[:checked]:bg-green-600 has-[:checked]:text-white"
          >
            <input type="radio" value="16" v-model.number="difficulty" class="hidden" />
            Hard
          </label>
        </div>
      </div>

      <button
        @click="startGame"
        class="w-full rounded-lg bg-green-600 px-4 py-2 font-bold text-white transition hover:bg-green-700"
      >
        Start Game
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useGameStore } from '../stores/game'
import BaseModal from '@/components/BaseModal.vue'

const gameStore = useGameStore()
const isOpen = defineModel<boolean>('isOpen', { default: true })

const emit = defineEmits(['start-game'])
const difficulty = ref(gameStore.totalTiles)

watchEffect(() => {
  difficulty.value = gameStore.totalTiles
})

const closeModal = () => {
  isOpen.value = false
}

const startGame = () => {
  gameStore.totalTiles = difficulty.value

  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  if (!token) {
    gameStore.generateNewSeed(difficulty.value)
  }

  const newToken = gameStore.generateToken()
  const baseUrl = window.location.origin + window.location.pathname
  const newUrl = `${baseUrl}?token=${newToken}`
  window.history.replaceState(null, '', newUrl)

  emit('start-game')
  closeModal()
}
</script>
<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
