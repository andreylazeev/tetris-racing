import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, MUSHROOM_FIGURE } from './constants'

export class Mushroom {
  constructor(app, x, y, speed) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.speed = speed
    this.app = app
    for (let i = 0; i < MUSHROOM_FIGURE.length; i++) {
      for (let j = 0; j <= MUSHROOM_FIGURE[i].length; j++) {
        if (MUSHROOM_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          this.root.drawRect(this.root.x + j * 6, i * 7, 6, 7)
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
