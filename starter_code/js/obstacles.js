class Obstacle{
    constructor(ctx, width, height, gameWidth) {
        this.ctx = ctx;
        this.width = 100;
        this.height = 575;
        this.image = new Image();
        this.image.src = "images/obstacle_top.png";
        this.posX = gameWidth - this.width*2;
        this.posY = 0 - this.height + Math.floor(Math.random() * 200) + 1  ;
        this.velX = 8;
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
}
    /*
    constructor(ctx, gameWidth, gameHeight, playerPosY0, playerHeight) {
      this.ctx = ctx;
      this.width = 14;
      this.height = this.width * 3;
  
      this.posX = gameWidth;
      this.posY = playerPosY0 + playerHeight - this.height;
  
      this.velX = 10;
    }
  
    draw() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
  
    move() {
      this.posX -= this.velX;
    }
    */

  