class Obstacle {
    constructor(ctx, canvasSize, obstacleType, pairObstacleHeight) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.width = 50
        this.height = 80
        this.obstacleType = obstacleType
        this.imageInstance = new Image()
        this.posX = this.canvasSize.w - this.width
        this.posY = 0
        this.speedX = 5
        this.pairObstacleHeight = pairObstacleHeight
    }


    setObstacleDimensions() {
        if (this.obstacleType === 'top') {
            this.height = Math.floor(50 + Math.random() * (this.canvasSize.h - 250))
        } else {
            this.height = this.canvasSize.h - this.pairObstacleHeight - 150
        }
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
    getHeight() {
        return this.height
    }

    move() {
        this.posX -= this.speedX
    }
}