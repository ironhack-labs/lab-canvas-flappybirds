class Player {
    constructor(ctx, canvasSize) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.width = 50
        this.height = 50
        this.speedX = 10
        this.speedY = 10
        this.gravity = 'negative'
        this.gravitySpeed = 10
        this.posX = this.canvasSize.w / 3
        this.posY = this.canvasSize.h / 2
        this.imageInstance = new Image()
        this.imageInstance.src = `images/flappy.png`
    }

    drawFlappy() {
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
    }
}