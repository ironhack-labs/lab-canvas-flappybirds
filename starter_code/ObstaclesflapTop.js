class ObstacleTop {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx;
        this.width = 60;
        this.height = Math.floor(Math.random() * 50 + 200);
        this.velX = 5;
        this.posX = canvasW;

        //this.posY = this.width * 3;
        this.posY = 0;


        this.image = new Image()
        this.image.src = "images/obstacle_top.png"

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    move() {
        this.posX -= this.velX
    }
}