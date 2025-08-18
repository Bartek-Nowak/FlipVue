<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import Tile from './Tile.vue'
import { useTileGrid } from '../composables/useTileGrid'

const totalTiles = 12
const tileSize: [number, number, number] = [1, 1, 0.05]

const seed = 1234
const { tiles, cameraZ, fov } = useTileGrid(totalTiles, tileSize, seed)
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
    />
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
