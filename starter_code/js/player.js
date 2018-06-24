function Player(game) {
  this.game = game;
 
  this.x = 20;
  this.y0 = this.game.canvas.height * 0.5;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'images/flappy.png';

  this.speedX = 0;
  this.speedY = 0.03;

  this.gravity = 0.2;
  this.gravitySpeed = 0;

  this.update();
  this.newPos();

  this.setListeners();
}

Player.prototype.draw = function() {
  imageScale = 498/351;
  this.game.ctx.drawImage(this.img, this.x, this.y, 50*imageScale, 50);
}

Player.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    if (e.keyCode == 32) {
      this.y -= 1;
      this.speedY -= 4;
    }
  //document.onkeyup = function(e) {
  //  if (e.keyCode == 32) {
  //  }
  //}
  }.bind(this);
};

Player.prototype.update = function() {
  this.speedY += this.gravity;
  this.x += this.speedX;
  this.y += this.speedY;
}

Player.prototype.newPos = function() {
  this.x += this.speedX;
  this.y += this.speedY;
}


Player.prototype.move = function() {
  if (this.y >= this.game.canvas.height) {
    this.speedY = 0.05;
    this.y = this.y0;
  } else {
    this.speedY += this.gravity;
    this.y += this.speedY;
  }

};