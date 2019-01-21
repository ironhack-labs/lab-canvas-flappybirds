function Player(game) {
  this.game = game;
 
  this.x = this.game.canvas.width * 0.3;
  this.y = this.game.canvas.height * 0.5;
  
  this.img = new Image();
  this.img.src = 'images/flappy.png';
  
  // medidas de la imagen a representar en el canvas
  this.w = 60;
  this.h = 45;

  this.vy = 1;

  this.setListeners();
};

Player.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    0,
    0,
    500,
    350,
    this.x,
    this.y,
    this.w,
    this.h
  );
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === this.game.keys.SPACE) {
      this.y -= 10;
      this.vy -= 10;
    } 
  }.bind(this);
};

Player.prototype.move = function() {
   var gravity = 0.3;

    this.vy += gravity;
    this.y += this.vy;
};