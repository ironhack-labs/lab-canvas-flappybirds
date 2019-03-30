FB.Components.Background = {
  ctx: null,
  w: null,
  h: null,
  w2: null,
  h2: null,
  img: null,
  move: function(){
    if(this.img.pos.x + this.w <= 0){
      this.img.pos.x = 0;
    }
    this.img.pos.x--;
  },
  draw: function(){
    this.ctx.drawImage(this.img.img, this.img.pos.x, this.img.pos.y, this.w, this.h);
    this.ctx.drawImage(this.img.img, this.img.pos.x+this.w, this.img.pos.y, this.w, this.h);
  },
  init: function(){
    this.ctx = FB.ctx;
    this.w = FB.w;
    this.h = FB.h;
    this.w2 = FB.w2;
    this.h2 = FB.h2;
    this.img = FB.ImageManager.loadedImages.bg;
  },
}