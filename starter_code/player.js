class Player {
  constructor(img, x, y, ctx, floorH) {
    this.width = 50;
    this.height = 50;
    this.img = img;
    this.x = x;
    this.y = y;
    this.gravitySpeed = 4;
    this.ctx = ctx;
    this.floorH = floorH;
  }

  updatePos() {
      this.y = this.y + this.gravitySpeed;
  }

  jump() {
      this.y-=100;
  }

  draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  isDead() {
      return this.y + this.height > this.floorH;
  }
}
