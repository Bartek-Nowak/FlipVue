import { Shape } from './Shape'

export class Rectangle extends Shape {
  width: number
  height: number
  color: string

  constructor(x: number, y: number, width: number, height: number, color: string) {
    super(x, y)
    this.width = width
    this.height = height
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.strokeRect(this.x, this.y, this.width, this.height)
  }
}
