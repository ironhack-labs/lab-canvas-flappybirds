class Obstacle {
  constructor(ctx, canvasDom, playerH) { //como necesito más de 4 argumentos, le paso el objeto app entero
    this.ctx = ctx
    this.w = 138
    this.speed = {
      x: 5,
      y: 10
    }
    this.canvasDom = {
      w: canvasDom.w,
      h: canvasDom.h
    }
    this.gap = playerH * 2
    this.position = {
      x: this.canvasDom.w,
      topY: undefined,
      bottomY: undefined
    }

    this.top = new Image()
    this.top.src = 'images/obstacle_top.png'
    this.top.height = this.randomHeight()
    this.position.topY = 0

    this.bottom = new Image()
    this.bottom.src = 'images/obstacle_bottom.png'
    this.bottom.height = this.calculateBottomHeight()
    this.position.bottomY = this.canvasDom.h - this.bottom.height
  }

  draw() {
    this.drawTopObstacle()
    this.drawBottomObstacle()
    //console.log('position y', this.position.y)
  }
  move() {
    this.position.x -= this.speed.x;
    console.log('obstacle pos x', this.position.x)
  }
  randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
  drawTopObstacle() {
    //this.top.height = this.randomHeight()
    this.ctx.drawImage(this.top, this.position.x, this.position.topY, this.w, this.top.height)
  }
  drawBottomObstacle() {

    // this.bottom.height = this.calculateBottomHeight()
    this.ctx.drawImage(this.bottom, this.position.x, this.position.bottomY, this.w, this.bottom.height)
  }
  randomHeight() {
    return this.randomNumber(100, this.canvasDom.h - 100)
  }
  calculateBottomHeight() {
    return this.canvasDom.h - this.top.height - this.gap
  }
}