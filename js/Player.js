class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 60;

        this.maxY = 330;
        this.y = this.maxY;


        this.speedX = 2;
        this.width = 30;
        this.height = 40;

        this.img = new Image()
        this.img.src = './images/flappy.png'
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true;
        }
    }
}