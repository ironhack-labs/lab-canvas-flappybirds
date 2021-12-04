class FooterBackground {
    constructor(ctx) {
        this.ctx = ctx;

  
        this.img = new Image();
        this.img.src = '/assets/images/game-bg-footer.png';
        this.img.isReady = false;

        this.width = this.ctx.canvas.width;
        this.height = this.img.height;
        this.x = 0;
        this.y = this.ctx.canvas.height - this.height;

        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    draw() {
        if (this.img.isReady) {
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
    }

}