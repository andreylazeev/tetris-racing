import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, COIN_FIGURE } from './constants'

export class Coin {
  constructor(app, x, y, speed) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.speed = speed
    this.app = app
    for (let i = 0; i < COIN_FIGURE.length; i++) {
      for (let j = 0; j <= COIN_FIGURE[i].length; j++) {
        if (COIN_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          this.root.drawRect(this.root.x + j * 8, i * 8, 8, 8)
          this.root.endFill()
          // for (let x = 0; x < 12; x += 4) {
          //   for (let y = 0; y < 12; y += 4) {
          //     this.root.drawRect(this.root.x + j * 16 + (4 + x), i * 18 + (6 + y), 4, 4)
          //   }
          // }
          // this.root.endFill()
        }
      }
    }
    app.stage.addChild(this.root)
  }

  setLeft(value) {
    this.root.x = 40
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
    this.root.x = 160
  }
}
