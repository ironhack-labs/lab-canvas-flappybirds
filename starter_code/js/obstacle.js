class Obstacle {
  constructor(ctx, width, height, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.posX = gameWidth;
    this.posY = gameHeight * 1 - this.height;
    this.posUp = 0;
    this.vx = 3;
    this.imageT = new Image();
    this.imageT.src="images/obstacle_top.png";
    this.imageB = new Image();
    this.imageB.src="images/obstacle_bottom.png";
  }
  draw() {
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    // this.ctx.fillRect(this.posX,this.posUp,this.width,this.height);
    this.ctx.drawImage(this.imageT, this.posX, this.posUp, this.width, this.height);
    this.ctx.drawImage(this.imageB, this.posX, this.posY, this.width, this.height);
  }
  move() {
    this.posX -= this.vx;
  }
}
