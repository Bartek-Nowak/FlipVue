<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import Tile from './Tile.vue'
import { useTileGrid } from '../composables/useTileGrid'

const totalTiles = 2
const tileSize: [number, number, number] = [1, 1, 0.05]

const { tiles, cameraZ, fov } = useTileGrid(totalTiles, tileSize)
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
      image-url="/kuro-logo.png"
      rarity="mythical"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
