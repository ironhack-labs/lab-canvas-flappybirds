class Obstacle {
  constructor(ctx, width, height, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
​
    this.posX = 400;
    this.posY = 600;
    this.posUp = 0;
​
    this.vx = 10;
  }
​
  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    //this.ctx.fillRect(this.posX,this.posUp,this.width,this.height);
  }
​
  move() {
    this.posX -= this.vx;
  }
}