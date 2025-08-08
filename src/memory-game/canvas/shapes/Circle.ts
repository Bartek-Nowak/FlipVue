import { Shape } from './Shape'

export class Circle extends Shape {
  radius: number
  color: string

  constructor(x: number, y: number, radius: number, color: string) {
    super(x, y)
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
