class Background {
    constructor(ctx, canvasSize) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageInstance = new Image()
        this.imageInstance.src = `images/bg.png`
        this.posX = 0
        this.posY = 0
        this.vX = 10
    }

    drawBackground() {
        const bg1 = this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.canvasSize.w, this.canvasSize.h)
        const bg2 = this.ctx.drawImage(this.imageInstance, this.posX + this.canvasSize.w, 0, this.canvasSize.w, this.canvasSize.h)
    }

    moveBackground() {
        if (this.posX - this.vX < -this.canvasSize.w) {
            this.posX = 0
        } else {
            this.posX -= this.vX
        }
    }

}