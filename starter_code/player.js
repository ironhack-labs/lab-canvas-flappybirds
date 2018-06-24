function Player(game) {
  this.game = game;
  this.x = 75;
  this.y = 300;
  this.gravity =10;
  this.vy = 0;
  this.img = new Image();
  this.img.src = 'images/flappy.png';
  this.w =60;
  this.h = 60;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode == SPACE ) {
      event.preventDefault();
      this.vy = 300;
    }
  }.bind(this)
  document.onkeyup = function(event) {
    if (event.keyCode == SPACE ) {
      event.preventDefault();
    }
  }.bind(this)
};



var prevTime = 0
Player.prototype.move = function(time) {
  var delta = time - prevTime;
  prevTime = time;

  this.vy -= this.gravity;
  this.y -= this.vy * delta/1000;
  console.log(this.y)
  if(this.y >700){
    //location.reload()
    this.game.gameOver()
  }
};

var SPACE = 32;