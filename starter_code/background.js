function Background(ctx) {
    this.ctx=ctx;

    this.img = new Image();
    this.img.src = "./images/bg.png";

    this.x=0;
    this.y=0;
}

Background.prototype.draw = function(){
    this.ctx.drawImage(this.img,this.x,this.y);
}