class Component {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  update(ctx) {
    // ctx.clearRect(0, 0, 700, 500)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
    // ctx.fill()
  }
  left() { return this.x }
  right() { return (this.x + this.width )}
  top() { return this.y }
  bottom() { return (this.y + this.height )}


}