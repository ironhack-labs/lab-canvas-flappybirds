class Obstacle {
  constructor(ctx, x, y, url){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = url;
  }

  update(){
    this.x -= 5;
  }
  
  draw() {
    this.ctx.drawImage(this.img,this.x,this.y,this.img.width,this.img.height);
  }
}
