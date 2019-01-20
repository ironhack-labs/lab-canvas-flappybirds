function Player(game) {
  this.game = game;
  this.x = this.game.canvas.width * 0.2;
  this.y = this.game.canvas.height * 0.8;
  this.img = new Image();
  this.img.src = "images/flappy.png";
  this.h = 60;
  this.w = (this.h * 498) / 351; // calculo el ancho en base a la altura y aspect ratio
  this.speedX = 20;
  this.speedY = 20;
  this.gravity = 4;
  this.gravitySpeed = 1;
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};

var SPACE = 32;
Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode == SPACE) {
      if (this.game.gameStart) {
        
        this.y -= 15;
        this.gravitySpeed -= 10;
      } else {
        // El juego no ha empezado
        this.game.startGame();
      }
    }
  }.bind(this);
};

Player.prototype.move = function() {
  var gravity = 0.4;

  this.gravitySpeed += gravity;
  this.y += this.gravitySpeed;
};


