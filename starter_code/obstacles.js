class Obstacles {
    constructor(ctx, width, height) {
        this.ctx = ctx
        this.gameWidth = width
        this.gameHeight = height

        this.velX = 1
        this.width = 150
        this.height = 600

        this.posX=width
        this.posY=undefined

        this.imageTop = new Image()
        this.imageTop.src = "./images/obstacle_top.png"
        this.imageBottom = new Image()
        this.imageBottom.src = "./images/obstacle_bottom.png"

        this.spaceEmpty = 200


    }
    randomIzer() {
         this.posY=Math.random()*(-600)
    }

    draw() {
        //this.ctx.drawImage(this.imageTop, 0, 0, this.width, this.height)
        this.ctx.drawImage(this.imageTop,this.posX,this.posY ,this.width,this.height)
        this.ctx.drawImage(this.imageBottom, this.posX, this.posY + this.spaceEmpty + this.height, this.width, this.height)
    }

    move(){
        this.posX-=this.velX

    }
}