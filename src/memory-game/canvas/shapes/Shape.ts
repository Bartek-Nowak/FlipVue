import type { ShapeConfig } from './types'

export abstract class Shape {
  x: number
  y: number

  constructor({ x, y }: ShapeConfig) {
    this.x = x
    this.y = y
  }

  abstract draw(ctx: CanvasRenderingContext2D): void
}
