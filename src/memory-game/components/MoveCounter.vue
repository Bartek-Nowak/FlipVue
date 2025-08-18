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
        {{ moves }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ moves: number }>()

const colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']
let currentColorIndex = 0
const currentColor = ref(colors[currentColorIndex])
const progress = ref(0)

watch(
  () => props.moves,
  (newMoves) => {
    const step = 10
    progress.value = (newMoves % step) / step
    if (newMoves % step === 0 && newMoves !== 0) {
      currentColorIndex = (currentColorIndex + 1) % colors.length
      currentColor.value = colors[currentColorIndex]
    }
  },
  { immediate: true },
)
</script>
