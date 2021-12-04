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

        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 3;
        this.verticalFrames = 1;

        this.xFrame = 0;
        this.yFrame = 0;

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
        
    }