function Obstacle(game) {
  this.game = game;

  this.x = this.game.canvas.width;
  this.y = this.game.canvas.height - (Math.floor(Math.random() * (350 - 50) + 50));
  
  this.img = new Image();
  this.img.src = 'images/obstacle_bottom.png';
  
  // medidas de la imagen a representar en el canvas
  this.w = 140; 
  this.h = 400; 
  
  this.dx = 5;
};

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    0,
    0,
    140,
    790,
    this.x,
    this.y,
    this.w,
    this.h
  );
};

Obstacle.prototype.move = function() {
  this.x -= this.dx;
};