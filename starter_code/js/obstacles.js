function Obstacle(game){
  this.game = game
  this.x = 700
  this.y =  0
  this.img = undefined
  this.w = 0
  this.h = 0
}

function ObsTop(game){
  Obstacle.call(this)
  this.game = game
  this.y = game.obstacleInterval - this.h * -1
  this.img = new Image()
  this.img.src = "images/obstacle_top.png"
  this.w = this.img.width
  this.h = this.img.height
}
ObsTop.prototype = Object.create(Obstacle.prototype);


function ObsBottom(game){
  Obstacle.call(this)
  this.game = game
  this.y = game.obstacleInterval + 200
  this.img = new Image()
  this.img.src = "images/obstacle_bottom.png"
  this.w = this.img.width
  this.h = this.img.height
}
ObsBottom.prototype = Object.create(Obstacle.prototype);


Obstacle.prototype.draw = function(obstacle){
  console.log(this.y)
  this.game.ctx.drawImage(
    this.img, 
    this.x, 
    this.y, 
    this.w, 
    this.h)
}

Obstacle.prototype.move = function(obstacle){
  this.y--
}



