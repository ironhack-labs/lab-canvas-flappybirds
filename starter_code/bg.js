class Background {
    constructor (ctx, w, h) {
        this.ctx = ctx
        this._height = h
        this._width = w

        this.image = new Image()
        this.image.src = "images/bg.png"

        this.posX = 0
        this.posY = 0

        this.velX = 1 
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this._width, this._height)
        this.ctx.drawImage(this.image, this.posX + this._width, this.posY, this._width, this._height)
    }

    move () {
        this.posX -= this.velX

        this.posX <= -this._width ? this.posX = 0 : console.log("funciono")
    }
}