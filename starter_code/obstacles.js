class Obstacles {
  constructor(ctx, canvasW) {
    this._ctx = ctx;
    this._width = 130;
    this._height = this._width * 3;
    this._velX = 10;
    this._posX = canvasW;
    this._posY = Math.random()*-300;
    this._posYBot = this._posY + 550;
    this._imageBot = new Image();
    this._imageBot.src = "images/obstacle_bottom.png";
    this._image = new Image();
    this._image.src = "images/obstacle_top.png";
  }

  draw() {
    this._ctx.drawImage(
      this._image,
      this._posX,
      this._posY,
      this._width,
      this._height
    );
    this._ctx.drawImage(
      this._imageBot,
      this._posX,
      this._posYBot,
      this._width,
      this._height
    );
  }

  move() {
    this._posX -= this._velX;
  }
}
