function Player(game) {
  this.game = game;
  this.x = this.game.canvas.width * 0.1;
  this.y = this.game.canvas.height * 0.5;
  this.speedY = 2;
  this.gravity = 0.08;
  this.push = 0;
  this.img = new Image();
  this.img.src = './img/flappy.png';
  this.width = game.canvas.width * 0.08;
  this.height = game.canvas.height * 0.11;
  this.bullets = [];
  this.setListeners();
  this.w = this.width;
  this.h = this.height;
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x , this.y, this.width, this.height);
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 32) {
      this.push = 0.35;
    }
  }.bind(this);
  document.onkeyup = function(e) {
    if (e.keyCode == 32) {
      this.push = 0;
    }
  }.bind(this);
};

Player.prototype.move = function() {
  this.speedY += this.gravity - this.push;
  this.y += this.speedY;
  if((this.y + this.speedY) >= canvas.height - 40) {  // || -(this.y) >= canvas.height -400)
     
    }
};