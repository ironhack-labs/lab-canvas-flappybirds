class Background {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;


        this.width = 900;
        this.height = 504;



        this.img = new Image()
        this.img.src = './images/bg.png'
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
                this.height)

        }
    }

}