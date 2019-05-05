class Obstacles {
  constructor(gameW, gameH, ctx, backgroundVelX) {
    this.gameW = gameW
    this.gameH = gameH
    this.ctx = ctx
    this.posX = undefined
    this.posY = undefined
    this.width = undefined
    this.height = undefined
    this.velX = backgroundVelX

    this.img = new Image()
    this.img.src = undefined

  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  move() {
    this.posX -= this.velX
  }

}

class TopObstacle extends Obstacles {
  constructor(gameW, gameH, ctx, backgroundVelX) {
    super(gameW, gameH, ctx, backgroundVelX)
    this.posY  = 0
    this.posX = this.gameW+Math.random()*400+100
    this.width = 100
    this.height = 100+Math.random()*125

    this.img.src = "images/obstacle_top.png"
  }
}


class BottomObstacle extends Obstacles {
  constructor(gameW, gameH, ctx, backgroundVelX) {
    super(gameW, gameH, ctx, backgroundVelX)
    this.posX = this.gameW+Math.random()*300
    this.posY  = this.gameH-Math.random()*125-100
    this.width = 100
    this.height = this.gameH-this.posY

    this.img.src = "images/obstacle_bottom.png"
  }
}