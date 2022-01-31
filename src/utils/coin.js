import { Graphics } from 'pixi.js'
import { BASE_WIDTH, calcCells, COIN_FIGURE } from './constants'
import { Ticker } from './ticker'

export class Coin {
  constructor(container, isLeft) {
    this.root = new Graphics()
    this.ticker = new Ticker(50)
    this.scale = 0
    for (let i = 0; i < COIN_FIGURE.length; i++) {
      for (let j = 0; j <= COIN_FIGURE[i].length; j++) {
        if (COIN_FIGURE[i][j] === 1) {
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

    this.ticker.update(() => {
      switch (this.scale) {
        case 0:
          this.root.scale.set(0.75)
          this.scale += 1
          break
          case 1:
          this.root.scale.set(1)
          this.scale -= 1
          break
      }
    })
  }
  set speed(value) {
    this._speed = value 
  }
  destroy() {
    this.root.clear()
  }
  setLeft() {
    this.root.x = calcCells(3.5)
    return this
  }
  setRight() {
    this.root.x = BASE_WIDTH - calcCells(3.5)
    return this
  }
}
