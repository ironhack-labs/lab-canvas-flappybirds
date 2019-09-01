class Player {
  constructor(w, h, ctx, keys) {
    this.canvasWidth = w;
    this.canvasHeight = h;
    this.ctx = ctx;
    this.keys = keys;
    
    this.paramX = 40;
    this.paramY = this.canvasHeight * .95;
    this.paramY0 = this.canvasHeight * .95;

    this.img = new Image();
    this.img.src = 'images/flappy.png';

    this.width = 50;
    this.height = 50;
    this.speed = 1;

    this.setListeners();
  }

  draw() {
    this.ctx.drawImage(this.img, this.paramX, this.paramY, this.width, this.height);
  }

  setListeners() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {                   
        case this.keys.SPACE:
            this.paramY -= 30;
            this.speed -= 10;
            break;
      }
    }
  };

  move() {
    let gravity = 0.4;

    if (this.paramY <= this.paramY0) {
      this.paramY += this.speed;
      this.speed += gravity;
    } else {
      this.speed = 1;
      this.paramY = this.paramY0;
    }

    if (this.paramY >= 0) {
      this.paramY += this.speed;
      this.speed += gravity;
    } else {
      this.speed = 1;
      this.paramY = 0;
    }
  }
};
