class Obstacle {
    constructor(ctx, gameWidth, gameHeight) {
        this._ctx = ctx;
        this.obsWidth = 100;
        this.obsHeight = 200;

        this.image = new Image();
        this.image.src = "./images/obstacle_top.png";

        this.posX = gameWidth;
        this.posYmax = gameHeight;
        this.posY = 0;

        this.speedX = 2;
    }

    draw() {
        this._ctx.drawImage(this.image, this.posX, this.posY, this.obsWidth, this.obsHeight)

    }
    move() {
        this.posX -= this.speedX
    }
}