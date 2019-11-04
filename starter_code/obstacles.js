class Obstacle {
    constructor(ctx, canvasW, playerY0,  playerH) {
      this.ctx = ctx;
      this.width = 50;
      //que aparezcan en el suelo
      this.height = 100;
      this.velX = 10;
      this.posX = canvasW;
      this.posY = 0;
      this.posY2 = 200 + Math.floor(Math.random() * 100);
      this.image = new Image()
      this.image2 = new Image()
      this.image.src = 'images/obstacle_top.png'
      this.image2.src = 'images/obstacle_bottom.png'
  
    }
  
    draw() {
  
      this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
      this.ctx.drawImage(this.image2, this.posX, this.posY2, this.width, this.height)
    }
  
    move() {
      this.posX -= this.velX
    }
  }