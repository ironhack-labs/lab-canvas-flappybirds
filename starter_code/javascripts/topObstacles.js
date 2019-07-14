class Tobstacle {
  constructor(ctx, canvasW, birdX, birdY, birdH) {
    this.ctx = ctx;
    this.posX = canvasW;
    this.birdX = birdX;
    this.birdY = birdY;
    this.birdH = birdH;

    this.image = new Image();
    this.image.src = "images/obstacle_top.png";
    this.width = 150;
    this.height = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
    this.posY = 0;
    this.velX = 10;
  }

  draw(framesCounter) {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.velX;
  }
}
