export interface TileData {
  id: string
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
}
