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

export const getCommonGradient = () =>
  getGradient({ initialColor: '#ffffff', transitionalColor: '#cccccc', finalColor: '#666666' })
export const getUncommonGradient = () =>
  getGradient({ initialColor: '#a0e0ff', transitionalColor: '#3399ff', finalColor: '#002244' })
export const getRareGradient = () =>
  getGradient({ initialColor: '#7f00ff', transitionalColor: '#3300cc', finalColor: '#0a0033' })
export const getMythicalGradient = () =>
  getGradient({ initialColor: '#ffb3ff', transitionalColor: '#cc33cc', finalColor: '#330033' })
export const getLegendaryGradient = () =>
  getGradient({ initialColor: '#ff00ee', transitionalColor: '#a8009d', finalColor: '#2c0030' })
export const getAncientGradient = () =>
  getGradient({ initialColor: '#ff0000', transitionalColor: '#8c0000', finalColor: '#200000' })
export const getExceediglyRareGradient = () =>
  getGradient({ initialColor: '#ffff00', transitionalColor: '#969600', finalColor: '#222200' })
export const getImmortalGradient = () =>
  getGradient({ initialColor: '#ffb347', transitionalColor: '#915500', finalColor: '#2f1700' })
