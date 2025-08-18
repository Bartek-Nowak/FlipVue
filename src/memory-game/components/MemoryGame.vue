<template>
  <div class="flex aspect-square h-screen flex-col items-center justify-start border p-4">
    <div class="mb-4 flex w-full justify-between text-lg font-bold">
      <div>Time: {{ time }}s</div>
      <div>Moves: {{ moves }}</div>
    </div>
    <MemoryCanvas @move-made="moves++" @game-over="stopTimer" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MemoryCanvas from './MemoryCanvas.vue'

const time = ref(0)
const moves = ref(0)
let timer: ReturnType<typeof setInterval>

const stopTimer = () => {
  clearInterval(timer)
}

onMounted(() => {
  timer = setInterval(() => {
    time.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
