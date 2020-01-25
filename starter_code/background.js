class Background {
    constructor(ctx,width,height){
        this._ctx= ctx,
        this._width=width,
        this._height=height,
        this._image=new Image()
        this._image.src="./images/bg.png"

        this._posX=0,
        this._posY=0,
        this._vel=1

    }

    draw(){
        this._ctx.drawImage(this._image,this._posX,this._posY,this._width,this._height);
        this._ctx.drawImage(this._image,this._posX + this._width,this._posY,this._width,this._height);
        this.move();
    }

    move() {
        this._posX -= this._vel
        if(this._posX<=-this._width){
            this._posX=0
        }
    }
}