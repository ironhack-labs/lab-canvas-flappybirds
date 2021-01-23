class Player {
    constructor(ctx, canvasSize) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.width = 50
        this.height = 50
        this.speedX = 1
        this.speedY = 3
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
        this.speedY = 3
    }

    move() {
        if (this.gravity === 'negative') {
            this.posY += this.speedY
        } else {
            this.posY -= this.speedY
            this.speedY -= this.gravitySpeed
        }
    }

    setGravity(gravitySign) {
        this.resetSpeed()
        this.gravity = gravitySign
    }
}