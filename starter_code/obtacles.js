class Obstacle {
    constructor(ctx, w, h,  playerH) {

        this.ctx = ctx;
        this.width = w;
        this.height = h;
        
        this.image = new Image();
        this.image.src="./images/obstacle_top.png";

        this.posX = 0;
        this.posY = 0;
    }
    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    
    move() {
      this.posX -= this.velX
    }
  }