function Bird(game){
  this.game = game
  this.x = this.game.canvas.width / 6
  this.yIni = this.game.canvas.height / 2
  this.y = this.yIni

  this.img = new Image()
  this.img.src = 'images/flappy.png'
  this.imgWidth = 65
  this.imgHeight = 46

  this.velocity = 0
  this.acceleration = 0
  this.lift = 0

  this.setListeners()
}




Bird.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight)
}

Bird.prototype.move = function() {
  var gravity = 0.2
  if (this.y >= this.game.canvas.height - this.imgHeight) {
    this.game.gameOver()
  } else {
      this.velocity += gravity;
      this.y += this.velocity;
  }
}

Bird.prototype.setListeners = function() {
 
  document.onkeydown = function(event) {
    event.preventDefault()
    if(event.keyCode == 32){
      this.velocity = -5
    }
  }.bind(this)

  document.onkeyup = function(event) {
    event.preventDefault()
    if (event.keyCode == 32) {
      this.velocity = 0
    }
  }.bind(this)
}
