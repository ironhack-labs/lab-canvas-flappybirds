class Flappy{
  constructor(x ,y){
    this.flappyImg = new Image;
    this.flappyImg.src = "./images/flappy.png";
    this.x = x - 50;
    this.y = y;
  }
  fly(){
    this.y = this.y - 5;
  }
  fall(){
    this.y = this.y + 5
  }
  jump(){
    var original = this.y;
    this.y = this.y - 50;
    return original;
  }
  putOn(directY){
    this.y = directY;
  }
  draw(ctx){
    ctx.drawImage(this.flappyImg, this.x , this.y, 50, 50);
  }
}