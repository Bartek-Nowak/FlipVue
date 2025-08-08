<template>
  <div ref="container" class="relative h-full w-full">
    <div class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <canvas ref="canvasEl" :width="width" :height="height" class="bg-gray-500" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, ref, onMounted, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useCanvasShapes } from '../composables/useCanvasShapes'

const container = useTemplateRef('container')
const { width, height } = useElementSize(container)

const canvasEl = ref<HTMLCanvasElement | null>(null)

const { drawAll } = useCanvasShapes()

const redraw = () => {
  if (!canvasEl.value) return
  const ctx = canvasEl.value.getContext('2d')
  if (!ctx) return
  drawAll(ctx, width.value, height.value)
}

onMounted(() => {
  redraw()
})

watch(
  [width, height],
  () => {
    redraw()
  },
  { flush: 'post' },
)
</script>
