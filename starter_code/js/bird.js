function Bird() {
    this.x = 120;
    this.y = 160;
    this.vy = 0;
    this.userPull = 0;
    this.image = new Image();
    this.image.src = "images/flappy.png";  
    this.scale = 498/351;
    this.gravity = 0.1;
};

Bird.prototype.render = function (ctx){
    if(this.y > 640){
        return;
    }
    ctx.drawImage(this.image, this.x, this.y, 40*this.scale,40)
}

Bird.prototype.pull = function(ctx){
    this.vy += (this.gravity - this.userPull);
    this.y += this.vy;
    if (this.y > 640 || this.y + this.vy < 0) {
        return;
    }
}

Bird.prototype.gameOver = function () {
    return true;
}