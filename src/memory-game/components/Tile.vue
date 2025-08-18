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
const isHovered = ref(false)

const lerpValue = (current: number, target: number) => current + (target - current) * 0.1
const animateFlip = (current: number, target: number) => current + (target - current) * 0.1

const { onLoop } = useRenderLoop()
onLoop(() => {
  const targetScale = isHovered.value && !isFlipped.value ? hoverScaleFactor : defaultScale
  const targetRotation = isFlipped.value ? Math.PI : 0

  scale.value = lerpValue(scale.value, targetScale)
  rotationY.value = animateFlip(rotationY.value, targetRotation)
})

const flipCard = () => {
  isFlipped.value = !isFlipped.value
}
</script>

<template>
  <TresMesh
    :position="position || [0, 0, 0]"
    :scale="[scale, scale, defaultScale]"
    :rotation="[0, rotationY, 0]"
    :material="materials"
    @pointer-enter="isHovered = true"
    @pointer-leave="isHovered = false"
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
