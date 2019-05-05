class Obstacle {

  constructor(ctx, canvasW, canvasH, url) {
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH

    this.img = new Image()
    this.img.src = url

    this.w = 100
    this.hMin = 200
    this.hMax = 280
    this.h = Math.floor(Math.random() * (this.hMax - this.hMin)) + this.hMin

    this.x = this.canvasW - this.w
    this.y = undefined

    this.velX = 10
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x, this.y,
      this.w, this.h
    )
  }

  move() {
    this.x -= this.velX
  }

}


class ObstacleTop extends Obstacle {

  constructor(ctx, canvasW, canvasH, url) {
    super(ctx, canvasW, canvasH, url)

    this.y = 0
  }

}

class ObstacleBottom extends Obstacle {

  constructor(ctx, canvasW, canvasH, url) {
    super(ctx, canvasW, canvasH, url)

    this.y = this.canvasH - this.h
  }

}