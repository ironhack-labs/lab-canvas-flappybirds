class Background {
  constructor (ctx, canvasSize, imageSource) {
    this.ctx = ctx
    this.canvasSize = {
      w: canvasSize.w,
      h: canvasSize.h
    }
    this.image = new Image()
    this.image.src = imageSource
    this.backgroundPosition = {
      x: 0,
      y: 0
    }
    this.speed = {
      x: 1,
      y: 0
    }
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.backgroundPosition.x,
      this.backgroundPosition.y,
      this.canvasSize.w,
      this.canvasSize.h
    )
    this.ctx.drawImage(
      this.image,
      this.backgroundPosition.x + this.canvasSize.w,
      this.backgroundPosition.y,
      this.canvasSize.w,
      this.canvasSize.h
    )
    // this.move()
  }

  // move() {
  //   if(this.backgroundPosition.x <= -this.canvasSize.w) {
  //     this.backgroundPosition.x = 0
  //   }
  //   this.backgroundPosition.x -= this.speed.x
  // }
}