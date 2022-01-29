import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, CAR_FIGURE } from './constants'
import { Ticker } from './ticker'

export class Progress {
  constructor(app, x, y, width) {
    this.root = new Graphics()
    this.width = width
    this.root.x = x
    this.root.y = y
    this.app = app
    this.ticker = new Ticker(5)
    this.isVisible = false
  }
  
  draw() {
    this.root.beginFill(0x000000)
    this.root.drawRect(20, this.root.y, this.width, 20)
    this.root.endFill()
    this.app.stage.addChild(this.root)
    this.isVisible = true
  }

  recreate() {
    this.app.stage.removeChild(this.root)
    this.app.stage.addChild(this.root)
  }

  update() {
    this.ticker.update(() => {
      this.width = this.width - 1
      this.root.clear()
      this.root.beginFill(0x000000)
      this.root.drawRect(20, this.root.y, this.width, 20)
      this.root.endFill()
    })
  }
  
  restart() {
    this.width = 100
    this.root.drawRect(20, this.root.y, this.width, 20)
  }

  destroy() {
    this.app.stage.removeChild(this.root)
    this.isVisible = false
  }
}
