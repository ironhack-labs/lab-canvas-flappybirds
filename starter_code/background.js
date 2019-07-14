class Background {
  constructor(ctx, w, h) {
    this._ctx = ctx
    this._image = new Image()
    this._image.src = "images/bg.png"
    this._posX = 0 
    this._posY = 0
    this._width = w
    this._height = h
    this._velX = .5
  }

  draw() {
    this._ctx.drawImage(
      this._image,
      this._posX,
      this._posY,
      this._width,
      this._height
    )
    this._ctx.drawImage(
      this._image,
      this._posX + this._width,
      this._posY,
      this._width,
      this._height
    )
   
  }

  move() {
    this._posX -= this._velX
    if (this._posX <= -this._width) { this._posX = 0 }
  }
  
}
//antes decía this.ctx.draw.image ese era el error por el que no aparecía background
