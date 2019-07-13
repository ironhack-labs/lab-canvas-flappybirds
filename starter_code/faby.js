class Faby {
    constructor(ctx, url,keys){
        this._canvas = undefined,
        this._ctx = ctx,
        this._width = 50,
        this._height = 50,
        this._image = new Image,
        this._image.src = url,
        this._posX = 200,
        this._posY = 300,
        this._keys = keys,
        this._velY = .2,
        this._fly = 50,
        this._gravity = .25,
        this.setListeners()
    }
    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height) 
    }
    goDown() {
        this._posY += this._velY
    }
    
    goUp() {
        this._fly += this._gravity
        this._posY -= this._fly
    }
    
    setListeners() {
        document.onkeydown = (e) => {
            if (e.keyCode === this._keys.SPACE) {
                this.goUp()
            }
        }
    }
}
