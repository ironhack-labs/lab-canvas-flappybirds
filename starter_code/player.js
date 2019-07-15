class Player {
  constructor(ctx, w, h, keys) {
    this.ctx = ctx;
    this.gameWidth = w;
    this.gameHeight = h;
    this.keys = keys;

    this.image = new Image();
    this.image.src = "images/flappy.png";

    this.width = 70;
    this.height = 70;

    this.posX = 70;
    this.posY = this.gameHeight * 0.98 - this.height;
    this.posY0 = this.gameHeight * 0.98 - this.height;

    this.velY = 1;

    this.setListeners();
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  move() {
    let gravity = 0.4;
    if (this.posY <= this.posY0) {
      this.posY += this.velY;
      this.velY += gravity;
    } else {
      this.velY = 1;
      this.posY = this.posY0;
    }
  }

  setListeners() {
    document.onkeydown = e => {
      switch (e.keyCode) {
        case this.keys.KEY_W:
          this.posY -= 30;
          this.velY -= 10;
          break;
      }
    };
  }
}
