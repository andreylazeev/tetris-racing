import { Graphics } from 'pixi.js'
import { BASE_WIDTH, CAR_FIGURE } from './constants'
import { Ticker } from './ticker'

export class Car {
  constructor(app, x, y, speed, isMe) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.speed = speed
    this.isCollision = true
    this.isBig = false
    this.app = app
    this.scaleTicker = new Ticker(50)
    this.alphaTicker = new Ticker(450)
    this.isMe = isMe
    for (let i = 0; i < CAR_FIGURE.length; i++) {
      for (let j = 0; j <= CAR_FIGURE[i].length; j++) {
        if (CAR_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.drawRect(this.root.x + j * 39, i * (34 + 8), 34, 34)
          this.root.endFill()
          this.root.lineStyle(0)
          this.root.beginFill(0xb2beb2)
          this.root.drawRect(this.root.x + j * 39 + 4, i * 42 + 4, 26, 26)
          this.root.endFill()
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          for (let x = 0; x < 21; x += 7) {
            for (let y = 0; y < 21; y += 7) {
              this.root.drawRect(this.root.x + j * 39 + (7 + x), i * 42 + (6 + y), 7, 7)
            }
          }
          this.root.endFill()
        }
      }
    }
    app.stage.addChild(this.root)
  }

  upscale = () => {
    this.root.alpha = 1
    this.isCollision = false
    this.isBig = true
    this.root.x = this.root.x === 42 ? 0 : this.isBig ? BASE_WIDTH - 250 : BASE_WIDTH - 240
  }

  update(dt) {
    const speed = this.speed * dt
    if (!this.isMe) {
      this.root.y += speed
    }

    if (this.isMe) {
      this.scaleTicker.update(() => {
        if (this.isBig) {
          switch (this.root.scale._x) {
            case 1:
              this.root.scale.set(1.1, 1.1)
              break
            case 1.1:
              this.root.scale.set(1.2, 1.2)
              break
          }
        } else if (!this.isBig) {
          switch (this.root.scale._x) {
            case 1.2:
              this.root.scale.set(1.1, 1.1)
              break
            case 1.1:
              this.root.scale.set(1, 1)
              break
          }
        }
      })
      this.alphaTicker.update(() => {
        if (this.root.alpha === 0.1) {
          this.root.alpha = 1
          this.isCollision = true
        }
      })
    }
  }

  reset() {
    this.isBig = false
    this.root.alpha = 0.1
  }

  recreate() {
    this.app.stage.removeChild(this.root)
    this.app.stage.addChild(this.root)
  }

  incrementSpeed(speed) {
    this.speed = speed
  }

  destroy() {
    this.root.clear()
    this.app.stage.removeChild(this.root)
  }

  setLeft(value) {
    this.isBig ? (this.root.x = 0) : (this.root.x = 42)
  }

  setRight(value) {
    this.isBig ? (this.root.x = BASE_WIDTH - 250) : (this.root.x = BASE_WIDTH - 240)
  }
}
