FB.Components.Player = class Player{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 25;
    this.gravity = 1;
    this.img = FB.ImageManager.loadedImages.flappy;
    this.angle = 0;
  }
  fly(){
    this.angle -= 7;
    this.y -= 7;
  }
  move(){
    let key = FB.Events.SPACE_BAR;

    if(key.status){
      this.fly();
    }

    this.y += 2;
    this.angle += 2;

    if(this.angle >= 90){
      this.angle = 90;
    }
    if(this.angle <= -90){
      this.angle = -90;
    }
  }
  draw(){
    FB.ctx.save();
    FB.ctx.translate(this.x, this.y);
    FB.ctx.rotate(FB.Helpers.toRadians(this.angle));
    FB.ctx.drawImage(this.img.img, 0, 0, this.width, this.height);
    FB.ctx.restore();
  }
};