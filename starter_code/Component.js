class Component {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img_top_obstable = new Image();
    this.img_top_obstable.src = './images/obstacle_top.png';

    this.img_btm_obstable = new Image();
    this.img_btm_obstable.src = './images/obstacle_bottom.png';
  }
  createTop(ctx) {
    // ctx.clearRect(0, 0, 700, 500)

    ctx.drawImage(this.img_top_obstable, this.x, this.y, this.width, this.height)
    // ctx.fill()
  }
  createBtm(ctx) {
    ctx.drawImage(this.img_btm_obstable, this.x, this.y, this.width, this.height)

  }
  update(ctx) {
    if (this.y === 0) {
      this.createBtm(ctx);
    } else {
      this.createTop(ctx);
    }
    
   
  }

  
  left() { return this.x }
  right() { return (this.x + this.width )}
  top() { return this.y }
  bottom() { return (this.y + this.height )}


}