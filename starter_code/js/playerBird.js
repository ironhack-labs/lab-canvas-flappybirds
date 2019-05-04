class Player {
  constructor(w, h, ctx, keys) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.keys = keys;
    //posicion inicial
    this.x = this.canvasW / 3;
    this.y = this.canvasH / 2;
    //imagen
    this.img = new Image();
    this.img.src = "images/flappy.png";
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.dx;

    if (this.x < -this.w) this.x = 0;
  }
}
