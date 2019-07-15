class PipeUp {
    constructor(ctx, w, h) {
        this._ctx = ctx
        this._pipeWidth = w
        this._pipeHeight = h

        this._img = new Image()
        this._img.src = "images/obstacle_top.png"

        this._posX = 300
        this._posY = 0
        this._velX = 10
    }

    drawPipeUp() {
        this._ctx.drawImage(this._img, this._posX, this._posY, this._pipeWidth, this._pipeHeight)
    }
    move() {
        this._posX -= this._velX
    }
}