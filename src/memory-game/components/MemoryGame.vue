<template>
  <div class="flex h-screen flex-col gap-4 bg-gray-900 p-4 text-white md:flex-row">
    <div
      class="flex w-full flex-col items-start justify-start rounded-lg bg-gray-800 p-4 shadow-lg md:w-1/4"
    >
      <h1 class="text-md mb-6 hidden text-center text-2xl font-bold md:block md:text-left">
        Memory Game
      </h1>
      <div class="mb-6 flex w-full justify-around gap-6 lg:flex-col">
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm font-bold lg:text-xl">Timer</span>
          <Timer :time="gameStore.time" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm font-bold lg:text-xl">Moves</span>
          <MoveCounter :moves="gameStore.moves" />
        </div>
      </div>

      <div class="flex w-full gap-2 lg:flex-col">
        <button
          @click="newGameHandler"
          class="lg:text-md mt-auto w-full rounded-lg bg-purple-600 px-2 py-2 text-xs font-bold whitespace-nowrap transition hover:bg-purple-700 sm:text-sm"
        >
          New Game
        </button>

        <button
          @click="shareSeed"
          class="lg:text-md mt-2 w-full rounded-lg bg-blue-600 px-2 py-2 text-xs font-bold whitespace-nowrap transition hover:bg-blue-700 sm:text-sm"
        >
          Share Game
        </button>
      </div>
    </div>

    <div
      class="relative flex w-full flex-1 items-center justify-center rounded-lg bg-gray-700 p-4 shadow-inner"
    >
      <MemoryCanvas
        :seed="gameStore.seed"
        @move-made="gameStore.moves++"
        @game-over="gameOverHandler"
      />
    </div>

    <NewGameModal v-model:isOpen="isNewGame" @start-game="startTimer" @continue-game="startTimer" />
    <GameOverModal
      v-model:isOpen="isGameOver"
      :moves="gameStore.moves"
      :time="gameStore.time"
      @play-again="playAgainHandler"
    />
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

let timer: ReturnType<typeof setInterval>

const isNewGame = ref(true)
const isGameOver = ref(false)

const gameStore = useGameStore()

const startTimer = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    gameStore.time++
  }, 1000)
}

const stopTimer = () => clearInterval(timer)

const shareSeed = () => {
  navigator.clipboard.writeText(gameStore.shareLink)
  alert('Link copied to clipboard!')
}

const newGameHandler = () => {
  stopTimer()
  isNewGame.value = true
  gameStore.generateNewSeed()
}

const playAgainHandler = () => {
  stopTimer()
  isNewGame.value = true
  gameStore.generateNewSeed()
}

const gameOverHandler = () => {
  stopTimer()
  isGameOver.value = true
}

onUnmounted(() => clearInterval(timer))
</script>
