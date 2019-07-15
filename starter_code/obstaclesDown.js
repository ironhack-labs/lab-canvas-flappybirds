class ObstaclesDown {
  constructor(ctx, canvasW, playerY0, playerH) {
    this.ctx = ctx;
    this.width = 80;
    this.height = Math.floor(Math.random() * 100 + 150);

    this.posX = canvasW;
    this.posY = playerY0 + playerH - this.heigth;

    this.velX = 3;

    this.image = new Image();
    this.image.src = "images/obstacle_bottom.png";
  }

  draw() {
    console.log(this.image, this.posX, this.posY, this.width, this.heigth);
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.heigth
    );
  }

  move() {
    this.posX -= this.velX;
  }
}
