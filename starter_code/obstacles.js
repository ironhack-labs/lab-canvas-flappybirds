class Obstacles {
    constructor(ctx,canvasw) {
        this._ctx= ctx;
        this._width=100;
        this._height= 500;
        this._vel=1;
        this._imgUp= new Image();
        this._imgDown=new Image();
        this._imgUp.src = "./images/obstacle_top.png";
        this._imgDown.src = "./images/obstacle_bottom.png";
        this._posX = 400;
        this._posYUp =-300;
        this._posYDown = 350;
    }

    draw() {
        

        this._ctx.drawImage (this._imgUp,this._posX, this._posYUp, this._width, this._height)
        this._ctx.drawImage (this._imgDown,this._posX, this._posYDown, this._width, this._height)
        this.move();
    }

    move(){
        this._posX -= this._vel;
    }
}