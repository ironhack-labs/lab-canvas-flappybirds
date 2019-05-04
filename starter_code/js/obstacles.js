class Obstacle {
  constructor(winW, winH, ctx) {
    this.ctx = ctx;
    this.winW = 15;
    this.winH = 30;
    this.height = 300;
    this.width = 200;
    this.x = this.winW - this.width;
    this.y = this.winH - this.height;

    this.img = new Image();
    this.img.src = "images/obstacle_bottom.png";
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

/* class ObstacleTop extends Osbstacle {

  constructor(w,h,ctx) {
    super(this.ctx, this);
    this._subtotal = subtotal;
    this._tax = tax;
    this._currency = "€";
  } */

/*   draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.dx;
  } */
