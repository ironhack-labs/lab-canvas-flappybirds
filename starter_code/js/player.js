function Player(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = "./images/flappy.png";
  
  this.x = this.game.canvas.width * 0.08;
  this.y0 = this.game.canvas.height * 0.8;
  this.y = this.y0;

  this.w = 50;
  this.h = 50;

  this.sX = 0;
  this.sY = 0;

  this.g = 0;
  this.gS = 0;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0, Math.floor(this.img.width / this.img.frames), this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
)
};

Player.prototype.setListeners = function () {
  document.onkeydown = function (event) {
      event.preventDefault();
      if (event.keyCode === SPACE && this.y == this.y0) {
          this.y -= 5;
          this.vy -= 10;
      }
  }.bind(this);
};

Player.prototype.animateImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};

Player.prototype.move = function() {
  var gravity = 0.4;

  if (this.y >= this.y0) {
    this.vy = 1;
    this.y = this.y0;
  } else {
    this.vy += gravity;
    this.y += this.vy;
  }
};

var SPACE = 32;