function Canvas (canvas){
this.canvas = document.getElementById(canvas);
this.ctx = this.canvas.getContext("2d");
this.width = this.canvas.width;
this.height = this.canvas.height;
this.x = 0;
this.y = 0;
this.dx = 2;
this.img = new Image();
this.img.src = "./images/bg.png";
}

Canvas.prototype.init = function(){
    var faby = new Faby(this.canvas,this.ctx,100,this.height/2)
    setInterval(function(){
        this.drawBackground();
        this.backgroundMove();
        faby.drawFaby();
        faby.update();
    }.bind(this),1000/60);
};

Canvas.prototype.drawBackground = function(){
    this.ctx.drawImage(this.img, this.x,this.y,this.width,this.height)
    this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
};

Canvas.prototype.backgroundMove = function(){
    this.x -= this.dx;
    if (this.x < -this.width) this.x = 0;
}