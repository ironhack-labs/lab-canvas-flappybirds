class Obstacle {
    constructor(ctx, canvasW, playerY0, playerH) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "./images/obstacle_bottom.png"
        this.width = 200;
        this.height = 100;
        this.velX = 40;
        this.posX = canvasW;
    }

    draw() {
        this.ctx.drawImage(this.image, 700, 500, 100, 1000);
    }

    move() {
        this.posX -= this.velX;

    }

}