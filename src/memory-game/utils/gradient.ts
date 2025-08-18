interface GradientOptions {
  initialColor: string
  transitionalColor: string
  finalColor: string
}

const getGradient = ({ initialColor, transitionalColor, finalColor }: GradientOptions) => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, initialColor)
  gradient.addColorStop(0.5, transitionalColor)
  gradient.addColorStop(1, finalColor)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  return canvas
}

export const getImmortalGradient = () => {
  return getGradient({
    initialColor: '#ff9500',
    transitionalColor: '#915500',
    finalColor: '#633a00',
  })
}

export const getExceediglyRareGradient = () => {
  return getGradient({
    initialColor: '#ffff00',
    transitionalColor: '#969600',
    finalColor: '#474700',
  })
}

export const getAncientGradient = () => {
  return getGradient({
    initialColor: '#ff0000',
    transitionalColor: '#8c0000',
    finalColor: '#2e0000',
  })
}

export const getLegendaryGradient = () => {
  return getGradient({
    initialColor: '#ff00ee',
    transitionalColor: '#a8009d',
    finalColor: '#5c0056',
  })
}

export const getMythicalGradient = () => {
  return getGradient({
    initialColor: '#f3a6ff',
    transitionalColor: '#9b41ab',
    finalColor: '#56245e',
  })
}

export const getRareGradient = () => {
  return getGradient({
    initialColor: '#0d00ff',
    transitionalColor: '#080096',
    finalColor: '#030040',
  })
}

export const getUncommonGradient = () => {
  return getGradient({
    initialColor: '#87c3ff',
    transitionalColor: '#4f89c4',
    finalColor: '#1a3e61',
  })
}
export const getCommonGradient = () => {
  return getGradient({
    initialColor: '#ffffff',
    transitionalColor: '#dfe0de',
    finalColor: '#bebfbd',
  })
}
