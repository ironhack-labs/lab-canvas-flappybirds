class Obstacle {
    constructor(canvasWidth, canvasHeight, randomPos) {
      this.imgBottom = new Image();
      this.imgBottom.src = 'images/obstacle_bottom.png';
      this.imgTop = new Image();
      this.imgTop.src = 'images/obstacle_top.png';
      this.width = 100;
      this.height = 793;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.x = this.canvasWidth;
      this.y = randomPos - this.height; // position of the top obstacle
      this.gap = 200; // gap between top and bottom obstacles
      this.speedX = -4;
    }
  
    update() {
      this.x += this.speedX;
    }
  
    draw(context) {
      context.save();
      // translate to the position of the top obstacle
      context.translate(this.x, this.y);
      // draw top obstacle
      context.drawImage(this.imgTop, 0, 0, this.width, this.height);
      // draw bottom obastacle, position should include the gap
      context.drawImage(
        this.imgBottom,
        0,
        this.height + this.gap,
        this.width,
        this.height
      );
      context.restore();
    }
  
    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
    top() {
      return this.y + this.height;
    }
    bottom() {
      return this.y + this.height + this.gap;
    }
  }
  