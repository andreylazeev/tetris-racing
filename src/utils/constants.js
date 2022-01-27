export const BASE_WIDTH = 400
export const BASE_HEIGHT = 720
export const BASE_SPEED = 5

export const CAR_FIGURE = [
  [0,1,0],
  [1,1,1],
  [0,1,0],
  [1,0,1],
]

export const COIN_FIGURE = [
  [0,0,1,1,1,1,1,1,0,0],
  [0,0,1,0,0,0,0,1,0,0],
  [0,1,0,1,1,1,1,0,1,0],
  [0,1,0,1,1,1,1,0,1,0],
  [0,1,0,1,1,1,1,0,1,0],
  [0,1,0,1,1,1,1,0,1,0],
  [0,0,1,0,0,0,0,1,0,0],
  [0,0,1,1,1,1,1,1,0,0],
]

const sampleLevel = [
  ['car', 'empty'],
  ['empty', 'empty'],
  ['car', 'empty'],
  ['coin', 'empty'],
  ['car', 'empty'],
  ['empty', 'car'],
]