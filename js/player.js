class Player {
  constructor (ctx, canvasSize, key) {
    this.ctx = ctx
    this.canvasSize = {
      w: canvasSize.w,
      h: canvasSize.h
    }
    this.playerSize = {
      w: 60,
      h: 60
    }
    this.playerPosition = {
      x: canvasSize.w / 2 - 120,
      y: canvasSize.h / 2 - this.playerSize.h
    }
    this.gravity = 0.4
    this.gravitySpeed = 0.5
    this.playerSpeed = {
      x: 1,
      y: 1
    }
    this.key = key
    this.image = new Image()
    this.image.src = 'images/flappy.png'

    this.setEventListeners()
  }

  setEventListeners() {
    document.onkeydown = e => {
      if (e.key === this.key) {
        this.jump()
      }
    }
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.playerPosition.x,
      this.playerPosition.y,
      this.playerSize.w,
      this.playerSize.h
    )
    this.move()
  }

  jump() {
    this.playerPosition.y -= 100
    this.playerSpeed.y -= 8
    // this.speed.y += this.gravity
  }

  move() {
    if (this.playerPosition.y >= this.canvasSize.h - this.playerSize.h) {
      this.playerSpeed.y *= -1
    }
    if (this.playerPosition.x >= this.canvasSize.w - this.playerSize.w) {
      this.playerSpeed.x *= -1
    }

    
    this.playerSpeed.y += this.gravity;
    this.playerPosition.y += this.gravity + this.gravitySpeed;
    
  }
}
  


