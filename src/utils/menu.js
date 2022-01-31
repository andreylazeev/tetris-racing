import { Container, Graphics, Text, TextStyle } from 'pixi.js'
import { BASE_HEIGHT, BASE_WIDTH } from './constants'

export class Menu {
  constructor(app, text) {
    this.root = new Graphics()
    this.container = new Container()
    this.text = text
    this.app = app
    this.root.beginFill(0xb2beb2)
    this.root.drawRect(0, 0, BASE_WIDTH, BASE_HEIGHT)
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
    this.container.interactive = true
    this.root.interactive = true
    this.menuText.interactive = true

    this.root.addChild(this.menuText)
    this.container.addChild(this.root)
    app.stage.addChild(this.container)
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
