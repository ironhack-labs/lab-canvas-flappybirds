class Flappy {
    constructor(ctx, w, h) {
        this._ctx = ctx
        this._flappyWidth = w
        this._flappyHeight = h

        this._img = new Image()
        this._img.src = "images/flappy.png"

        this._posX = 200
        this._posY = 200

        this._gravity = 5
        this._gravitySpeed = 60

        //this._speedX = 10
        //this._speedY = 1
    }

    drawFlappy() {
        this._ctx.drawImage(this._img, this._posX, this._posY, this._flappyWidth, this._flappyHeight)
    }
    move() {
        this._posY += this._gravity
    }
    gravity() {
        this._posY -= this._gravitySpeed
    }
}

