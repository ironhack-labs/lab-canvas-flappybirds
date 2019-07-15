class Obstacles {

    constructor (ctx, gameWidth) {

    this.ctx = ctx;
    this.gameWidth = gameWidth;
    

    this.imgUp = new Image()
    this.imgDown = new Image()
    this.imgUp.src = "./images/obstacle_top.png"
    this.imgDown.src ="./images/obstacle_bottom.png"

    this.posX = this.gameWidth

}

draw () {
    
    this.ctx.drawImage(this.imgUp, this.posX, this.posY, this.width, this.height)
 
} 

move() {
    this.posX -= this.velX
}



}