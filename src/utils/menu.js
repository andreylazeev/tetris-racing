import { Graphics, Text, TextStyle } from 'pixi.js'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, COIN_FIGURE } from './constants'

export class Menu {
  constructor(app, x, y, text) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.text = text
    this.isStarted = false
    this.app = app
    this.root.beginFill(0xb2beb2)
    this.root.drawRect(this.root.x, this.root.y, BASE_WIDTH, BASE_HEIGHT)
    this.root.endFill()

    this.style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'bold',
      fill: '#000000'
    })

    this.menuText = new Text(this.text, this.style)
    this.menuText.x = BASE_WIDTH / 2 - this.menuText.width / 2
    this.menuText.y = BASE_HEIGHT / 2 - this.menuText.height / 2
    this.root.interactive = true
    this.menuText.interactive = true
    
    app.stage.addChild(this.root)
    this.root.addChild(this.menuText)
  }
  recreate() {
    this.app.stage.removeChild(this.root)
    this.app.stage.removeChild(this.menuText)
    this.app.stage.addChild(this.root)
    this.app.stage.addChild(this.menuText)
  }

  destroy() {
    this.app.stage.removeChild(this.menuText)
    this.app.stage.removeChild(this.root)
  }
}
