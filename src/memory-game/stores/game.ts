import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

function encodeToken(data: object) {
  const json = JSON.stringify(data)
  return btoa(json)
}

function decodeToken(token: string) {
  try {
    const json = atob(token)
    return JSON.parse(json)
  } catch {
    return null
  }
}

export const useGameStore = defineStore('game', () => {
  const seed = ref<number>(Math.floor(Math.random() * 1000000))
  const totalTiles = ref<number>(6)

  const generateNewSeed = (tiles?: number) => {
    seed.value = Math.floor(Math.random() * 1000000)
    if (tiles) totalTiles.value = tiles
  }

  const generateToken = () => {
    return encodeToken({
      seed: seed.value,
      totalTiles: totalTiles.value,
    })
  }

  const loadFromToken = (token: string) => {
    const data = decodeToken(token)
    if (data?.seed && data?.totalTiles) {
      seed.value = data.seed
      totalTiles.value = data.totalTiles
    }
  }

  const shareLink = computed(() => {
    const baseUrl = window.location.origin + window.location.pathname
    return `${baseUrl}?token=${generateToken()}`
  })

  const init = () => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      loadFromToken(token)
    } else {
      generateNewSeed(totalTiles.value)
      const newUrl = `${window.location.origin}${window.location.pathname}?token=${generateToken()}`
      window.history.replaceState(null, '', newUrl)
    }
  }

  onMounted(init)

  return {
    seed,
    totalTiles,
    generateNewSeed,
    generateToken,
    loadFromToken,
    shareLink,
  }
})
