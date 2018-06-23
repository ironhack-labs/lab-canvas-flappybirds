function Player(game) {
  this.game = game
  this.x = this.game.canvas.width / 6
  this.yIni = this.game.canvas.height / 2
  this.y = this.yIni

  this.img = new Image()
  this.img.src = 'images/flappy.png'
  this.imgWidth = 65
  this.imgHeight = 46

  this.velocity = 1
  this.acceleration = 1.5

  this.setListeners()
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight)
}

Player.prototype.move = function() {
  var gravity = 0.4;

  if (this.y >= this.game.canvas.height - this.imgHeight) {
    this.velocity = 1;
    this.y = this.yIni;
  } else {
    this.velocity += gravity;
    this.y += this.velocity;
  }
}

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 32) {
      //Lift
    }
  }
}
