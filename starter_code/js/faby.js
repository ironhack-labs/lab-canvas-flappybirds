function Faby(game) {
    this.game = game
    this.img = new Image()
    this.img.src = "images/flappy.png"
    this.x = this.game.canvas.width * 0.3
    this.y = this.game.canvas.height * 0.2
    this.width = 65
    this.height = 50
    this.gravity = 0.2
    this.gravitySpeed = 0
    this._listener();
}

Faby.prototype._listener = function () {
    document.onkeydown = function (e) {
        if (e.keyCode === this.game.keySpace) {
            this.y -= 5
            this.gravitySpeed -= 5
        }
    }.bind(this)
}

Faby.prototype.draw = function () {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}

Faby.prototype.move = function () {
    this.gravitySpeed += this.gravity
    this.y += this.gravitySpeed
}