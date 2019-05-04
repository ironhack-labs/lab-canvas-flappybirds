class Player {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.speed = {
      x: 0,
      y: -2
    }
    this.w = 498 / 4;
    this.h = 351 / 4
    this.gravity = .005
    this.gravitySpeed = 0
    this.img = new Image()
    this.img.src = 'images/flappy.png'
    this.canvasDom = {
      w: width,
      h: height
    }

    this.position = {
      x: width * 0.08,
      y: height / 2
    }

    //console.log(this.position)
  }
  draw() {
    //console.log("entro en drawplayer")
    //console.log(this.img, this.position.x, this.position.y, this.img.width, this.img.height)
    this.move()
    this.ctx.drawImage(this.img, this.position.x, this.position.y, this.w, this.h)
  }
  move() {
    //console.log('position y', this.position.y)
    this.position.y += this.speed.y
    this.speed.y += this.gravity

    if (this.position.y >= this.canvasDom.h - this.h) {
      this.position.y = this.canvasDom.h - this.h - 4
      this.speed.y = 0
    }
    if (this.position.y <= 0) {
      this.position.y = 4
      this.speed.y = 0
    }

  }
  changeGravity() {
    this.gravity *= -1
    this.speed.y *= this.gravity
    console.log(this.gravity)
  }
}