// @ts-nocheck

class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.speed = speed
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "images/bg.png"
    this.img.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    this.x -= this.speed
    ctx.drawImage(
      this.img,
      this.x +this.width,
      this.y,
      this.width,
      this.height
    )
    this.x + this.width <= 0 ? (this.x = 0) : void 0
  }
}

class Bird {
  constructor() {
    this.x = 10
    this.y = 10
    this.height = 30
    this.width = 30
    this.speedY = 0.1
    this.gravity = 0.14
    this.img = new Image()
    this.img.src = "images/flappy.png"
    this.img.onload = () => {
      this.draw()  
    }
  }

  update() {
    this.speedY = -3
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    
    this.y += this.speedY

    if (this.speedY >= 9.8) {
      this.speedY = 9.8
    } else {
      this.speedY += this.gravity
    }
  }
}

class Obstacle {
  constructor() { 
    this.width = 35
    this.height = 75
    this.speed = speed
    this.x = canvas.width
    this.yTop = Math.floor((Math.random() * this.height) - this.height)
    this.yBot = this.yTop + 75 + this.height
    this.imgTop = new Image()
    this.imgBot = new Image()
    this.imgTop.src = "images/obstacle_top.png"
    this.imgBot.src = "images/obstacle_bottom.png"
    this.imgTop.onload = () => {
      this.draw()
    }
    this.imgBot.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(
      this.imgTop,
      this.x,
      this.yTop,
      this.width,
      this.height
    )
    ctx.drawImage(
      this.imgBot,
      this.x,
      this.yBot,
      this.width,
      this.height
    )

    this.x -= this.speed
  }

  randomPosition() {
    let yTop = Math.floor(Math.random() * this.height)
    console.log(yTop)
  }
}