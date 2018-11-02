function Faby (canvas,ctx,x,y){
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speedX = 20;
    this.speedY = 30;
    this.gravity = 0.5;
    this.gravitySpeed = 0.1
    this.img = new Image();
    this.img.src = "./images/flappy.png";
}
var SPACE = 32;
Faby.prototype.update = function(){
    this.newPos();
}
Faby.prototype.newPos = function() {
    document.onkeydown = function(e) {
     e.preventDefault();
     if(e.keyCode === SPACE){
       this.y -= this.speedY;
       this.gravity = 0.5;
     }
      }.bind(this);
      this.gravity += this.gravitySpeed;
      this.y += this.gravity;
}

Faby.prototype.drawFaby = function(){
    this.ctx.drawImage(this.img, this.x, this.y, this.width,this.height)
}