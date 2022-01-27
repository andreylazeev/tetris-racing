import * as PIXI from 'pixi.js'
import { drawBackgroundRectangles } from './utils/background'
import { Car, drawCar, removeCar } from './utils/car'
import { BASE_HEIGHT, BASE_WIDTH } from './utils/constants'
const app = new PIXI.Application({
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  backgroundColor: 0xb2beb2,
  resolution: window.devicePixelRatio || 1
})
drawBackgroundRectangles(app)

// function checkForCollision(obj1, obj2){
//   let hit, combinedHalfWidths, combinedHalfHeights, vx, vy
//   obj1.centerX = obj1.x + obj1.width / 2
//   obj1.centerY = obj1.y + obj1.height / 2
//   obj2.centerX = obj2.x + obj2.width / 2
//   obj2.centerY = obj2.y + obj2.height / 2

//   obj1.halfWidth = obj1.width / 2
//   obj1.halfHeight = obj1.height / 2

//   obj2.halfWidth = obj2.width / 2
//   obj2.halfHeight = obj2.height / 2

//   vx = obj1.centerX - obj2.centerX
//   vy = obj1.centerY - obj2.centerY

//   combinedHalfWidths = obj1.halfWidth + obj2.halfWidth 
//   combinedHalfHeights = obj1.halfHeight + obj2.halfHeight

//   if (Math.abs(vx) < combinedHalfWidths) {
//     if (Math.abs(vy) < combinedHalfHeights) {
//       hit = true
//     } else hit = false
//   }
//   else {
//     hit = false
//   }

//   return hit
// }

function checkForCollision(a,b, offsetY) {
  let aBox = a.getBounds()
  let bBox = b.getBounds()

  return aBox.x + aBox.width > bBox.x &&
         aBox.x < bBox.x + bBox.width &&
         aBox.y-offsetY + aBox.height - offsetY > bBox.y &&
         aBox.y < bBox.y + bBox.height
}

const ticker = new PIXI.Ticker()
const hero = new Car(app, 42, BASE_HEIGHT - 240, false)
let enemies = []
ticker.add((delta) => {
  if (!enemies.length) {
    const enemy = new Car(app, Math.random() > 0.5 ? 42 : BASE_WIDTH - 300, -160, true)
    enemies.push(enemy)
  } 
  enemies = enemies.filter(enemy => {
    enemy.update(delta)
    if (enemy.root.y > BASE_HEIGHT) {
      enemy.destroy()
      return false
    }
    return true
  })
  
  if (enemies[enemies.length - 1].root.y - 220 >= 0) {
    const enemy = new Car(app, Math.random() > 0.5 ? 42 : BASE_WIDTH - 300, -160, true)
    enemies.push(enemy)
    return true
  }

  enemies.some(enemy => {
    if (checkForCollision(enemy.root, hero.root, 20)) {
      console.log('lose');
      return true
    }
  })
})

ticker.start()




window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
      hero.setRight()
  }
  if (e.key === 'ArrowLeft') {
    hero.setLeft()
  }
})

document.body.appendChild(app.view)
