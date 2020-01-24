class Character {
  constructor(ctx, width, height, speedY, gravitySpeed) {
    this._ctx = ctx;
    this._width = width;
    this._height = height;
    this._posX = 40;
    this._speedY = speedY;
    this._gravity = 0.4;
    this._gravitySpeed = gravitySpeed;
    this._posY = 300

    this._image = new Image();
    this._image.src = "images/flappy.png"
  }

  draw(){
      this._ctx.drawImage(
          this._image,
          this._posX,
          this._posY,
          this._width,
          this._height,
      )

  }

  move(){
      this._speedY = 1
      this._posY += this._speedY
  }
}
