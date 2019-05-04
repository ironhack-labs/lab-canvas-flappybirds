class Player {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.speed = {
      x: 5,
      y: 10
    }
    this.gravity = .05
    this.gravitySpeed = 0
    this.img = new Image()
    this.img.src = 'images/flappy.png'
    this.img.width = 498 / 4; //original img width 
    this.img.height = 351 / 4; //original img height
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
    this.newPos()
    this.ctx.drawImage(this.img, this.position.x, this.position.y, this.img.width, this.img.height)
  }
  update() {

  }
  newPos() {
    //console.log('position y', this.position.y)
    this.position.x += this.speed.x

    this.position.y += this.speed.y
    this.speed.y += this.gravity
    //if (this.position.x >= this.canvasDom.w) this.position.x = 0 //cuando la imagen está fuera del todo
  }
  changeGravity() {
    this.gravity *= -1
    this.speed.y *= -1
    console.log(this.gravity)
  }
}