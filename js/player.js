class Player {
    constructor(ctx, canvasSize) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.width = 50
        this.height = 50
        this.speedX = 1
        this.speedY = 0
        this.gravity = 'negative'
        this.gravitySpeed = .5
        this.posX = this.canvasSize.w / 3
        this.posY = this.canvasSize.h / 2
        this.imageInstance = new Image()
        this.imageInstance.src = `images/flappy.png`
    }

    drawFlappy() {
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
    }

    resetSpeed() {
        this.speedY = -5
    }

    move() {
        if (this.gravity === 'positive') {
            this.resetSpeed()
        }
        this.posY += this.speedY
        this.speedY += this.gravitySpeed
    }

    setGravity(gravitySign) {
        this.gravity = gravitySign
    }

    getLeftBorder() {
        return this.posX
    }
    getRightBorder() {
        return this.posX + this.width
    }
    getTopBorder() {
        return this.posY
    }
    getBottomBorder() {
        return this.posY + this.height
    }
}