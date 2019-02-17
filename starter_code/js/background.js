function Background(game) {
  this.game = game;

  this.img = new Image()
  this.img.src = "images/bg.png"

  this.ground = new Image()
  this.ground.src = "images/ground.png"

  this.x = 0
  this.y = 0

  this.groundX = 0
  this.groundY = 460

  this.scrollSpeed = 2
  this.groundScrollSpeed = 4
}

Background.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.width, this.game.height);
    this.game.ctx.drawImage(this.img, this.x + this.game.width, this.y, this.game.width, this.game.height);

    this.game.ctx.drawImage(this.ground, this.groundX, this.groundY, this.game.width, 200);
    this.game.ctx.drawImage(this.ground, this.groundX + this.game.width, this.groundY, this.game.width, 200);
};
  
Background.prototype.move = function() {
  this.x -= this.scrollSpeed
  if(this.x < -this.game.width){
    this.x = 0
  }
  this.groundX -= this.groundScrollSpeed
  if(this.groundX < -this.game.width){
    this.groundX = 0
  }
};
