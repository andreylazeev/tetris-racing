import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, CAR_FIGURE } from './constants'

export class Progress {
  constructor(app, x, y, width) {
    this.root = new Graphics()
    this.width = width
    this.root.x = x
    this.root.y = y
    this.app = app
    
  }

  draw() {
    this.root.beginFill(0x000000)
    this.root.drawRect(20, this.root.y, this.width, 20)
    this.root.endFill()
    this.app.stage.addChild(this.root)
  }

  recreate() {
    this.app.stage.removeChild(this.root)
    this.app.stage.addChild(this.root)
  }
  
  update(speed, dt) {
    const SPEED = speed * dt
    this.width = this.width - speed
    this.root.clear()
    this.root.beginFill(0x000000)
    this.root.drawRect(20, this.root.y, this.width, 20)
    this.root.endFill()
  }

  destroy() {
    this.app.stage.removeChild(this.root)
  }
}
