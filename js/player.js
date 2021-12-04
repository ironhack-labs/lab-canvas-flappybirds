class Player {
    constructor(ctx){
        this.ctx = ctx;

        this.x = 25;
        this.maxY = 400;
        this.y = 252;

        this.vx = 0;
        this.vy = 0;
        this.ay = 0.2;

        this.speedX = 3;

        this.width = 46; 
        this.height = 32;

        this.img = new Image();
        this.img.src= './images/bird.png';
        this.img.isReady = false;       
        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 3;
        this.verticalFrames = 1;
        this.xFrame = 0;
        this.yFrame = 0;
        this.tick = 0;
        this.jumping = false;
    }

    draw() {
        this.ctx.drawImage(
            this.img, 
            (this.img.width * this.xFrame) / this.horizontalFrames,
            (this.img.height * this.yFrame) / this.verticalFrames,
            this.img.width / this.horizontalFrames,
            this.img.height / this.verticalFrames,
            this.x,
            this.y,
            this.width,
            this.height,
        ); 
    }
    move() {
        this.vy += this.ay;
        this.y += this.vy;
        // if (this.x + this.width >= this.ctx.canvas.width) {
        //   this.x = this.ctx.canvas.width - this.width
        // }
        if (this.y <= 0) {
          this.y = 0;
        }
        if (this.y >= this.maxY) {
          this.y = this.maxY;
          this.jumping = true;
        }
        // if (!this.gravity && this.speedGravity) {
        //   this.yFrame = 1
        //   if (this.tick % 10 === 0) {
        //     this.xFrame += 1
        //     if (this.xFrame > 1) {
        //       this.xFrame = 0
        //     }
        //   }
        // }
        // if (!this.running) {
        //   this.yFrame = 1
        //   this.xFrame = 0
        // }
        // if (this.jumping) {
        //   this.yFrame = 0
        //   this.xFrame = 0
        // }
    }

    onKeyDown(keyCode) {
        if (keyCode === SPACE_KEY) {
          this.vy = -5;
          this.jumping = true
          console.log('ntr')
          
        }
        
    }    
}