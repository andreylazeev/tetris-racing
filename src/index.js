import * as PIXI from 'pixi.js'
import { drawBackgroundRectangles } from './utils/background'
import { Car, drawCar, removeCar } from './utils/car'
import { Coin } from './utils/coin'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH } from './utils/constants'
import { Mushroom } from './utils/mushroom'
const app = new PIXI.Application({
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  backgroundColor: 0xb2beb2,
  resolution: window.devicePixelRatio || 1
})

let coinsCount = 0
let level = 0
let prevCount = 0
let scoreCount = 0
drawBackgroundRectangles(app)

const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 24,
  fontWeight: 'bold',
  fill: '#000000', 
});

const coinsText = new PIXI.Text(`монеток: 0` , style);
coinsText.x = 50;
coinsText.y = 50;

const scoreText = new PIXI.Text(`Очков: 0` , style);
scoreText.x = 50;
scoreText.y = 90;
const levelText = new PIXI.Text(`уровень: 0` , style);
levelText.x = 50;
levelText.y = 130;

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
const hero = new Car(app, 42, BASE_HEIGHT - 220, 0)

let enemies = []
let coins = []
let mushrooms = []

let speed = BASE_SPEED


ticker.add((delta) => {
  if (!enemies.length) {
    const enemy = new Car(app, Math.random() > 0.5 ? 42 : BASE_WIDTH - 300, -120, speed)
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
      return false
    }
    return true
  })

  mushrooms = mushrooms.filter((mushroom) => {
    mushroom.update(delta)
    if (mushroom.root.y > BASE_HEIGHT) {
      mushroom.destroy()
      return false
    }
    return true
  })

  if (enemies[enemies.length - 1].root.y - 220 >= 0) {
    const isLeft = Math.random() > 0.5
    const enemy = new Car(app, isLeft ? 42 : BASE_WIDTH - 300, -180, speed)
    if (Math.random() < 0.4) {
      const coin = new Coin(app, enemy.root.x + 10, enemy.root.y - 160, speed)
      coins.push(coin)
    } else if (Math.random() < 0.9) {
      const mushroom = new Mushroom(app, enemy.root.x + 5, enemy.root.y - 160, speed)
      mushrooms.push(mushroom)
    }
    enemies.push(enemy)
    return true
  }

  enemies.some((enemy) => {
    if (checkForCollision(enemy.root, hero.root, 20) && hero.isCollision) {
      ticker.stop()
      window.removeEventListener('keydown', handleKeyPress)
        return true
    }
  })

  mushrooms.some((mushroom) => {
    if (checkForCollision(mushroom.root, hero.root, 20) && hero.isCollision) {
      mushroom.destroy()
      speed += 50
      
      mushrooms = mushrooms.filter(el => el !== mushroom)
      hero.upscale()
      enemies.forEach(enemy => enemy.incrementSpeed(speed))
      coins.forEach(coin => coin.incrementSpeed(speed))
      mushrooms.forEach(mushroom => mushroom.incrementSpeed(speed))
      window.removeEventListener('keydown', handleKeyPress)
      setInterval(() => {
        scoreCount +=50
      }, delta)
      setTimeout(() => {
        window.removeEventListener('keydown', handleKeyPress)
      }, 2000)
      return false
    }
  })

  coins.some((coin) => {
    if (checkForCollision(coin.root, hero.root, 20) && hero.isCollision) {
      coin.destroy()
      coins = coins.filter(el => el !== coin)
      coinsCount++
      coinsText.text = `монеток: ${coinsCount}`
      return false
    }
  })
  scoreCount++
  scoreText.text = `очков: ${scoreCount}`

   if (scoreCount === prevCount + 1000) {
      prevCount = scoreCount
      level+=1
      speed+=4
      enemies.forEach(enemy => enemy.incrementSpeed(speed))
      coins.forEach(coin => coin.incrementSpeed(speed))
      levelText.text = `уровень: ${level}`
  }

  app.stage.addChild  (coinsText);
  app.stage.addChild(scoreText);
  app.stage.addChild(levelText);
  hero.recreate()
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
