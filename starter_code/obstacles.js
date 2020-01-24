class Obstacles {
  constructor(ctx, canvasW) {
    this._ctx = ctx;
    this._width = 80;
    this._height = this._width * 2.5;
    this._velX = 10;
    this._posX = canvasW;
    this._posY = 0;

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
  }

  move() {
    this._posX -= this._velX;
  }
}
