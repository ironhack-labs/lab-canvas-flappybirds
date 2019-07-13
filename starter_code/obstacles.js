class Obstacle {
    constructor(ctx, url, height, posY){
        this._canvas = undefined,
        this._ctx = ctx,
        this._width = 100,
        this._height = height
        this._image = new Image,
        this._image.src = url,
        this._posX = window.innerWidth,
        this._posY = posY,
        this._velX = 1
    }
    draw() {

        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height) 
    }
    move(){
        this._posX -= this._velX
    }
}