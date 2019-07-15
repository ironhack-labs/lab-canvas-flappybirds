class Obstacle {

    constructor (ctx, canvasW, y, img, height) {
        this.ctx = ctx

        this.height = height
        this.posX = canvasW
        this.posY = y
        this.velX = 10
        this.image = new Image()
        this.image.src = img  
    }

    get width() {
        return this.image.width
    }

    move() {
        this.posX -= this.velX
    }
}

class ObstacleTop extends Obstacle {
    constructor(ctx, canvasW, y, img, height) {
        super(ctx, canvasW, y, img, height)
    }

    draw() {
        this.ctx.drawImage(
            this.image, 
            0,
            this.image.height-this.height,
            this.image.width,
            this.image.height,
            this.posX, 
            this.posY,
            this.image.width,
            this.image.height)
     }

}

class ObstacleBottom extends Obstacle {
    constructor(ctx, canvasW, y, img, height) {
        super(ctx, canvasW, y, img, height)
    }

    draw() {
        this.ctx.drawImage(
            this.image, 
            0,
            0,
            this.image.width,
            this.height,
            this.posX, 
            this.posY,
            this.image.width,
            this.height)
     }
}