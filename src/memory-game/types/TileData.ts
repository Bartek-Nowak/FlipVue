export interface TileData {
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
}
