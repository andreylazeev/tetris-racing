export class Ticker {
  constructor(frames) {
    this.counter = 0
    this.frames = frames
  }

  update(cb) {
    this.counter++
    if (this.counter > this.frames) {
      cb()
      this.counter = 0
    }
  }
}
