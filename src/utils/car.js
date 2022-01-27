import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_WIDTH, CAR_FIGURE } from './constants'

export class Car {
  constructor(app, x, y, isEnemy) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.isEnemy = isEnemy
    this.app = app
    for (let i = 0; i < CAR_FIGURE.length; i++) {
      for (let j = 0; j <= CAR_FIGURE[i].length; j++) {
        if (CAR_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.drawRect(this.root.x + j * 39, i * 34, 34, 34)
          this.root.endFill()
          this.root.lineStyle(0)
          this.root.beginFill(0xb2beb2)
          this.root.drawRect(this.root.x + j * 39 + 4, i * 34 + 4, 26, 26)
          this.root.endFill()
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          for (let x = 0; x < 21; x += 7) {
            for (let y = 0; y < 21; y += 7) {
              this.root.drawRect(this.root.x + j * 39 + (7 + x), i * 34 + (6 + y), 7, 7)
            }
          }
          this.root.endFill()
        }
      }
    }
    app.stage.addChild(this.root)
  }

  setLeft(value) {
    this.root.x = 40
  }

  update(dt) {
    const SPEED = 5 * dt
    this.root.y += SPEED
  }

  destroy() {
    this.app.stage.removeChild(this.root)
  }

  setRight(value) {
    this.root.x = 160
  }
}
