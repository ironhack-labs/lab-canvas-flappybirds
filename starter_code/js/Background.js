function Background() {
  this.image = new Image();
  this.image.src = "./images/bg.png";

  this.xPos = 0;
  this.scrollingSpeed = 1;
}

Background.prototype.drawBackground = function() {
  this.xPos--;

  ctx.drawImage(this.image, this.xPos, 0);
  ctx.drawImage(this.image, this.xPos + 900, 0);
  if (this.xPos === -900) {
    this.xPos = 0;
  }
};
