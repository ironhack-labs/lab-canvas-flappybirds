class Player {
  constructor(context, image, posX, posY, height, width) {
    this.context = context;
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.width = width;
    this.speedX = 5;
    this.speedY = 0;
    this.gravity = 0.5;
  }
  rotationDraw() {
    this.context.save();
    let angle = -1;
    if (this.speedY > 4) {
      angle = -1 + this.speedY / 4;
    }
    this.context.translate(this.posX, this.posY);
    this.context.rotate((Math.PI / 8) * angle);
    this.context.drawImage(this.image, 0, 0, this.width, this.height);
    this.context.restore();
  }
  draw() {
    this.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
  fall() {
    this.posY += this.speedY;
    this.speedY += this.gravity;
  }
  fly() {
    this.speedY = 0;
    this.speedY -= 8;
  }
  bottom() {
    return this.posY + this.height;
  }
  top() {
    return this.posY;
  }
  right() {
    return this.posX + this.width;
  }
  left() {
    return this.posX;
  }
}

class Obstacles extends Player {}
