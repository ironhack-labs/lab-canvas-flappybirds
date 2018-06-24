function Player(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = 'image/..flappy.png';
  this.w = 75;
  this.h = 75;
  this.sX = 0;
  this.sY = 0;
  this.g = 0;
  this.gS = 0;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage();
};

Player.prototype.setListeners = function() {
  
};