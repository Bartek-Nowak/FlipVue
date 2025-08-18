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
import { computed } from 'vue'

const props = defineProps<{ time: number }>()

const progress = computed(() => (props.time % 10) / 10)

const colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']
const currentColorIndex = computed(() => Math.floor(props.time / 10) % colors.length)
const currentColor = computed(() => colors[currentColorIndex.value])
</script>
