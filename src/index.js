import * as PIXI from 'pixi.js'
import { drawBackgroundRectangles } from './utils/background'
import { Car, drawCar, removeCar } from './utils/car'
import { Coin } from './utils/coin'
import { BASE_HEIGHT, BASE_WIDTH } from './utils/constants'
const app = new PIXI.Application({
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  backgroundColor: 0xb2beb2,
  resolution: window.devicePixelRatio || 1
})
drawBackgroundRectangles(app)

function checkForCollision(a, b, offsetY) {
  let aBox = a.getBounds()
  let bBox = b.getBounds()

  return (
    aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y - offsetY + aBox.height - offsetY > bBox.y &&
    aBox.y < bBox.y + bBox.height
  )
}

const ticker = new PIXI.Ticker()
const hero = new Car(app, 42, BASE_HEIGHT - 220, false)
let enemies = []
let coins = []

let score = 0

ticker.add((delta) => {
  if (!enemies.length) {
    const enemy = new Car(app, Math.random() > 0.5 ? 42 : BASE_WIDTH - 300, -120, true)
    enemies.push(enemy)
  }

  enemies = enemies.filter((enemy) => {
    enemy.update(delta)
    
    if (enemy.root.y > BASE_HEIGHT) {
      enemy.destroy()
      return false
    }
    return true
  })

  coins = coins.filter((coin) => {
    coin.update(delta)
    if (coin.root.y > BASE_HEIGHT) {
      coin.destroy()
      console.log(coins)
      return false
    }
    return true
  })

  if (enemies[enemies.length - 1].root.y - 220 >= 0) {
    const isLeft = Math.random() > 0.5
    const enemy = new Car(app, isLeft ? 42 : BASE_WIDTH - 300, -180, true)
    if (Math.random() > 0.5) {
      const coin = new Coin(app, enemy.root.x + 10, enemy.root.y - 160, false)
      coins.push(coin)
    }
    enemies.push(enemy)
    return true
  }

  enemies.some((enemy) => {
    if (checkForCollision(enemy.root, hero.root, 20)) {
      ticker.stop()
      window.removeEventListener('keydown', handleKeyPress)
        return true
    }
  })

  coins.some((coin) => {
    if (checkForCollision(coin.root, hero.root, 20)) {
      coin.destroy()
      coins = coins.filter(el => el !== coin)
      score++
      console.log(score);
      return false
    }
  })
})

ticker.start()

const handleKeyPress = (e) => {
  if (e.key === 'ArrowRight') {
    hero.setRight()
  }
  if (e.key === 'ArrowLeft') {
    hero.setLeft()
  }
}

window.addEventListener('keydown', handleKeyPress)

document.body.appendChild(app.view)
