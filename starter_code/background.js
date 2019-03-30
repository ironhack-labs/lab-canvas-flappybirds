class Background {
  constructor(img, x, w, h, ctx) {
    this.img = img;
    this.x = x;
    this.ctx = ctx;
    this.img = img;
    this.w = w;
    this.h = h;
  }

  move() {
    this.x--;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, 0, this.w, this.h);
    this.ctx.drawImage(this.img, this.x + this.w, 0, this.w, this.h);
    if(this.x < -this.w){this.x = 0;}
  }
}
