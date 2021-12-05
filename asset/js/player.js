class Player {
    constructor(ctx) {
      this.ctx = ctx;
      
      // Player starting point
      this.x = 100;
      this.y = 340;
  
      // speed and acceleration
      this.vy = 0;
      this.ay = 0.2;
  
      // size of the player
      this.width = 46;
      this.height = 32;
  
      this.img = new Image();
      this.img.src = 'asset/images/sprite.png';
      this.img.isReady = false;
  
      this.img.onload = () => {
        this.img.isReady = true;
      };


      // sprites image definition 
      this.horizontalFrames = 3;
      this.verticalFrames = 1;

      // counters to navigate in the image
      this.xFrame = 0;
      this.yFrame = 0;
      this.tick = 0;
    }
    // sintax: void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    draw() {
      this.ctx.drawImage(
        this.img,                                                 // the image 
        (this.img.width * this.xFrame) / this.horizontalFrames,   // the x of the frame in the image
        (this.img.height * this.yFrame) / this.verticalFrames,    // the y of the frame in the image
        this.img.width / this.horizontalFrames,                   // the width of each frame 
        this.img.height / this.verticalFrames,                    // the height of each frame 
        this.x,                                                   // the x-axis coordinate in the destination canvas 
        this.y,                                                   // the y-axis coordinate in the destination canvas 
        this.width,                                               // allows scaling of the drawn image
        this.height                                               // allows scaling of the drawn image
      );
  
      this.tick++;
    }
    
    // every 10 tiks, show the following frame, if is the last frame, start again.
    animation(){
      if (this.tick % 10 === 0) {
          this.xFrame++;
    
          if (this.xFrame >= this.horizontalFrames ) {
            this.xFrame = 0;
          }
      }
    }
  
    move() {
    this.animation();

    this.vy += this.ay;
    this.y += this.vy;
    }
  
    onKeyDown(keyCode) {
        if (keyCode === SPACE_BAR) {
            this.vy = -5;
        }
    }
  
    collidesWith(obstacle) {
      return(
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.width > obstacle.y);
    }
}