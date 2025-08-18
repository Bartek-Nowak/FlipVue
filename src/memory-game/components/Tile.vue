<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { MeshStandardMaterial, CanvasTexture, TextureLoader } from 'three'
import { rarityColor } from '../utils/cardRarity'

const isFlipped = defineModel<boolean>('isFlipped')

const props = defineProps<{
  size: [number, number, number]
  position?: [number, number, number]
  imageUrl: string
  rarity:
    | 'common'
    | 'uncommon'
    | 'rare'
    | 'mythical'
    | 'legendary'
    | 'ancient'
    | 'exceedigly_rare'
    | 'immortal'
}>()

const gradientTexture = new CanvasTexture(rarityColor(props.rarity))

const materials = [
  new MeshStandardMaterial({ color: 'black' }),
  new MeshStandardMaterial({ color: 'black' }),
  new MeshStandardMaterial({ color: 'black' }),
  new MeshStandardMaterial({ color: 'black' }),
  new MeshStandardMaterial({ color: '#333133' }),
  new MeshStandardMaterial({ map: gradientTexture }),
]

const imageTexture = ref<any>(null)
const planeMaterial = ref<MeshStandardMaterial | null>(null)

watch(
  () => props.imageUrl,
  (url) => {
    if (!url) return
    new TextureLoader().load(url, (texture) => {
      imageTexture.value = texture
      planeMaterial.value = new MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.1,
      })
    })
  },
  { immediate: true },
)

const defaultScale = 1
const hoverScaleFactor = 1.05

const scale = ref(defaultScale)
const rotationY = ref(0)
const rotationX = ref(0)
const isHovered = ref(false)

const targetTiltX = ref(0)
const targetTiltY = ref(0)
const maxTilt = 0.6

const lerp = (current: number, target: number, speed = 0.1) => current + (target - current) * speed

const { onLoop } = useRenderLoop()
onLoop(() => {
  const targetScale = isHovered.value && !isFlipped.value ? hoverScaleFactor : defaultScale
  const targetRotationY = isFlipped.value ? Math.PI : 0

  scale.value = lerp(scale.value, targetScale)
  rotationY.value = lerp(rotationY.value, targetRotationY)
  rotationX.value = lerp(rotationX.value, targetTiltX.value)
  rotationY.value = lerp(rotationY.value, targetTiltY.value + targetRotationY)
})

const flipCard = () => {
  isFlipped.value = !isFlipped.value
}

const handlePointerMove = (e: any) => {
  if (!isHovered.value) return
  const { uv } = e
  if (!uv) return
  const offsetX = uv.x - 0.5
  const offsetY = uv.y - 0.5

  targetTiltX.value = -offsetY * maxTilt
  targetTiltY.value = offsetX * maxTilt
}

const handlePointerLeave = () => {
  isHovered.value = false
  targetTiltX.value = 0
  targetTiltY.value = 0
}
</script>

<template>
  <TresMesh
    :position="position || [0, 0, 0]"
    :scale="[scale, scale, defaultScale]"
    :rotation="[rotationX, rotationY, 0]"
    :material="materials"
    @pointer-enter="isHovered = true"
    @pointer-leave="handlePointerLeave"
    @pointer-move="handlePointerMove"
    @click="flipCard"
  >
    <TresBoxGeometry :args="size" />

    <TresMesh :position="[0, 0, -size[2] / 2 - 0.01]" :rotation="[0, Math.PI, 0]">
      <TresPlaneGeometry :args="[size[0] * 0.9, size[1] * 0.9]" />
      <TresMeshStandardMaterial v-if="planeMaterial" :map="planeMaterial.map" :transparent="true" />
      <TresMeshStandardMaterial v-else color="red" />
    </TresMesh>
  </TresMesh>
</template>
