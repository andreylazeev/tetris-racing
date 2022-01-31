import { Container, Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_WIDTH, calcCells, CELL_SIZE, WALL_FIGURE } from './constants'
import { Ticker } from './ticker'

export class Wall {
  constructor(container, speed) {
    this.root = new Graphics()
    this.speed = 1
    this.isCollision = true
    this.isBig = false
    for (let i = 0; i < 20; i++) {
      const y = (4 * (calcCells(i))) - BASE_HEIGHT
      this.draw(0, y)
      this.draw(BASE_WIDTH - CELL_SIZE,y)
    }
    container.addChild(this.root)
    this.y = 0
  }

  draw (x,y) {
    for (let i = 0; i < WALL_FIGURE.length; i++) {
      for (let j = 0; j <= WALL_FIGURE[i].length; j++) {
        if (WALL_FIGURE[i][j] === 1) {
          this.root.lineStyle(6, 0xb2beb2, 1)
          this.root.beginFill(0x000000)
          this.root.drawRect(j + x, y + (i * CELL_SIZE), CELL_SIZE, CELL_SIZE)
          this.root.endFill()
          this.root.lineStyle(0)
          this.root.beginFill(0xb2beb2)
          this.root.drawRect(j + 7 + x, y + (i * CELL_SIZE + 7), CELL_SIZE- 14, CELL_SIZE- 14)
          this.root.endFill()
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          for (let offsetX = 0; offsetX < 21; offsetX += 7) {
            for (let offsetY = 0; offsetY < 21; offsetY += 7) {
              this.root.drawRect(j * CELL_SIZE + (10 + offsetX) + x, y +(i * CELL_SIZE + (9 + offsetY)), 7, 7)
            }
          }
          this.root.endFill()
        }
      }
    }
  }

  updatePosition () {
    this.root.y = Math.floor(this.y / CELL_SIZE) * CELL_SIZE
  }

  update() {
    if (this.y >= BASE_HEIGHT) {
      this.y = 0
      this.updatePosition()
      return
    }
    this.y += this.speed
    this.updatePosition()
  }

  destroy() {
    this.root.clear()
  }
}
