import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, CAR_FIGURE } from './constants'

export class Car {
  constructor(app, x, y, speed) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.speed = speed
    this.isCollision = true
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
    this.root.x = 42
  }

  upscale() {
    this.isCollision = false
    setTimeout(() => {
      this.root.scale.set(1.2,1.2)
    }, 100);
    setTimeout(() => {
      this.root.scale.set(1.5,1.5)
    }, 250);
    this.root.x = this.root.x / 3.5
  }

  recreate() {
    this.app.stage.removeChild(this.root)
    this.app.stage.addChild(this.root)
  }

  update(dt) {
    const SPEED = this.speed * dt
    this.root.y += SPEED
  }

  incrementSpeed (speed) {
    this.speed = speed
  }

  destroy() {
    this.app.stage.removeChild(this.root)
  }

  setRight(value) {
    this.root.x = BASE_WIDTH - 240
  }
}
