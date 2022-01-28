import * as PIXI from 'pixi.js'
import { drawBackgroundRectangles } from './utils/background'
import { Car, drawCar, removeCar } from './utils/car'
import { Coin } from './utils/coin'
import { BASE_HEIGHT, BASE_SPEED, BASE_WIDTH } from './utils/constants'
import { Menu } from './utils/menu'
import { Mushroom } from './utils/mushroom'
import { Progress } from './utils/progressbar'
import { Wall } from './utils/wall'
const app = new PIXI.Application({
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  backgroundColor: 0xb2beb2,
  resolution: window.devicePixelRatio || 1
})
drawBackgroundRectangles(app)

let coinsCount = 0
let level = 0
let prevCount = 0
let scoreCount = 0

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
let hero = new Car(app, 42, BASE_HEIGHT - 240, 0)

let enemies = []
let coins = []
let mushrooms = []
let walls = []

let speed = BASE_SPEED

let menu = new Menu(app, 0, 0, 'click to start')

menu.root.on('mousedown', () => {
  menu.destroy()
  menu.isStarted = true
})
ticker.add((delta) => {
  if (menu.isStarted) {
    if (!enemies.length) {
      const enemy = new Car(app, Math.random() > 0.5 ? 42 : BASE_WIDTH - 300, -120, speed)
      enemies.push(enemy)
    }

    if (!walls.length) {
      const wall = new Wall(app,2,4,1)
      const wall2 = new Wall(app,182,4,1)
      walls.push(wall)
      walls.push(wall2)
    }

    // walls.forEach(wall => {
    //   wall.update(delta/ 50)
    // })
    
    walls.forEach((wall) => {
      if (walls[walls.length - 1].root.y + walls[walls.length - 1].root.height <= BASE_HEIGHT) {
        const wall = new Wall(app,2,walls[walls.length - 1].root.y + walls[walls.length - 1].root.height + 46,1)
        const wall2 = new Wall(app,182,walls[walls.length - 1].root.y + walls[walls.length - 1].root.height + 46,1)
        walls.push(wall)
        walls.push(wall2)
      }

      // if (wall.root.y > 12) {
      //   wall.destroy()
      //   walls = walls.filter(oldWall => oldWall !== wall)
      //   console.log(111);
      // }
    })

    enemies = enemies.filter((enemy) => {
      enemy.update(delta)

      if (enemy.root.y > BASE_HEIGHT) {
        enemy.destroy()
        scoreCount += 100
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
      if (Math.random() < 0.5) {
        const coin = new Coin(app, enemy.root.x + 10, enemy.root.y - 160, speed)
        coins.push(coin)
      } else if (Math.random() < 0.99) {
        const mushroom = new Mushroom(app, enemy.root.x + 5, enemy.root.y - 160, speed)
        mushrooms.push(mushroom)
      }
      enemies.push(enemy)
      return true
    }

    enemies.some((enemy) => {
      if (checkForCollision(enemy.root, hero.root, 20)) {
        if (hero.isCollision) {
          ticker.stop()
          menu.isStarted = false
          progress.destroy()
          menu = new Menu(app, 0, 0, 'click to restart')
          hero.destroy()
          menu.root.on('mousedown', () => {
            menu.destroy()
            menu.isStarted = true
            hero = new Car(app, 42, BASE_HEIGHT - 240, 0)
            enemies.forEach((enemy) => enemy.destroy())
            coins.forEach((coin) => coin.destroy())
            mushrooms.forEach((mushroom) => mushroom.destroy())
            walls.forEach((wall) => wall.destroy())
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
            ticker.start()
          })
        } else {
          enemy.destroy()
          enemies = enemies.filter((enemyItem) => enemyItem !== enemy)
          scoreCount += 100
        }
        return true
      }
    })

    coins.some((coin) => {
      if (checkForCollision(coin.root, hero.root, 20)) {
        coin.destroy()
        coins = coins.filter((el) => el !== coin)
        coinsCount++
        scoreCount += 20
        coinsText.text = `coins: ${coinsCount}`
        return false
      }
    })
    scoreText.text = `score: ${scoreCount}`

    if (scoreCount >= prevCount + 2500) {
      prevCount = scoreCount
      level += 1
      speed += 2
      enemies.forEach((enemy) => enemy.incrementSpeed(speed))
      coins.forEach((coin) => coin.incrementSpeed(speed))
      mushrooms.forEach((mushroom) => mushroom.incrementSpeed(speed))

      levelText.text = `lap: ${level}`
    }

    mushrooms.some((mushroom) => {
      if (checkForCollision(mushroom.root, hero.root, 20)) {
        if (hero.isCollision) {
          mushroom.destroy()
          mushrooms = mushrooms.filter((el) => el !== mushroom)
          progress.draw()
          hero.upscale()
          let progressInterval = setInterval(() => {
            progress.update(1, delta)
          }, 100)
          setTimeout(() => {
            clearInterval(progressInterval)
            hero.reset()
            progress.destroy()
            progress = new Progress(app, 25, 60, 100)
          }, 10000)
        } else {
          mushroom.destroy()
          mushrooms = mushrooms.filter((el) => el !== mushroom)
        }
        return false
      }
    })

    app.stage.addChild(coinsText)
    app.stage.addChild(scoreText)
    app.stage.addChild(levelText)
    hero.recreate()
    if (!menu.isStarted) {
      menu.recreate()
    }
    if (progress) {
      progress.recreate()
    }
  }
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
