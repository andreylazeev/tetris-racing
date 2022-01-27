import {Graphics} from 'pixi.js'

export const drawBackgroundRectangles = (app) => {
  const graphics = new Graphics()
  for (let i = 0; i <= 400; i += 40) {
    for (let j = 0; j <= 720; j += 40) {
      graphics.lineStyle(6, 0xb2beb2, 1)
      graphics.beginFill(0xa9b6a9)
      graphics.drawRect(i, j, 40, 40)
      graphics.endFill()
      graphics.lineStyle(0)
      graphics.beginFill(0xb2beb2)
      graphics.drawRect(i + 7, j + 7, 26, 26)
      graphics.endFill()
      graphics.beginFill(0xa9b6a9)
      graphics.lineStyle(1, 0xb2beb2, 1)
      for (let x = 0; x < 21; x += 7) {
        for (let y = 0; y < 21; y += 7) {
          graphics.drawRect(i + (10 + x), j + (9 + y), 7, 7)
        }
      }
      graphics.endFill()
    }
  }

  app.stage.addChild(graphics)
}