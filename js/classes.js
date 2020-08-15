class Board {
    constructor() {
      this.x = 0
      this.y = 0
      this.width = $canvas.width
      this.height = $canvas.height
      this.img = new Image()
      //this.img.src = "https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/images/bg.png"
      this.img.src = "../images/bg.png"
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      this.x--
      if (this.x < -$canvas.width) this.x = 0
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      ctx.drawImage(
        this.img,
        this.x + $canvas.width,
        this.y,
        this.width,
        this.height
      )
    }
  }
  
  class Flappy {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.width = 70
      this.height = 70
      this.velY = 0
      this.img = new Image()
      //this.img.src = "https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/images/flappy.png"
      this.img.src = '../images/flappy.png'
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    jump() {
      this.velY = -10
    }
    isTouching(obstacle) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      )
    }
  }
  
  class Obstacle {
    constructor(y) {
      this.x = $canvas.width
      this.y = y
      this.width = 138
      this.height = 793
      this.topImg = new Image()
      this.bottomImg = new Image()
      //this.bottomImg.src = "https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/images/obstacle_bottom.png"
      //this.topImg.src = "https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/images/obstacle_top.png"
      this.topImg.src = "../images/obstacle_top.png"
      this.bottomImg.src = "../images/obstacle_bottom.png"
    }
    draw() {
      this.x--
      if (this.y < 0) {
        ctx.drawImage(this.topImg, this.x, this.y, this.width, this.height)
      } else {
        ctx.drawImage(this.bottomImg, this.x, this.y, this.width, this.height)
      }
    }
  }
  