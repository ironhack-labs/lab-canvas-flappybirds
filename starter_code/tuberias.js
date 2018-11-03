function Tuberias(game) {
  this.game = game;
  this.ctx = this.game.ctx;
  this.imgUp = new Image ();
  this.imgUp.src = ("images/obstacle_top.png");
  this.imgDown = new Image();
  this.imgDown.src = ("images/obstacle_bottom.png");
  this.x= this.game.canvas.width;
  this.imgUpY = -600;
  this.imgDownY = 300;
  this.tubDx = 5;
}

Tuberias.prototype.move = function() {
  this.x -= this.tubDx;


}

Tuberias.prototype.draw = function() {
  this.ctx.drawImage(this.imgUp, this.x, this.imgUpY);
  this.ctx.drawImage(this.imgDown, this.x, this.imgDownY);
}