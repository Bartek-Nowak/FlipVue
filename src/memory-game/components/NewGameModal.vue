<template>
  <BaseModal :is-open="isOpen" title="🎯 Ready to Play? 🎯" @close="closeModal" hidde-close-button>
    <div class="flex flex-col items-center justify-center gap-4 text-center">
      <div class="text-lg font-medium">Welcome to the Memory Game!</div>

      <div class="relative w-full">
        <label for="seed" class="mb-1 block text-sm font-medium">Seed:</label>
        <input
          id="seed"
          type="number"
          v-model.number="gameStore.seed"
          class="w-full rounded border border-gray-600 bg-gray-800 py-2 pr-10 pl-2 text-white"
        />
        <button
          class="absolute top-1/2 right-3 cursor-pointer text-lg text-gray-400"
          @click="gameStore.generateNewSeed()"
        >
          🎲
        </button>
      </div>

      <div class="w-full">
        <span class="mb-1 block text-sm font-medium">Select Difficulty:</span>

        <div class="grid grid-cols-3 gap-2">
          <label
            class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 font-medium text-white transition hover:bg-gray-700 has-[:checked]:border-green-500 has-[:checked]:bg-green-600 has-[:checked]:text-white"
          >
            <input type="radio" value="6" v-model.number="gameStore.totalTiles" class="hidden" />
            Easy
          </label>

          <label
            class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 font-medium text-white transition hover:bg-gray-700 has-[:checked]:border-green-500 has-[:checked]:bg-green-600 has-[:checked]:text-white"
          >
            <input type="radio" value="12" v-model.number="gameStore.totalTiles" class="hidden" />
            Medium
          </label>

          <label
            class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 font-medium text-white transition hover:bg-gray-700 has-[:checked]:border-green-500 has-[:checked]:bg-green-600 has-[:checked]:text-white"
          >
            <input type="radio" value="16" v-model.number="gameStore.totalTiles" class="hidden" />
            Hard
          </label>
        </div>
      </div>

      <button
        :disabled="!gameStore.canContinue"
        @click="contiuneGame"
        class="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
      <button
        @click="startGame"
        class="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-2 font-bold text-white transition hover:bg-green-700"
      >
        Start Game
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/game'
import BaseModal from '@/components/BaseModal.vue'

const gameStore = useGameStore()
const isOpen = defineModel<boolean>('isOpen', { default: true })

const emit = defineEmits(['start-game', 'continue-game'])

const closeModal = () => {
  isOpen.value = false
}

const startGame = () => {
  gameStore.newGame()
  emit('start-game')
  closeModal()
}

const contiuneGame = () => {
  gameStore.continueGame()
  emit('continue-game')
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
