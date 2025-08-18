<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { useGameStore } from '../stores/game'
import { useTileGrid } from '../composables/useTileGrid'
import Tile from './Tile.vue'

const emit = defineEmits(['move-made', 'game-over'])

const totalTiles = 12
const tileSize: [number, number, number] = [1, 1, 0.05]
const gameStore = useGameStore()
const { tiles, cameraZ, fov } = useTileGrid(totalTiles, tileSize, gameStore.seed)

const flippedTiles = ref<number[]>([])
const matchedTiles = ref<Set<number>>(new Set())
const isProcessing = ref(false)

const onTileFlip = (tileId: number) => {
  if (flippedTiles.value.includes(tileId) || matchedTiles.value.has(tileId) || isProcessing.value)
    return

  flippedTiles.value.push(tileId)
  tiles.value[tileId].isFlipped = true

  if (flippedTiles.value.length === 2) {
    emit('move-made')
    isProcessing.value = true
    const [firstId, secondId] = flippedTiles.value
    const firstTile = tiles.value[firstId]
    const secondTile = tiles.value[secondId]

    if (firstTile.imageUrl === secondTile.imageUrl) {
      matchedTiles.value.add(firstId)
      matchedTiles.value.add(secondId)
      flippedTiles.value = []
      isProcessing.value = false

      if (matchedTiles.value.size === tiles.value.length) {
        emit('game-over')
      }
    } else {
      setTimeout(() => {
        tiles.value[firstId].isFlipped = false
        tiles.value[secondId].isFlipped = false
        flippedTiles.value = []
        isProcessing.value = false
      }, 1000)
    }
  }
}
</script>

<template>
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
    />
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
