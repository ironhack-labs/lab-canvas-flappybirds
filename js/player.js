class Player {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 450;
        this.y = 252;
        this.width = 44;
        this.height = 32;

        this.vx = 0;
        this.vy = 0;

        this.ay= 0.2;



        this.img = new Image();
        this.img.src = './images/bird.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 3;
        this.verticalFrames = 1;

        this.xFrame = 1;
        this.yFrame = 0;

        this.ticks = 0;
        this.isFlying = true;
    }
    
    move(){
        if(this.isFlying){
            this.xFrame = 0;

            if(this.ticks % 10 === 0){
                this.xFrame++;
    
                if(this.ticks % 5 === 0){
                    this.xFrame = 2;
                }
            }
        }
        this.vy += this.ay;
        this.y += this.vy;
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
            this.height
        )
        this.ticks++;
    }

    onKeyDown(keyCode){
        if (keyCode === 32){
            this.vy = -5;
            this.y += this.vy;
        }
    }

    onKeyUp(keyCode){
        //
    }

    

}