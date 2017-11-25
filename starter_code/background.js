function Background(canvasId, sprite) {
  // debugger
  this.canvas = canvasId;
  this.ctx = this.canvas.getContext('2d');
  this.sprite = new Image();
  this.sprite.src = sprite;
  this.sprite.isReady = false;
  this.sprite.onload = (function() {
    this.sprite.isReady = true;
  }).bind(this);
}

Background.prototype.isReady = function() {
  return this.sprite.isReady;
};

Background.prototype.draw = function() {
  // if (this.isReady()) {
    this.ctx.drawImage(
      this.sprite,
      0,
      0,
      900,
      500
    );
  // }
};
