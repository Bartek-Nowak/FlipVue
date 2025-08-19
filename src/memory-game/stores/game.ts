import { defineStore } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'

const encodeToken = (data: object) => btoa(JSON.stringify(data))
const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}

export const useGameStore = defineStore('game', () => {
  const seed = ref<number>(Math.floor(Math.random() * 1000000))
  const totalTiles = ref<number>(6)
  const moves = ref(0)
  const time = ref(0)
  const canContinue = ref(false)
  const matchedTiles = ref<Set<string>>(new Set())

  const LOCAL_KEY = 'memoryGame'

  const generateNewSeed = (tiles?: number) => {
    seed.value = Math.floor(Math.random() * 1000000)
    if (tiles) totalTiles.value = tiles
  }

  const generateToken = () => encodeToken({ seed: seed.value, totalTiles: totalTiles.value })

  const saveToLocal = () => {
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        seed: seed.value,
        totalTiles: totalTiles.value,
        moves: moves.value,
        time: time.value,
        matchedTiles: Array.from(matchedTiles.value),
      }),
    )
    canContinue.value = true
  }

  const loadFromLocal = () => {
    const data = localStorage.getItem(LOCAL_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      if (parsed.matchedTiles) matchedTiles.value = new Set(parsed.matchedTiles)
      return parsed
    }
    return null
  }

  const deleteLocal = () => {
    localStorage.removeItem(LOCAL_KEY)
    canContinue.value = false
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

    const localData = loadFromLocal()
    canContinue.value = !!localData

    if (token) {
      loadFromToken(token)

      if (localData) {
        moves.value = localData.moves
        time.value = localData.time

        if (localData.matchedTiles) matchedTiles.value = new Set(localData.matchedTiles)
      }
    } else if (localData) {
      seed.value = localData.seed
      totalTiles.value = localData.totalTiles
      moves.value = localData.moves
      time.value = localData.time

      if (localData.matchedTiles) matchedTiles.value = new Set(localData.matchedTiles)
    } else {
      generateNewSeed()
      moves.value = 0
      time.value = 0
    }

    const newUrl = `${window.location.origin}${window.location.pathname}?token=${generateToken()}`
    window.history.replaceState(null, '', newUrl)
  }

  const continueGame = () => {
    const localData = loadFromLocal()
    if (!localData) return
    seed.value = localData.seed
    totalTiles.value = localData.totalTiles
    moves.value = localData.moves
    time.value = localData.time

    const newUrl = `${window.location.origin}${window.location.pathname}?token=${generateToken()}`
    window.history.replaceState(null, '', newUrl)
  }

  const newGame = (tiles?: number) => {
    moves.value = 0
    time.value = 0
    matchedTiles.value = new Set()

    const newUrl = `${window.location.origin}${window.location.pathname}?token=${generateToken()}`
    window.history.replaceState(null, '', newUrl)

    saveToLocal()
  }

  onMounted(init)

  watch([time, moves], saveToLocal)

  return {
    seed,
    totalTiles,
    moves,
    time,
    canContinue,
    matchedTiles,
    newGame,
    continueGame,
    deleteLocal,
    generateNewSeed,
    generateToken,
    loadFromToken,
    saveToLocal,
    loadFromLocal,
    shareLink,
  }
})
