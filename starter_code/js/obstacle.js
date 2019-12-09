class Obstacle {
  constructor(ctx, gameWidth, gameHeight, backgroundVx = 8) {
    this.ctx = ctx;
    this.width = 100;
    this.height = 500;
    this.posX= gameWidth;
    this.gameHeight = gameHeight;
    this.space = 150;
    this.posY = Math.floor(Math.random() * 300);
    this.vx = backgroundVx;
  }

  chargeImages() {
    let image1 = new Image();
    image1.src = "./images/obstacle_top.png";
    let image2 = new Image();
    image2.src = "./images/obstacle_bottom.png";
    return [image1, image2];
  }

  draw() {
    this.ctx.drawImage(
      this.chargeImages()[0],
      this.posX,
      -this.posY,
      this.width,
      this.height
    );
    this.ctx.drawImage(
      this.chargeImages()[1],
      this.posX,
      -this.posY + this.height+this.space,
      this.width,
      this.height
    );
  }

  move() {
    this.posX -= this.vx;
  }
}
