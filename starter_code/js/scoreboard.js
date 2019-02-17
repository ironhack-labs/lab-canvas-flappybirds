function ScoreBoard(game) {
    this.game = game
    this.score = 0
    this.x = (this.game.width / 2) - 10
    this.y = (this.game.height / 2) - 200
}
ScoreBoard.prototype.draw = function () {
    this.game.ctx.font = "40px montserrat";
    this.game.ctx.fillStyle = "white";
    this.game.ctx.fillText(this.score, this.x, this.y);
}
