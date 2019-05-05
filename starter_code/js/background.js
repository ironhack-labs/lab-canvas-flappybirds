class Background {
  constructor(ctx, w, h) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "images/bg.png";
    this.winH = h;
    this.winW = w;

    this.x = 0;
    this.y = 0;

    this.velX = 6;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.winW, this.winH);
    this.ctx.drawImage(
      this.img,
      this.x + this.winW,
      this.y,
      this.winW,
      this.winH
    );
  }

  move() {
    this.x -= this.velX;

    if (this.x < -this.winW) this.x = 0;
  }
}
