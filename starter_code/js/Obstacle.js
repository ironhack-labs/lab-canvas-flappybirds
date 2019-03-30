FB.Components.Obstacle = class Obstacle{
  constructor(){
    let start = FB.w + 50;
    let offset = 100;
    let width = 80;
    let minHeight = 100;

    this.top = {
      x: start,
      y: 0,
      height: FB.Helpers.randomIntFromInterval(minHeight, FB.h - offset - minHeight),
      width: width,
      img: FB.ImageManager.loadedImages.obstacle_top,
    };
    this.bottom = {
      x: start,
      width: width,
      img: FB.ImageManager.loadedImages.obstacle_bottom,
    };

    this.bottom.height = FB.h - offset - this.top.height;
    this.bottom.y = FB.h - this.bottom.height;

  }
  move(){
    this.top.x--;
    this.bottom.x--;
  }
  draw(){
    FB.ctx.drawImage(this.top.img.img, this.top.x, this.top.y, this.top.width, this.top.height);
    FB.ctx.drawImage(this.bottom.img.img, this.bottom.x, this.bottom.y, this.bottom.width, this.bottom.height);
  }
};