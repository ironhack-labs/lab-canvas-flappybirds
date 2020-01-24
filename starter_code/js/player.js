class Player {
    constructor(ctx, gameW, gameH) {
        this.ctx = ctx;
        this.gameWidth = gameW;
        this.gameHeight = gameH;

        this.width = 50;
        this.height = 50;

        this.image = new Image();
        this.image.src = "images/flappy.png";
        // this.posX = 0;
        // this.posY = 0;
        this.velX = 8;

        this.posX = this.gameWidth/2 - this.width;
        this.posY = this.gameHeight/2;
        this.posY0 = this.posY;
    }
    draw() {
        // this.ctx.drawImage(this.image, 200, this.posY, 70, 100);
         this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}