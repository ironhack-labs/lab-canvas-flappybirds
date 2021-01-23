class Obstacle {
    constructor(ctx, canvasSize, obstacleType) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.width = 50
        this.height = 80
        this.obstacleType = obstacleType
        this.imageInstance = new Image()
        this.posX = this.canvasSize.w - this.width
        this.posY = 0
        this.speedX = 5
    }


    drawObstacle() {
        this.obstacleType === 'top' ? this.posY = 0 : this.posY = this.canvasSize.h - this.height
        this.imageInstance.src = `images/obstacle_${this.obstacleType}.png`
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
    }

    getPosition() {
        return this.posX
    }

    getWidth() {
        return this.width
    }

    move() {
        this.posX -= this.speedX
    }
}