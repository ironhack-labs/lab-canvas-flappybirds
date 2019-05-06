class Faby {
  constructor(width, height, ctx, SPACE, gravity, velY) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.SPACE = SPACE;
    this.gravity = gravity;
    this.posX = this.width * 0.1;
    this.posY = this.height / 2;
    this.velY = velY;

    this.iWidth = 60;
    this.iHeight = 50;

    this.img = new Image();
    this.img.src = "images/flappy.png";

    this.setListeners();
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      this.posX,
      this.posY,
      this.iWidth,
      this.iHeight
    );
  }
  setListeners() {
    document.onkeydown = event => {
      if (event.keyCode === this.SPACE && this.posY > 0) {
        // this.gravity *= -1;
        this.velY = -10;
      }
    };
    // document.onkeyup = event => {
    //   if (event.keyCode === this.SPACE) {
    //     this.gravity *= -1;
    //     this.velY *= -1;
    //   }
    // };
  }
  move() {
    this.posY += this.velY;
    this.velY += this.gravity;
    if (this.posY <= 10) {
      this.velY += this.gravity;
      this.posY += velY;
    } else if (this.posY >= 690) {
      this.velY = 0;
      this.posY -= 50;
    }
    // else {
    //   this.velY += this.gravity;
    //   this.posY += this.velY;
    // }
  }
}
