export interface ShapeConfig {
  x: number
  y: number
}

export interface CircleConfig extends ShapeConfig {
  radius: number
  color: string
}

export interface RectangleConfig extends ShapeConfig {
  width: number
  height: number
  color: string
}
