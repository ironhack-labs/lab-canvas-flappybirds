class Obstacle {
    constructor(ctx, canvasSize, obstacleType, pairObstacleBorder) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.width = 50
        this.height = 300
        this.obstacleType = obstacleType
        this.imageInstance = new Image()
        this.posX = this.canvasSize.w
        this.posY = 0
        this.speedX = 5
        this.pairObstacleBorder = pairObstacleBorder
    }


    setObstaclePosition() {
        if (this.obstacleType === 'top') {
            this.posY = Math.floor(Math.random() * (-250))
        } else {
            this.posY = this.pairObstacleBorder + 150
        }
    }

    drawObstacle() {
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

    getLeftBorder() {
        return this.posX
    }

    getRightBorder() {
        return this.posX + this.width
    }
    getTopBorder() {
        if (this.obstacleType === 'bottom') {
            return this.posY
        }
        return 0
    }
    getBottomBorder() {
        if (this.obstacleType === 'top') {
            return this.posY + this.height
        }
        return this.canvasSize.h
    }
}