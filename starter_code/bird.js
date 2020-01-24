class Bird{
    constructor(ctx,w,h,key){
        this.image = new Image()
        this.image.src = 'images/flappy.png'
        this._ctx = ctx
        this._gameW = w
        this._gameH = h
        this._key = key

        this._width = 100
        this._heigth = 70

        this._posY = this._gameH / 2
        this._posX = this._gameW / 3

        this._velY = 1
        
        this._key = key

        this.setListeners()
    }

    setListeners(){
        document.onkeydown = e => {
            if(e.keyCode === this._key){
                this._posY -= 20
                this._velY -= 5
                console.log("otra letra")
            }else{
                
            }
        }
    }

    draw(){
        this._ctx.drawImage(this.image, this._posX , this._posY, this._width, this._heigth)
    }

    move(){
        let gravity = 0.1;

        this._posY += this._velY;
        this._velY += gravity;
    }


}