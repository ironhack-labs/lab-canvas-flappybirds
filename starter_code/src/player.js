function Player (game) {

    this.game = game

    this.w = 40
    this.h = 40

    this.x = this.game.w / 2 - this.w / 2
    this.y = this.game.h / 2 - this.h / 2

    this.speedX = 1
    this.speedY = 0.5
    this.gravity = 0.2

    this.img = new Image ()
    this.img.src = "images/flappy.png"

    this.setListeners()

}

Player.prototype.draw = function () {
    this.game.ctx.drawImage (this.img, this.x, this.y, this.h, this.w)
}

Player.prototype.move = function () {
    this.speedY += this.gravity
    this.y += this.speedY
}

Player.prototype.setListeners = function () {
    document.onmousedown = function () {
        this.y -= 40
        this.speedY = 0.5
    }.bind(this)
    document.onkeydown = function(e) {
        if (event.keyCode === this.game.keys.SPACE) {
            this.y -= 40
            this.speedY = 0.5
        }
    }.bind(this)
}