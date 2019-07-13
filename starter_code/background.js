class Background {
  constructor(ctx, url) {
    this._ctx = ctx
    this._url = url
    this._image = new Image()
    this._image.src = url
    this._posX = 0
    this._posY = 0
    this._width = window.innerWidth * .96 //size newly set
    this._height = window.innerHeight * .6 //size newly set
  }
  draw() {
    this.ctx.draw.image(
      this._image,
      this._posX,
      this._posY,
      this._width,
      this._height
    )
  }
}
