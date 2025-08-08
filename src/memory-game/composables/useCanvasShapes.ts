import { ref } from 'vue'
import { clearCanvas } from '../canvas/utils'
import type { Shape } from '../canvas/shapes/Shape'

export const useCanvasShapes = () => {
  const shapes = ref<Shape[]>([])

  const addShape = (shape: Shape) => {
    shapes.value.push(shape)
  }

  const clearShapes = () => {
    shapes.value = []
  }

  const drawAll = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    clearCanvas(ctx, width, height)

    for (const shape of shapes.value) {
      shape.draw(ctx)
    }
  }

  return {
    shapes,
    addShape,
    clearShapes,
    drawAll,
  }
}
