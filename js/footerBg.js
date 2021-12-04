class Footer{
    constructor(ctx){
        this.ctx = ctx;
        this.x = 0;
        this.y = this.ctx.canvas.height - 79;
        this.width = this.ctx.canvas.width;
        this.height = 79;
        this.vx = -3;

        this.img = new Image();
        this.img.src = './images/game-bg-footer.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.onload = true;
        }
    }

    draw (){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
        this.ctx.drawImage(
            this.img,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        )
    }

    move(){
        this.x += this.vx;

        if(this.x + this.width <= 0){
            this.x = 0;
        }
    }

}