class Obstacle {
  constructor(ctx, canvasW, birdY0, birdH) {
    this.ctx = ctx;
    this.posX = canvasW;

    this.image = new Image();
    this.image.src = "images/obstacle_bottom.png";
    this.width = 150;
    this.height = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
    this.velX = 10;
    //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
    this.posY = birdY0 + birdH * 2 - this.height - 10;
  }

  draw(framesCounter) {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.velX;
  }
}
