import { ref, onMounted, onUnmounted } from 'vue'

export const useTileGrid = (
  totalTiles: number,
  tileSize: [number, number, number],
  margin = 0.2,
  padding = 0.5,
) => {
  const cols = ref(4)
  const spacingX = tileSize[0] + margin
  const spacingY = tileSize[1] + margin
  const tiles = ref(
    Array.from({ length: totalTiles }, (_, i) => ({
      id: i,
      position: [0, 0, 0] as [number, number, number],
      isFlipped: false,
    })),
  )
  const cameraZ = ref(10)
  const fov = 50

  const updateCols = () => {
    const width = window.innerWidth
    if (width < 640) cols.value = 2
    else if (width < 1024) cols.value = 4
    else cols.value = 2
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
    updateCols()
    calculateCameraZ()
    updatePositions()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    tiles,
    cameraZ,
    fov,
  }
}
