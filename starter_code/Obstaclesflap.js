class Obstacle {
    constructor(ctx, canvasW, playerY0, playerH) {
        this.ctx = ctx;
        this.width = 60;
        this.height = Math.floor(Math.random() * 100 + 200);
        this.velX = 5;
        this.posX = canvasW;

        this.posY = playerY0 + playerH - this.height + 10;


        this.image = new Image()
        this.image.src = "images/obstacle_bottom.png"

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    move() {
        this.posX -= this.velX
    }
}