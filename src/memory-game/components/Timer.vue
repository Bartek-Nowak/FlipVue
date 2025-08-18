<template>
  <div class="flex flex-col items-center gap-2">
    <div
      class="relative flex h-24 w-24 items-center justify-center rounded-full"
      :style="{
        background: `conic-gradient(${currentColor} 0deg, ${currentColor} ${progress * 360}deg, #333 ${progress * 360}deg 360deg)`,
      }"
    >
      <div
        class="absolute inset-2 flex items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white"
      >
        {{ time }}s
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref(0)
let timer: ReturnType<typeof setInterval>

const colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']
let currentColorIndex = 0
const currentColor = ref(colors[currentColorIndex])
const progress = ref(0)

const startTimer = () => {
  timer = setInterval(() => {
    time.value++
    progress.value = (time.value % 10) / 10
    if (time.value % 10 === 0) {
      currentColorIndex = (currentColorIndex + 1) % colors.length
      currentColor.value = colors[currentColorIndex]
    }
  }, 1000)
}

onMounted(() => startTimer())
onUnmounted(() => clearInterval(timer))
</script>
