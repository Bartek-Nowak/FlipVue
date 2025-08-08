import { Shape } from './Shape'
import type { CircleConfig } from './types'

export class Circle extends Shape {
  radius: number
  color: string

  constructor({ x, y, radius, color }: CircleConfig) {
    super({ x, y })
    this.radius = radius
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke()
  }
}
