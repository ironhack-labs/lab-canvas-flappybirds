class Background {
  constructor(width, height, ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "images/bg.png";
    this.height = height;
    this.width = width;
    this.posX = 0;
    this.posY = 0;
    this.speedX = 7;
  }
  draw() {
    this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    this.ctx.drawImage(
      this.img,
      this.posX + this.width,
      this.posY,
      this.width,
      this.height
    );
  }
  move() {
    this.posX -= this.speedX;

    if (this.posX < -this.width) this.posX = 0;
  }
}
