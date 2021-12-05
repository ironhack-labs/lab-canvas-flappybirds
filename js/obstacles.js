class Obstacles {
    constructor(ctx){
        this.ctx = ctx;

        this.x = this.ctx.canvas.width;
        this.y = Math.floor(Math.random() * (-350 - -500 + 1) + -500);

        this.vx = -3;
        this.space = 130;

        this.imgTop = new Image();
        this.imgTop.src = './images/obstacle_top.png';
        this.imgTop.onload = () => {
            this.imgTop.onload = true;
        }

        this.imgTop.width = 91;
        this.imgTop.height = 560;
        this.imgTop.finish = this.y + this.imgTop.height;

        this.imgBot = new Image();
        this.imgBot.src = './images/obstacle_bottom.png';
        this.imgBot.onload = () => {
            this.imgBot.onload = true;
        }

        this.imgBot.width = 91;
        this.imgBot.height = 560;
    }

    draw(){
        this.ctx.drawImage(
            this.imgTop,
            this.x,
            this.y,
            this.imgTop.width,
            this.imgTop.height
        )
        this.ctx.drawImage(
            this.imgBot,
            this.x,
            this.imgTop.finish + this.space,
            this.imgBot.width,
            this.imgBot.height
        )
    }

    move(){
        this.x += this.vx;
    }
}