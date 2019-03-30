class Obstacle {
  constructor(img, x, y, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = 139;
    this.h = h;
    this.img = img;
    this.ctx = ctx;
    this.speed = 2;
  }

  updatePos() {
    this.x -= this.speed;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
