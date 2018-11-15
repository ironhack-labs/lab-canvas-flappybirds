function Asteroid(canvas, width, height) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.asteroidSprite = new Image();
  this.asteroidSprite.src = 'images/asteroid.png';
  this.asteroidSprite.isReady = false;
  this.asteroidSprite.onload = (function() {
    this.asteroidSprite.isReady = true;
  }).bind(this);

  this.speed = Math.floor((Math.random() * 5) + 5);
  this.width = width;
  this.height = height;
  this.x = this.width + 50;
    this.y = Math.floor((Math.random() * 450) + 50);
}

Asteroid.prototype.obsPositionTop = function() {
return obstacleTopPosition = [this.x - 50,this.y, this.width, this.height]
}

Asteroid.prototype.draw = function() {
  this.ctx.save();
  this.ctx.drawImage(this.asteroidSprite, this.x - 50, this.y, (4 * 13.8), (4 * 13.8))
  this.x += this.speed;
  this.ctx.restore();
}

Asteroid.prototype.update = function() {
  this.draw();
}
