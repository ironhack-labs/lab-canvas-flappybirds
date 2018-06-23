function Player(game){
    this.game = game
    this.img = new Image()
    this.img.src = "./images/flappy.png"
    this.w = 50
    this.h = 50
    this.x = 200
    this.y = 150
    this.g = 0.008
    this.vY = this.g


}

Player.prototype.move = function(){
    this.vY += this.g
    this.y+=this.vY
    /*if(this.y + this.height == this.game.canvas.height || this.y == 0){
        this.game.gameOver()
    }*/

}

Player.prototype.draw = function(){
    this.game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h)
}
