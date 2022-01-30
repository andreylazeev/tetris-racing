import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_WIDTH, calcCells, CAR_FIGURE, CELL_SIZE, SEPARATOR } from './constants'
import { Ticker } from './ticker'

export class Car {
  constructor(container, isLeft, isMe) {
    this.root = new Graphics()
    this.isCollision = true
    this.isBig = false
    this.isLeft = false
    this.scaleTicker = new Ticker(10)
    this.alphaTicker = new Ticker(450)
    this.isMe = isMe
    for (let i = 0; i < CAR_FIGURE.length; i++) {
      for (let j = 0; j <= CAR_FIGURE[i].length; j++) {
        if (CAR_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.drawRect(calcCells(j), calcCells(i), CELL_SIZE - SEPARATOR, CELL_SIZE - SEPARATOR)
          this.root.endFill()
          this.root.lineStyle(0)
          this.root.beginFill(0xb2beb2)
          this.root.drawRect(j * CELL_SIZE + 4, i * CELL_SIZE + 4, CELL_SIZE - 14, CELL_SIZE - 14)
          this.root.endFill()
          this.root.beginFill(0x000000)
          this.root.endFill()
          this.root.beginFill(0x000000)
          for (let x = 0; x < 21; x += 7) {
            for (let y = 0; y < 21; y += 7) {
              this.root.drawRect(j * CELL_SIZE + (7 + x), i * CELL_SIZE + (7 + y), 6, 6)
            }
          }
          this.root.endFill()
        }
      }
    }
    this.root.pivot.set(this.root.width / 2, this.root.height / 2)
    isLeft ? this.setLeft() : this.setRight()
    this.root.y = isMe ? BASE_HEIGHT - calcCells(4) : calcCells(-6)
    container.addChild(this.root)
  }

  upscale = () => {
    this.root.alpha = 1
    this.isCollision = false
    this.isBig = true
    this.isLeft ? this.setLeft() : this.setRight()
  }

  update(dt) {
    if (this.isMe) {
      this.scaleTicker.update(() => {
        if (this.isBig) {
          switch (this.root.scale._x) {
            case 1:
              this.root.scale.set(1.1)
              break
            case 1.1:
              this.root.scale.set(1.2)
              break
          }
        } else if (!this.isBig) {
          switch (this.root.scale._x) {
            case 1.2:
              this.root.scale.set(1.1)
              break
            case 1.1:
              this.root.scale.set(1)
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
      return
    }

    this.root.y += this._speed * dt
  }

  reset() {
    this.isBig = false
    this.root.alpha = 0.1
  }

  set speed(value) {
    this._speed = value
  }

  destroy() {
    this.root.clear()
  }

  setLeft() {
    this.root.x = calcCells(this.isBig ? 3 : 3.5)
    this.isLeft = true
    return this
  }

  setRight() {
    this.root.x = BASE_WIDTH - calcCells(this.isBig ? 3 : 3.5)
    this.isLeft = false
    return this
  }
}
