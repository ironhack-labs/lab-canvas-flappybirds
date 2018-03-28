function flappy(){
    this.y = canvas.height/2;
    this.x = 64;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 1;
    this.gravitySpeed = 0;
    this.img = new Image();
    this.img.src = "images/flappy.png"
};

flappy.prototype.draw = function(ctx){
    //cxt.drawImage(this.img, this.x, this.y);
}