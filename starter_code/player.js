function Player(game) {
  Player.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    ctx.drawImage(
      this.img,
      (-this.playerSize * this.ratio) / 2,
      -this.playerSize / 2,
      this.playerSize * this.ratio,
      this.playerSize
    );
    ctx.restore();
    this.x = x;
  this.y = y;
  this.angle = Math.PI;
  
  this.speed = 0;
  
  this.img = new Image();
  this.ratio = 900/490;
  this.playerSize = 50;
  this.img.src = "/starter_code/images/flappy.png"
}
  };


