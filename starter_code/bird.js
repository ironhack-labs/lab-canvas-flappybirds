

function Bird(ctx,x,y,speedx,speedy,gravity,gravitySpeed){
    this.x=x;
    this.y=y
    this.ctx = ctx;
    this.width = 50;
    this.height = 50;
    this.speedx = speedx;
    this.speedy = 0;
    this.gravity = 0.5;
    this.gravitySpeed = gravitySpeed;
    this.img = new Image();
    this.src = "images/flappy.png";
}

var prevTime = 0
Bird.prototype.update = function(){

    this.speedy -= this.gravity;
    this.y -= this.speedy;
   
}   

Bird.prototype.newPos = function(){

}

Bird.prototype.drawBird = function(){

    this.img.src = this.src;
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}