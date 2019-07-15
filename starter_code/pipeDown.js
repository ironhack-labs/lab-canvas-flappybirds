class PipeDown {
    constructor(ctx, w, h, g) {
        this._ctx = ctx
        this._pipeWidth = w
        this._pipeHeight = h
        this.gameHeight = g

        this._img = new Image()
        this._img.src = "images/obstacle_bottom.png"

        this._posX = 300
        this._posY = this.gameHeight
    }

    drawPipeDown() {
        this._ctx.drawImage(this._img, this._posX, this._posY, this._pipeWidth, this._pipeHeight)
    }
}
