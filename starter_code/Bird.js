class Bird {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img_bird = new Image();
    this.img_bird.src = './images/flappy.png'
  }
  update(ctx) {
    
  }
  create(ctx) {
    ctx.drawImage(this.img_bird, this.x, this.y, this.width, this.height)
  }
  moveUp() {
    this.y -= 10;
  }
  moveDown() {
    this.y += 10;
  }
  moveRight() {
    this.x += 10;
  }
  moveLeft() {
    this.x -= 10;
  }

  left() { return this.x }
  right() { return (this.x + this.width )}
  top() { return this.y }
  bottom() { return (this.y + this.height )}
}