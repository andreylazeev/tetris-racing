import { Graphics } from 'pixi.js'
import { CELL_SIZE, WALL_FIGURE } from './constants'
import { Ticker } from './ticker'

export class Wall {
  constructor(container, x, y, speed) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.speed = speed
    this.isCollision = true
    this.isBig = false
    this.scale = 0
    this.ticker = new Ticker(50)
    for (let i = 0; i < WALL_FIGURE.length; i++) {
      for (let j = 0; j <= WALL_FIGURE[i].length; j++) {
        if (WALL_FIGURE[i][j] === 1) {
          this.root.lineStyle(6, 0xb2beb2, 1)
          this.root.beginFill(0x000000)
          this.root.drawRect(j, i * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          this.root.endFill()
          this.root.lineStyle(0)
          this.root.beginFill(0xb2beb2)
          this.root.drawRect(j + 7, i * CELL_SIZE + 7, CELL_SIZE- 14, CELL_SIZE- 14)
          this.root.endFill()
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          for (let x = 0; x < 21; x += 7) {
            for (let y = 0; y < 21; y += 7) {
              this.root.drawRect(j * CELL_SIZE + (10 + x), i * CELL_SIZE + (9 + y), 7, 7)
            }
          }
          this.root.endFill()
        }
      }
    }
    container.addChild(this.root)
  }

  update() {
    this.ticker.update(() => {
      switch (this.scale) {
        case 0:
          this.root.y -= CELL_SIZE
          this.scale += 1
          break
        case 1:
          this.root.y += CELL_SIZE
          this.scale -= 1
          break
      }
    })
  }

  destroy() {
    this.root.clear()
  }
}
