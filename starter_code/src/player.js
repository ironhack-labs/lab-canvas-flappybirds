function Player(game) {
  this.game = game;
  this.playerSize = 50;
  this.x = 20;
  this.y = this.game.canvas.height / 2 - this.playerSize / 2;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.1;
  this.userPull = 0;

  this.ratio = 498 / 351;
  this.image = new Image();
  this.image.src = "images/flappy.png";

  this.width = this.playerSize * this.ratio;
  this.height = this.playerSize;

  this.limitX_left = 10;
  this.limitX_right = this.game.canvas.width - this.width - 10;
  this.limitY_bottom = this.game.canvas.height - this.height - 10;
  this.limitY_up = 10;

  this.events();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.image,
    this.x,
    this.y,
    this.width,
    this.height
  );
};

Player.prototype.move = function() {
  this.moveY();
  this.moveX();
};

Player.prototype.moveY = function() {
  this.speedY += (this.gravity - this.userPull);
  this.y += this.speedY;

  if (this.y > this.limitY_bottom) {
    this.y = this.limitY_bottom;
    this.speedY = 0;
  } else if (this.y < this.limitY_up) {
    this.y = this.limitY_up;
    this.speedY = 0;
  }
}

Player.prototype.moveX = function() {
  this.x += this.speedX;

  if (this.x > this.limitX_right) {
    this.x = this.limitX_right;
  } else if (this.x < this.limitX_left) {
    this.x = this.limitX_left;
  }
}

Player.prototype.events = function() {
  document.onkeydown = function(e) {
    switch(e.keyCode) {
      case 32: // Space
        this.userPull = 0.3;
        break;
      case 37: // Arrow left
        this.speedX = -1;
        break;
      case 39: // Arrow right
        this.speedX = 1;
        break;
    }
  }.bind(this);

  document.onkeyup = function(e) {
    switch(e.keyCode) {
      case 32: // Space
        this.userPull = 0;
        break;
      case 37: // Arrow left
      case 39: // Arrow right
        this.speedX = 0;
        break;
    }
  }.bind(this);
};
