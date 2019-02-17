function Obstacle(game) {
  this.game = game

  this.width = 120

  this.x = this.game.width
  this.y = 0
  
  this.topObs = new Image()
  this.topObs.src = ("images/obstacle_top.png")

  this.topObsHeight = Math.floor(Math.random() * this.game.height / 2)


  this.bottomObs = new Image()
  this.bottomObs.src = ("images/obstacle_bottom.png")

  this.bottomObsDrawOrigin = this.topObsHeight + 160

  this.scrollSpeed = 4
}

Obstacle.prototype.draw = function(){
    this.game.ctx.drawImage (this.topObs, this.x, 0, this.width, this.topObsHeight)
    this.game.ctx.drawImage (this.bottomObs, this.x, this.bottomObsDrawOrigin, this.width, this.game.height-this.bottomObsDrawOrigin-55)
}

Obstacle.prototype.move = function(){
    this.x -= this.scrollSpeed
}