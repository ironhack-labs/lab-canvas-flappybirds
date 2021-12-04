class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = "/assets/images/bird.png";
        this.img.isReady = false;

        this.width = this.img.width / 3;
        this.height = this.img.height;

        this.x = 100;
        this.y = (this.ctx.canvas.height / 2) - this.height;

        this.vx = 0;
        this.vy = 0;
        this.ay = 30;

        this.speedY = -3;

        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 3;
        this.verticalFrames = 1;

        this.xFrame = 0;
        this.yFrame = 0;

        this.jumping = false;

    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width * this.xFrame) / this.horizontalFrames,
                (this.img.height * this.yFrame) / this.verticalFrames,
                this.img.width / this.horizontalFrames,
                this.img.height / this.verticalFrames,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    oneKeyDown(keyCode) {
    if (keyCode === SPACE_KEY && !this.jumping) {
        this.y -= this.ay;
        this.jumping;
    }

    }

    /* oneKeyUp(keyCode) {
     
    } */


    move() {
        this.vy += this.ay;
        this.y += this.vy;

     /*    if (this.y + this.height <= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
        } */
    }
        
    }