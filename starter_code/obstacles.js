class Obstacle {
    constructor(ctx, gameWidth) {
        this.ctx = ctx;
        this.width = 50
        this.height = Math.random() * (200 - 100) + 50
        this.posX = gameWidth;
        this.posY = 0
        this.image = new Image();
        this.image.src = "./images/obstacle_top.png";
        this.velX = 10;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }

    move() {
        this.posX -= this.velX;
    }
}

class ObstacleBot {
    constructor(ctx, gameWidth) {
        this.ctx = ctx;
        this.width = 50
        this.height = 200
        this.posX = gameWidth;
        this.posY = Math.random() * (300 - 180) + 200
        this.image = new Image();
        this.image.src = "./images/obstacle_bottom.png";
        this.velX = 10;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posX -= this.velX;
    }

}
// Math.random() 270 * 