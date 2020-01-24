class Tubes  {
    constructor(ctx, w, h){
        this._ctx = ctx
        this._gameWidth = w
        this._gameHeigth = h

        this._posX = this._gameWidth

        this._velX = 2

        this.bottomTube = {
            width : 50,
            bHeigth : undefined,
            image : new Image(),
        }

        this.topTube = {
            width : 50,
            tHeigth : undefined,
            image : new Image()
        }
        

    }

        setSrc(){
            this.bottomTube.image.src="images/obstacle_bottom.png"
            this.topTube.image.src="images/obstacle_top.png"
        }
        calculateHeigth(){
            this.topTube.tHeigth = Math.floor(Math.random()* (this._gameHeigth -220) + 220 )
            this.bottomTube.bHeigth = this._gameHeigth-120-this.topTube.tHeigth
        }

        generate(){
            this.calculateHeigth()
            this.setSrc()
        }

        draw(){
            this._ctx.drawImage(this.bottomTube.image,this._posX,this._gameHeigth-this.bottomTube.bHeigth,this.bottomTube.width,this.bottomTube.bHeigth)
            this._ctx.drawImage(this.topTube.image,this._posX,0,this.topTube.width,this.topTube.tHeigth)
        }

        move(){
            this._posX -= this._velX
        }
        
}