<template>
  <div class="flex h-screen flex-col gap-4 bg-gray-900 p-4 text-white md:flex-row">
    <div
      class="flex w-full flex-col items-start justify-start rounded-lg bg-gray-800 p-4 shadow-lg md:w-1/4"
    >
      <h1 class="mb-6 text-center text-2xl font-bold md:text-left">Memory Game</h1>
      <div class="mb-6 flex w-full gap-6 lg:flex-col">
        <div class="flex flex-col items-center gap-2">
          <span class="text-xl font-bold">Timer</span>
          <Timer :time="time" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-xl font-bold">Moves</span>
          <MoveCounter :moves="moves" />
        </div>
      </div>

      <button
        @click="newGame"
        class="mt-auto w-full rounded-lg bg-purple-600 px-4 py-2 font-bold transition hover:bg-purple-700"
      >
        New Game
      </button>

      <button
        @click="shareSeed"
        class="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 font-bold transition hover:bg-blue-700"
      >
        Share Game
      </button>
    </div>

    <div
      class="flex w-full flex-1 items-center justify-center rounded-lg bg-gray-700 p-4 shadow-inner"
    >
      <MemoryCanvas :seed="gameStore.seed" @move-made="moves++" @game-over="gameOver" />
    </div>

    <NewGameModal v-model:isOpen="isNewGame" @start-game="startTimer" />
    <GameOverModal v-model:isOpen="isGameOver" />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useGameStore } from '../stores/game'
import MemoryCanvas from './MemoryCanvas.vue'
import Timer from './Timer.vue'
import MoveCounter from './MoveCounter.vue'
import GameOverModal from './GameOverModal.vue'
import NewGameModal from './NewGameModal.vue'

const moves = ref(0)
const time = ref(0)
let timer: ReturnType<typeof setInterval>

const isNewGame = ref(true)
const isGameOver = ref(false)

const gameStore = useGameStore()

const startTimer = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    time.value++
  }, 1000)
}

const stopTimer = () => clearInterval(timer)

const shareSeed = () => {
  navigator.clipboard.writeText(gameStore.shareLink)
  alert('Link copied to clipboard!')
}

const newGame = () => {
  gameStore.generateNewSeed()
  moves.value = 0
  time.value = 0
}

const gameOver = () => {
  stopTimer()
  isGameOver.value = true
}

onUnmounted(() => clearInterval(timer))
</script>
