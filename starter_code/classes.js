class Board {

  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "./images/bg.png"
    this.img.onload = () => {
      this.draw()
    }
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
    this.move()
  }

  move() {
    this.x--
    if (this.x < -canvas.width) this.x = 0
  }

}
class Flappy {
  constructor() {
    this.x = 150
    this.y = 150
    this.width = 50
    this.height = 50
    this.flappyUp = new Image()
    this.flappyMid = new Image()
    this.flappyDown = new Image()
    this.img = new Image()

    this.img.src = './images/redbird-upflap.png'
    this.flappyUp.src = './images/redbird-upflap.png'
    this.flappyMid.src = './images/redbird-midflap.png'
    this.flappyDown.src = './images/redbird-downflap.png'
  }
  draw() {
    this.y += 2
    if (frames % 5 === 0) {
      this.img =
        animateHelper === 0 ? this.flappyUp :
        animateHelper === 1 ? this.flappyMid :
        animateHelper === 2 ? this.flappyDown : this.flappyMid
      if (animateHelper < 4) {
        animateHelper++
      } else {
        animateHelper = 0
      }
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  flap() {
    console.log("ADSasdas");

    this.y -= 25
  }
  isTouching(pipe) {
    return (this.x < pipe.x + pipe.width &&
      this.x + this.width > pipe.x &&
      this.y > pipe.y + pipe.height &&
      this.y + pipe.height > pipe.y)
  }
}

class Pipe {

  constructor(y, height, type) {
    this.x = canvas.width
    this.y = y
    this.width = 50
    this.height = height
    this.imgTop = new Image()
    this.imgBottom = new Image()
    this.imgBottom.src = './images/obstacle_bottom.png'
    this.imgTop.src = './images/obstacle_top.png'
    this.type = type

  }
  move() {
    this.x--
  }
  draw() {
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)

    } else {
      ctx.drawImage(this.imgBottom, this.x, this.y, this.width, this.height)
    }
    this.move()
  }
}