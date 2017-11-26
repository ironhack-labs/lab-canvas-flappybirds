function Pipe(canvasId, sprite) {
  this.canvas = canvasId;
  this.ctx = this.canvas.getContext('2d');
  this.sprite = new Image();
  this.sprite.src = sprite;
  this.sprite.isReady = false;
  this.sprite.scale = 0.7;
  this.sprite.onload = (function() {
    this.sprite.isReady = true;
    this.width = this.sprite.width * this.sprite.scale;
    this.height = this.sprite.height * this.sprite.scale;
  }).bind(this);
  this.x = 0;
  this.y=300;
}

Pipe.prototype.isReady = function() {
  return this.sprite.isReady;
};

Pipe.prototype.draw = function() {
  this.ctx.drawImage(
    this.sprite,
    this.x,
    this.y,
    this.width,
    this.height
  );
};
