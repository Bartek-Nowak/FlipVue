import { ref } from 'vue'
import tilePool from '../data/tilePool.json'
import type { TileData } from '../types/TileData'

export const useTileGrid = (
  totalTiles: number,
  tileSize: [number, number, number],
  seed: number,
  margin = 0.2,
  padding = 0.5,
) => {
  const tiles = ref<TileData[]>([])
  const cameraZ = ref(10)
  const fov = 50

  const rng = (function (seed: number) {
    let x = seed % 2147483647
    return () => {
      x = (x * 16807) % 2147483647
      return (x - 1) / 2147483646
    }
  })(seed)

  const weightedShuffle = () => {
    const weightedPool: { imageUrl: string; rarity: string }[] = []

    tilePool.forEach((t) => {
      for (let i = 0; i < t.weight; i++) {
        weightedPool.push({ imageUrl: t.imageUrl, rarity: t.rarity })
      }
    })

    const uniqueTiles: { imageUrl: string; rarity: string }[] = []
    const totalPairs = totalTiles / 2
    const usedKeys = new Set<string>()

    while (uniqueTiles.length < totalPairs && weightedPool.length > 0) {
      const index = Math.floor(rng() * weightedPool.length)
      const chosen = weightedPool.splice(index, 1)[0]
      const key = `${chosen.imageUrl}|${chosen.rarity}`

      if (!usedKeys.has(key)) {
        uniqueTiles.push(chosen)
        usedKeys.add(key)
      }
    }

    const fullDeck: { imageUrl: string; rarity: string }[] = []
    uniqueTiles.forEach((t) => {
      fullDeck.push({ ...t })
      fullDeck.push({ ...t })
    })

    for (let i = fullDeck.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]]
    }

    return fullDeck
  }

  const deck = weightedShuffle()
  tiles.value = deck.map((t, i) => ({
    id: i,
    position: [0, 0, 0] as [number, number, number],
    isFlipped: false,
    imageUrl: t.imageUrl,
    rarity: t.rarity as TileData['rarity'],
  }))

  const updateGrid = () => {
    const approxCols = Math.ceil(Math.sqrt(totalTiles))
    const colsCount = approxCols
    const rowsCount = Math.ceil(totalTiles / colsCount)

    tiles.value.forEach((tile, i) => {
      const row = Math.floor(i / colsCount)
      const colInRow = i % colsCount
      const tilesInThisRow =
        row === rowsCount - 1 ? totalTiles - colsCount * (rowsCount - 1) : colsCount
      const x =
        colInRow * (tileSize[0] + margin) - ((tilesInThisRow - 1) * (tileSize[0] + margin)) / 2
      const y = -row * (tileSize[1] + margin) + ((rowsCount - 1) * (tileSize[1] + margin)) / 2
      tile.position = [x, y, 0]
    })

    const gridWidth = colsCount * tileSize[0] + (colsCount - 1) * margin + padding * 2
    const gridHeight = rowsCount * tileSize[1] + (rowsCount - 1) * margin + padding * 2
    const fovRad = (fov * Math.PI) / 180
    cameraZ.value = Math.max(gridWidth, gridHeight) / 2 / Math.tan(fovRad / 2)
  }

  updateGrid()
  window.addEventListener('resize', updateGrid)

  return { tiles, cameraZ, fov }
}
