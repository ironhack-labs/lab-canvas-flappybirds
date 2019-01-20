function Background(game) {
    this.game = game
    this.ctx = game.ctx
    this.img = new Image()
    this.img.src = "images/bg.png"
    this.x = 0;
    this.velocity = 6;
}

Background.prototype.draw = function () {
    this.ctx.drawImage(this.img, this.x, 0)
    this.ctx.drawImage(this.img, this.x + this.game.canvas.width, 0)
}

Background.prototype.move = function () {
    this.x -= this.velocity
    if (this.x < -this.game.canvas.width) this.x = 0
}