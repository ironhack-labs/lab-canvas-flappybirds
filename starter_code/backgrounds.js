class Background {
    constructor(canvasWidth) {
      this.bgImg = new Image();
      this.bgImg.src = 'images/bg.png';
      this.x = 0; // initial position x of bgImg
      this.vx = -2; // moving left speed
      this.canvasWidth = canvasWidth;
    }
  
    update() {
      this.x += this.vx;
      this.x %= this.canvasWidth;
    }
  
    draw(context) {
      context.drawImage(this.bgImg, this.x, 0);
      context.drawImage(this.bgImg, this.x + this.canvasWidth, 0);
    }
  
    reset() {
      this.x = 0;
    }
  }