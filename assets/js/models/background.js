class Background {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.img = new Image();
        this.img.src = '/assets/images/bg.png';
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                0,
                this.width,
                this.height
            )
        }
    }

}