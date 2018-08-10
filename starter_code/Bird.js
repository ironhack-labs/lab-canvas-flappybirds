class Bird {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  update(ctx) {
    
  }
  create(ctx) {
    const img_bird = new Image();
    img_bird.onload = () => {
      ctx.drawImage(img_bird, this.x, this.y, this.width, this.height)
    }
    img_bird.src = './images/flappy.png'
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

}