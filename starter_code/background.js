function Background (game){
  this.img = new Image();
  this.img.src = "images/bg.png";
  this.game = game;
  this.ctx = game.ctx;
  this.x = 0;
  this.dx = 6;
}

Background.prototype.draw = function (){
  this.ctx.drawImage(this.img, this.x, 0, canvas.width, canvas.height)
  this.ctx.drawImage(this.img, this.x + this.game.canvas.width, 0, canvas.width, canvas.height);
}

Background.prototype.move = function (){
  this.x -= this.dx;

  if (this.x < -this.game.canvas.width) this.x = 0
}