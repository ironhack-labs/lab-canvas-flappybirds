function Score(game) {
    this.game = game
    this.ctx = game.ctx
    this.y = 40
    this.x = 20;
}

Score.prototype.draw = function () {
    this.ctx.font = '30px serif';
    this.ctx.fillStyle = "#fff"
    this.ctx.fillText("Score: " + this.game.scorePoints, this.x, this.y)
}