function Background(game) {
    this.game = game;
  
    this.img = new Image();
    this.img.src = 'images/bg.png';
  
    this.x = 0;
    this.y = 0;
  
    this.dx = 5;
  }
  
  Background.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.w, this.game.h);
    this.game.ctx.drawImage(this.img, this.x + this.game.w, this.y, this.game.w, this.game.h);

  };
  
  Background.prototype.move = function() {
    this.x -= this.dx;
  
    if (this.x < -this.game.canvas.width) this.x = 0;
  };