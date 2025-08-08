<template>
  <div ref="container" class="relative h-full w-full">
    <div class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <canvas ref="canvasEl" :width="width" :height="height" class="bg-gray-800" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, ref } from 'vue'
import { useElementSize } from '@vueuse/core'

const container = useTemplateRef('container')
const { width, height } = useElementSize(container)

const canvasEl = ref<HTMLCanvasElement | null>(null)
</script>
