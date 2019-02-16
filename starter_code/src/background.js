function Background (game) {
    
    this.game = game

    this.x = 0
    this.y = 0
    this.speedX = 3
    
    this.img = new Image();
    this.img.src = 'images/bg.png'

}

Background.prototype.draw = function () {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.w, this.game.h)
    this.game.ctx.drawImage(this.img, this.x + this.game.w, this.y, this.game.w, this.game.h)  
}

Background.prototype.move = function () {
    this.x -= this.speedX
    if (this.x <= - this.game.w){
        this.x = 0
    }
}