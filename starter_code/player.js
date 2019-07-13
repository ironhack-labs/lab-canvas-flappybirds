class Player {

  constructor(ctx, width, height) {
    this._ctx = ctx
    this._gameWidth = width
    this._gameHeight = height

    this._image = new Image()
    this._image.src = "images/flappy.png"

    this._posX = this._gameWidth/3
    this._posY = this._gameHeight/2
    this._width= 70
    this._height = 55

  }

  draw() {
    this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)

  }

}