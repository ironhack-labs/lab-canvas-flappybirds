class Bird {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;
        this.image = new Image();
        this.image.src = "./images/flappy.png";

        this.width = 80;
        this.height = 60;

        this.posX = this.gameWidth * 0.3;
        this.posY = this.gameHeight / 2;

        this.velY = 0;
        this.gravity =0;
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height,
        )
    }

    move() {
        this.posY += this.velY;
        this.velY += this.gravity;
    }

    jump() {
        this.velY = -5;


    }





}