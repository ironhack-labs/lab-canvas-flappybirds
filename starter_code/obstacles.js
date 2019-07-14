class Obstacles {
  constructor(ctx, url, canvaswidth, y, w, h) {
    this._ctx = ctx
    this._image = new Image()
    this._image.src = url
    this._posX = canvaswidth
    this._posY = y
    this._width = w
    this._height = h
    this._velX = 5
  }
  draw() {
      this._ctx.drawImage(
      this._image,
      this._posX,
      this._posY,
      this._width,
      this._height)
  }

  move() {
    this._posX -= this._velX
  }
}
console.log(this._height)