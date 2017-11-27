function Background(canvasId, sprite, width) {
  // debugger
  this.canvas = canvasId;
  this.ctx = this.canvas.getContext('2d');
  this.sprite = new Image();
  this.sprite.src = sprite;
  this.x = 0;
  this.sprite.isReady = false;
  this.sprite.onload = (function() {
    this.sprite.isReady = true;
  }).bind(this);
  // debugger
  this.width = width;
}

Background.prototype.isReady = function() {
  return this.sprite.isReady;
};

Background.prototype.draw = function() {
  this.ctx.drawImage(
    this.sprite,
    this.x,
    0,
    900,
    500
  );
  this.ctx.drawImage(
    this.sprite,
    this.x + 900,
    0,
    900,
    500
  );
  this.x--;
  if (-this.x === this.width) {
    this.x = 0;
  }
};
