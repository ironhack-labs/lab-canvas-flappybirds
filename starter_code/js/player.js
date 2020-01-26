class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;
    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 50;
    this.height = 50;

    this.image = new Image();
    this.image.src = "images/flappy.png";

    this.keys = keys;
    this.velX = 8;
    this.velY = 1.2;
    this.gravity = 0.3;

    this.posX = this.gameWidth / 2 - this.width;
    this.posY = this.gameHeight / 2 - this.height;
    this.posY0 = this.posY;

    this.setListeners();
  }
  draw() {
    // this.ctx.drawImage(this.image, 200, this.posY, 70, 100);
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    //this.posY += 2;
  }
  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 32) {
        this.velY = 8;
        console.log("Hola");
      }
    });
  }
  move() {
    this.posY -= this.velY;
    this.velY -= this.gravity;
    if (this.posY >= this.gameHeight) {
      this.posY = this.gameHeight - 100;
      this.velY = 0;
      console.log("Has perdido");
    }
  }
}
