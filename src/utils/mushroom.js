import { Graphics } from 'pixi.js'
import { BASE_WIDTH, calcCells, MUSHROOM_FIGURE } from './constants'

export class Mushroom {
  constructor(container, isLeft) {
    this.root = new Graphics()
    for (let i = 0; i < MUSHROOM_FIGURE.length; i++) {
      for (let j = 0; j <= MUSHROOM_FIGURE[i].length; j++) {
        if (MUSHROOM_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          this.root.drawRect(j * 6, i * 7, 6, 7)
          this.root.endFill()
        }
      }
    }
    this.root.pivot.set(this.root.width / 2, this.root.height / 2)
    isLeft ? this.setLeft() : this.setRight()
    container.addChild(this.root)
  }

  update(dt) {
    this.root.y += this._speed * dt
  }
  set speed(value) {
    this._speed = value
  }
  destroy() {
    this.root.clear()
  }
  setLeft() {
    this.root.x = calcCells(3.5)
  }
  setRight() {
    this.root.x = BASE_WIDTH - calcCells(3.5)
  }
}
