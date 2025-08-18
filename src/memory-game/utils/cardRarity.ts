import {
  getLegendaryGradient,
  getCommonGradient,
  getUncommonGradient,
  getRareGradient,
  getAncientGradient,
  getExceediglyRareGradient,
  getImmortalGradient,
  getMythicalGradient,
} from '../utils/gradient'

export const rarityColor = (
  rarity:
    | 'common'
    | 'uncommon'
    | 'rare'
    | 'mythical'
    | 'legendary'
    | 'ancient'
    | 'exceedigly_rare'
    | 'immortal',
) => {
  switch (rarity) {
    case 'immortal':
      return getImmortalGradient()
    case 'exceedigly_rare':
      return getExceediglyRareGradient()
    case 'ancient':
      return getAncientGradient()
    case 'legendary':
      return getLegendaryGradient()
    case 'mythical':
      return getMythicalGradient()
    case 'rare':
      return getRareGradient()
    case 'uncommon':
      return getUncommonGradient()
    case 'common':
      return getCommonGradient()
  }
}
