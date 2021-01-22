class Background {
    constructor(ctx, canvasSize) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageInstance = new Image()
        this.imageInstance.src = `images/bg.png`
    }

    drawBackground() {
        this.ctx.drawImage(this.imageInstance, 0, 0, this.canvasSize.w, this.canvasSize.h)
    }
}