FB.Components.Background = {
  img: null,
  move: function(){
    if(this.img.pos.x + FB.w <= 0){
      this.img.pos.x = 0;
    }
    this.img.pos.x--;
  },
  draw: function(){
    FB.ctx.drawImage(this.img.img, this.img.pos.x, this.img.pos.y, FB.w, FB.h);
    FB.ctx.drawImage(this.img.img, this.img.pos.x+FB.w, this.img.pos.y, FB.w, FB.h);
  },
  init: function(){
    this.img = FB.ImageManager.loadedImages.bg;
  },
}