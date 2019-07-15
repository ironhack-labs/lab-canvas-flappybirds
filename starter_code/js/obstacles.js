class Obstacle {
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.width = 15;
    this.height = this.width * 3;
    this.velX = 10;
    this.posX = canvasW;
    //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
    this.posY = playerY0 + playerH - this.height - 5;
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.velX
  }
}