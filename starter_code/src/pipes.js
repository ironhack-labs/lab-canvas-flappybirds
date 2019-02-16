function Pipe (game) {
    this.game = game

    this.w = 40

    this.gap = 400

    this.x = this.game.w + 20

    this.speedX = 3

    this.imgTop = new Image ()
    this.imgTop.src = "images/obstacle_top.png"

    this.imgBot = new Image ()
    this.imgBot.src = "images/obstacle_bottom.png"

}

Pipe.prototype.draw = function() {
    this.game.ctx.drawImage (this.imgTop, this.x, 0, this.w, this.game.topH)
    this.game.ctx.drawImage (this.imgBot, this.x, this.game.h - this.game.botH, this.w, this.game.botH)
}

Pipe.prototype.move = function() {
    this.x -= this.speedX
}
  