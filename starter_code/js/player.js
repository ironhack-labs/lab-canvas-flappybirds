function Player(game) {
  this.game = game

  this.width = 55
  this.height = 40
  
  this.speedX = 0
  this.speedY = 0

  this.gravity = 0
  this.gravitySpeed = 0

  this.x = this.game.width / 2 - this.width
  this.y = this.game.height / 2 - this.height

  this.img = new Image()
  this.img.src = 'images/flappy.png'

  this.setListeners()
}

Player.prototype.draw = function(){
  this.game.ctx.drawImage(this.img, this.x, this.y, 55, 40);
}

Player.prototype.move = function(){
  var gravity = 0.25

  this.speedY += gravity
  this.y += this.speedY
}

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === this.game.keys.SPACE && this.y >=0) {
      this.speedY -= 5
      this.y -= 5
    }
  }.bind(this)
}

Player.prototype.detectCollisionFloor = function() {
  if (this.y >= this.game.height - 70){
    return true
  }
  else{
    return false
  }
}


