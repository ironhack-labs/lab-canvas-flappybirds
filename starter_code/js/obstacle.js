function Obstacle(game) {
    this.game = game
    this.ctx = this.game.ctx
    this.imgTop = new Image()
    this.imgTop.src = "images/obstacle_top.png"
    this.wTop = 15
    this.hTop = this.w * 3
    this.dxTop = 10
    this.xTop = this.game.canvas.width
    this.yTop = this.game.player.y0 + this.game.player.h - this.h - 5
    this.imgBottom = new Image()
    this.imgBottom.src = "images/obstacle_bottom.png"
    this.wBottom = 15
    this.hBottom = this.w * 3
    this.dxBottom = 10
    this.xBottom = this.game.canvas.width
    this.yBottom = this.game.player.y0 + this.game.player.h - this.h - 5
}

Obstacle.prototype.draw = function () {
    this.ctx.drawImage(this.imgTop, this.xTop, 0)
    this.ctx.drawImage(this.imgTop, this.xTop + this.game.canvas.width, 0)
}

Obstacle.prototype.move = function () {
    this.xTop -= this.dxTop
}
