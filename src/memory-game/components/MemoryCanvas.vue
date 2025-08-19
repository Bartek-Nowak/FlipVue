<script setup lang="ts">
import { ref, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { useGameStore } from '../stores/game'
import { useTileGrid } from '../composables/useTileGrid'
import Tile from './Tile.vue'
import { SOUND_VOLUME } from '../config/sounds'
import type { TileData } from '../types/TileData'

const emit = defineEmits(['move-made', 'game-over'])

const matchSound = new Audio('/sounds/match.mp3')
matchSound.volume = SOUND_VOLUME

const loadedTiles = ref(0)
const allLoaded = ref(false)

const tileSize: [number, number, number] = [1, 1, 0.05]
const gameStore = useGameStore()

const tiles = ref<TileData[]>([])
const cameraZ = ref(0)
const fov = ref(0)

const flippedTiles = ref<string[]>([])
const isProcessing = ref(false)

const onTileFlip = (tileId: string) => {
  const tileIndex = tiles.value.findIndex((t) => t.id === tileId)
  if (tileIndex === -1) return
  if (
    flippedTiles.value.includes(tileId) ||
    gameStore.matchedTiles.has(tileId) ||
    isProcessing.value
  )
    return

  flippedTiles.value.push(tileId)
  tiles.value[tileIndex].isFlipped = true

  if (flippedTiles.value.length === 2) {
    emit('move-made')
    isProcessing.value = true
    const [firstId, secondId] = flippedTiles.value
    const firstIndex = tiles.value.findIndex((t) => t.id === firstId)
    const secondIndex = tiles.value.findIndex((t) => t.id === secondId)
    const firstTile = tiles.value[firstIndex]
    const secondTile = tiles.value[secondIndex]

    if (firstTile.imageUrl === secondTile.imageUrl && firstTile.rarity === secondTile.rarity) {
      gameStore.matchedTiles = new Set([...gameStore.matchedTiles, firstId, secondId])
      flippedTiles.value = []
      isProcessing.value = false

      matchSound.currentTime = 0
      matchSound.play()

      if (gameStore.matchedTiles.size === tiles.value.length) {
        emit('game-over')
      }
    } else {
      setTimeout(() => {
        tiles.value[firstIndex].isFlipped = false
        tiles.value[secondIndex].isFlipped = false
        flippedTiles.value = []
        isProcessing.value = false
      }, 1000)
    }
  }
}

watch(
  () => [gameStore.totalTiles, gameStore.seed],
  () => {
    const {
      tiles: newTiles,
      cameraZ: newZ,
      fov: newF,
    } = useTileGrid(gameStore.totalTiles, tileSize, gameStore.seed)

    tiles.value = newTiles.value.map((tile) => ({
      ...tile,
      isFlipped: gameStore.matchedTiles.has(tile.id),
    }))

    cameraZ.value = newZ.value
    fov.value = newF

    flippedTiles.value = []
    isProcessing.value = false
    loadedTiles.value = 0
    allLoaded.value = false
  },
)

const handleTileLoaded = () => {
  loadedTiles.value += 1
  if (loadedTiles.value === tiles.value.length) {
    allLoaded.value = true
  }
}
</script>

<template>
  <div
    v-show="!allLoaded"
    class="bg-opacity-70 absolute inset-0 z-50 flex items-center justify-center bg-gray-900"
  >
    <div
      class="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
    ></div>
  </div>

  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, cameraZ]" :look-at="[0, 0, 0]" :fov="fov" />
    <Tile
      v-for="tile in tiles"
      :key="tile.id"
      :position="tile.position"
      :size="tileSize"
      v-model:isFlipped="tile.isFlipped"
      :image-url="tile.imageUrl"
      :rarity="tile.rarity"
      @click="() => onTileFlip(tile.id)"
      @loaded="handleTileLoaded"
    />
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
