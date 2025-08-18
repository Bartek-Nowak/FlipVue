import { ref, onMounted, onUnmounted } from 'vue'
import tilePool from '../data/tilePool.json'

export const useTileGrid = (
  totalTiles: number,
  tileSize: [number, number, number],
  seed: number,
  margin = 0.2,
  padding = 0.5,
) => {
  const cols = ref(4)
  const spacingX = tileSize[0] + margin
  const spacingY = tileSize[1] + margin
  const tiles = ref<
    {
      id: number
      position: [number, number, number]
      isFlipped: boolean
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
    }[]
  >([])
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

    while (uniqueTiles.length < totalPairs && weightedPool.length > 0) {
      const index = Math.floor(rng() * weightedPool.length)
      const chosen = weightedPool.splice(index, 1)[0]
      if (!uniqueTiles.find((t) => t.imageUrl === chosen.imageUrl)) {
        uniqueTiles.push(chosen)
      }
    }

    const fullDeck = [...uniqueTiles, ...uniqueTiles]

    for (let i = fullDeck.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]]
    }

    return fullDeck
  }

  const updateCols = () => {
    const width = window.innerWidth
    if (width < 640) cols.value = 2
    else if (width < 1024) cols.value = 4
    else cols.value = 6
  }

  const updatePositions = () => {
    tiles.value.forEach((tile, i) => {
      const x = (i % cols.value) * spacingX - ((cols.value - 1) * spacingX) / 2
      const y =
        -Math.floor(i / cols.value) * spacingY +
        ((Math.ceil(totalTiles / cols.value) - 1) * spacingY) / 2
      tile.position = [x, y, 0]
    })
  }

  const calculateCameraZ = () => {
    const gridWidth = cols.value * tileSize[0] + (cols.value - 1) * margin + padding * 2
    const fovRad = (fov * Math.PI) / 180
    cameraZ.value = gridWidth / 2 / Math.tan(fovRad / 2)
  }

  const handleResize = () => {
    updateCols()
    calculateCameraZ()
    updatePositions()
  }

  onMounted(() => {
    const deck = weightedShuffle()
    tiles.value = deck.map((t, i) => ({
      id: i,
      position: [0, 0, 0] as [number, number, number],
      isFlipped: false,
      imageUrl: t.imageUrl,
      rarity: t.rarity as any,
    }))

    updateCols()
    calculateCameraZ()
    updatePositions()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { tiles, cameraZ, fov }
}
