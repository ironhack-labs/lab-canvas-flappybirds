

function Flappy(game, x,y) {
  this.game = game;
  this.x = x;
  this.y0 = this.game.canvas.height/2;
  this.y = this.y0;
  this.vy= 5;
  this.jump = 0;
  this.img = new Image();
  this.img.src ='./images/flappy.png';
  this.gravity = 0.25;
  this.setListeners();
}
Flappy.prototype.draw = function(){
  this.game.ctx.drawImage(this.img, this.x,this.y, 50, 50);
};

Flappy.prototype.move = function(){
  this.vy += this.gravity;
  this.y += this.vy;
  // Limits in Y axis for this.game.canvas
  if((this.y+this.vy) >= this.game.canvas.height || (this.y+this.vy) <= 0){
    this.vy *= -0.8;
  }
  if(this.y >= this.game.canvas.height){
    this.y = this.game.canvas.height;
  }
};

Flappy.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    if(e.keyCode == 32){
      this.vy = -5;
    }
  }.bind(this);
};
