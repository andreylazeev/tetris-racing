import { Graphics } from 'pixi.js'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, COIN_FIGURE } from './constants'

export class Coin {
  constructor(app, x, y, speed) {
    this.root = new Graphics()
    this.root.x = x
    this.root.y = y
    this.speed = speed
    this.app = app
    for (let i = 0; i < COIN_FIGURE.length; i++) {
      for (let j = 0; j <= COIN_FIGURE[i].length; j++) {
        if (COIN_FIGURE[i][j] === 1) {
          this.root.beginFill(0x000000)
          this.root.lineStyle(1, 0xb2beb2, 1)
          this.root.drawRect(this.root.x + j * 6, i * 7, 6, 7)
          this.root.endFill()
        }
      }
    }
    app.stage.addChild(this.root)

    let scale = 1,
      motion = 1;

    app.ticker.add((delta) => {
      if (motion == 1) {
        if (scale < 3) {
          scale += 0.1;
          setTimeout(() => {
            this.root.clear()
            for (let i = 0; i < COIN_FIGURE.length; i++) {
              for (let j = 0; j <= COIN_FIGURE[i].length; j++) {
                if (COIN_FIGURE[i][j] === 1) {
                  this.root.beginFill(0x000000)
                  this.root.lineStyle(1, 0xb2beb2, 1)
                  this.root.drawRect(this.root.x + j * 6, i * 7, 6, 7)
                  this.root.endFill()
                }
              }
            }
          }, 500);
        } else {
          motion = 0;
        }
      } else {
        if (scale > 1) {
          scale -= 0.1;
          setTimeout(() => {
            this.root.clear()
            for (let i = 0; i < COIN_FIGURE.length; i++) {
              for (let j = 0; j <= COIN_FIGURE[i].length; j++) {
                if (COIN_FIGURE[i][j] === 1) {
                  this.root.beginFill(0x000000)
                  this.root.lineStyle(1, 0xb2beb2, 1)
                  this.root.drawRect(this.root.x + 5 + (j * 5), (i * 6) + 6 + 1, 5, 6)
                  this.root.endFill()
                }
              }
            }
          }, 500);
        } else {
          motion = 1;
        }
      }
      // this.root.scale.set(scale, scale);
    })

    app.ticker.start()
  }

  setLeft(value) {
    this.root.x = 40
  }

  update(dt) {
    const SPEED = this.speed * dt
    this.root.y += SPEED
  }
  incrementSpeed(speed) {
    this.speed = speed
  }

  destroy() {
    this.app.stage.removeChild(this.root)
  }

  setRight(value) {
    this.root.x = 160
  }
}
