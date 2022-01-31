import * as PIXI from 'pixi.js'
import { drawBackgroundRectangles } from './utils/background'
import { Car } from './utils/car'
import { Coin } from './utils/coin'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH, calcCells, SEPARATOR } from './utils/constants'
import { Menu } from './utils/menu'
import { Mushroom } from './utils/mushroom'
import { Progress } from './utils/progressbar'
import { Wall } from './utils/wall'
import { randomBool } from './utils/random'
import { Container } from 'pixi.js'
const app = new PIXI.Application({
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  backgroundColor: 0xb2beb2
})
drawBackgroundRectangles(app)

let coinsCount = 0
let level = 0
let prevCount = 0
let scoreCount = 0
let isGameOver = false

const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 18,
  fontWeight: 'bold',
  fill: '#000000'
})

let progress = new Progress(app, 25, 60, 100)

const coinsText = new PIXI.Text(`coins: 0`, style)
coinsText.x = 50
coinsText.y = 50

const scoreText = new PIXI.Text(`score: 0`, style)
scoreText.x = 50
scoreText.y = 70
const levelText = new PIXI.Text(`lap: 0`, style)
levelText.x = 50
levelText.y = 90

function checkForCollision(a, b) {
  let aBox = a.getBounds()
  let bBox = b.getBounds()

  return (
    aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y + aBox.height > bBox.y &&
    aBox.y < bBox.y + bBox.height
  )
}

let hero

let speed = BASE_SPEED
let enemies = []
let coins = []
let mushrooms = []
let walls = []
let time = 0
let upscaleTime = 0

const ticker = new PIXI.Ticker()

const liveLayer = new Container()
app.stage.addChild(liveLayer)

function createHero() {
  hero = new Car(liveLayer, true, true)
}
let menu = new Menu(app, 'click to start')
let wall

menu.container.on('mousedown', () => {
  isGameOver = false
  liveLayer.visible = true
  menu.container.visible = false
  wall = new Wall(liveLayer, speed)
  createHero()
})

function createEnemy() {
  const isLeft = randomBool()
  const enemy = new Car(liveLayer, isLeft)
  enemy.speed = speed
  enemies.push(enemy)
  return enemy
}
function createCoin(isLeft) {
  const coin = new Coin(liveLayer, isLeft)
  coin.speed = speed
  coins.push(coin)
  return coin
}
function createMushroom(isLeft) {
  const mushroom = new Mushroom(liveLayer, isLeft)
  mushroom.speed = speed
  mushrooms.push(mushroom)
  return mushroom
}

function stopGame () {
  progress.destroy()
  hero.destroy()
  menu.container.visible = true
  liveLayer.visible = false
  liveLayer.removeChildren()
  coinsCount = 0
  scoreCount = 0
  level = 0
  speed = BASE_SPEED
  enemies = []
  coins = []
  mushrooms = []
  walls = []
  coinsText.text = `coins: 0`
  scoreText.text = `score: 0`
  levelText.text = `lap: 0`
}

ticker.add((delta) => {
  if (!menu.container.visible) {
    wall.update()
    time = time + (1 / 60) * delta

    hero.update(delta)
    if (!enemies.length) {
      createEnemy()
    }

    enemies = enemies.filter((enemy) => {
      enemy.update(delta)
      enemy.speed = speed
      if (enemy.root.y > BASE_HEIGHT + enemy.root.height / 2) {
        enemy.destroy()
        scoreCount += 100
        return false
      }

      if (checkForCollision(enemy.root, hero.root, 0)) {
        if (hero.isCollision) {
          isGameOver = true
        } else {
          enemy.destroy()
          scoreCount += 100
          return false
        }
        return true
      }
      return true
    })

    coins = coins.filter((coin) => {
      coin.update(delta)
      coin.speed = speed
      if (coin.root.y > BASE_HEIGHT) {
        coin.destroy()
        return false
      }
      if (checkForCollision(coin.root, hero.root, 0)) {
        coin.destroy()
        coinsCount++
        scoreCount += 20
        coinsText.text = `coins: ${coinsCount}`
        return false
      }
      return true
    })

    mushrooms = mushrooms.filter((mushroom) => {
      mushroom.update(delta)
      mushroom.speed = speed
      if (checkForCollision(mushroom.root, hero.root, 0)) {
        if (hero.isCollision) {
          mushroom.destroy()
          hero.upscale()
          return true
        } else {
          progress.restart()
          mushroom.destroy()
          if (hero.isBig) {
            upscaleTime = 0
          }
          checkUpscale(delta)
          return false
        }
      }
      if (mushroom.root.y > BASE_HEIGHT + (mushroom.root.height / 2)) {
        mushroom.destroy()
        return false
      }
      return true
    })

    if (enemies[enemies.length - 1].root.y - 220 >= 0) {
      const enemy = createEnemy()
      const random = Math.random()
      if (random < 0.5) {
        createCoin(enemy.isLeft)
      } else if (random < 0.6) {
        createMushroom(enemy.isLeft)
      }
      return true
    }
    scoreText.text = `score: ${scoreCount}`

    if (scoreCount >= prevCount + 2500) {
      prevCount = scoreCount
      level += 1
      speed += 2
      levelText.text = `lap: ${level}`
    }

    if (hero.isBig) {
      checkUpscale(delta)
    }
    if (!menu.container.visible) {
      liveLayer.addChild(coinsText)
      liveLayer.addChild(scoreText)
      liveLayer.addChild(levelText)
    }
    if (progress.isVisible) {
      progress.update()
    }
    if (progress) {
      progress.recreate()
    }
    if (isGameOver) {
      stopGame()
    }
  }
})

ticker.start()

const checkUpscale = (delta) => {
  upscaleTime = upscaleTime + (1 / 60) * delta
  if (!progress.isVisible) {
    progress.draw()
  }
  if (!hero.isBig) {
    hero.upscale()
  }
  if (Math.trunc(upscaleTime) === 10) {
    hero.reset()
    progress.destroy()
    progress = new Progress(app, 25, 60, 100)
    upscaleTime = 0
  }
}

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
