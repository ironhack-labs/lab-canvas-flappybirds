class Player {
  constructor(w, h, ctx, key) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.key = key;
    //posicion inicial
    this.x = this.canvasW / 3;
    this.y = this.canvasH / 2;
    //imagen
    this.img = new Image();
    this.img.src = "images/flappy.png";
    // velocidad
    this.velY = 0;
    this.gravity = 0.4;

    this.setListeners();
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 70, 50);
  }

  setListeners() {
    document.onkeydown = event => {
      event.keyCode === this.key;
      // this.y -= 5;
      this.velY = -10;
    };
  }
  move() {
    this.velY += this.gravity;
    this.y += this.velY;
  }
}
