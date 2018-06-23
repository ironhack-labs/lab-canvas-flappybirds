function Obstacle(game, yTop) {
  this.game = game
  this.x = this.game.canvas.width
  this.yTop = yTop
  this.yBottom = yTop + 170
  this.velocity = 3

  this.imgTop = new Image()
  this.imgBottom = new Image()
  this.imgTop.src = 'images/obstacle_top.png'
  this.imgBottom.src = 'images/obstacle_bottom.png'
  this.imgWidth = 50
  this.imgHeight = 287
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.imgTop, this.x, this.yTop - this.imgHeight, this.imgWidth, this.imgHeight)
  this.game.ctx.drawImage(this.imgBottom, this.x, this.yBottom, this.imgWidth, this.imgHeight)
}

Obstacle.prototype.move = function() {
  this.x -= this.velocity
}
