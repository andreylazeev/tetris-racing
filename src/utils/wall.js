import { Graphics } from 'pixi.js'
import { WALL_FIGURE } from './constants'
import { Ticker } from './ticker'

export class Wall {
  constructor(app, x, y, speed) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.speed = speed
    this.isCollision = true
    this.isBig = false
    this.app = app
    this.scale = 0
    this.ticker = new Ticker(50)
    for (let i = 0; i < WALL_FIGURE.length; i++) {
      for (let j = 0; j <= WALL_FIGURE[i].length; j++) {
        if (WALL_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.drawRect(this.root.x + j * 39, i * (34 + 6), 34, 34)
          this.root.endFill()
          this.root.lineStyle(0)
          this.root.beginFill(0xb2beb2)
          this.root.drawRect(this.root.x + j * 39 + 4, i * 40 + 4, 26, 26)
          this.root.endFill()
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          for (let x = 0; x < 21; x += 7) {
            for (let y = 0; y < 21; y += 7) {
              this.root.drawRect(this.root.x + j * 39 + (7 + x), i * 40 + (6 + y), 7, 7)
            }
          }
          this.root.endFill()
        }
      }
    }
    app.stage.addChild(this.root)
  }

  recreate() {
    this.app.stage.removeChild(this.root)
    this.app.stage.addChild(this.root)
  }

  update() {
    this.ticker.update(() => {
      switch (this.scale) {
        case 0:
          this.root.y -= 40
          this.scale += 1
          break
        case 1:
          this.root.y += 40
          this.scale -= 1
          break
      }
    })
  }

  destroy() {
    this.root.clear()
    this.app.stage.removeChild(this.root)
  }
}
