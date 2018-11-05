function Obstacles(ctx, x,y,pos){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = 7;
    this.img = new Image();
    this.arraySrc = ["images/obstacle_bottom.png", "images/obstacle_top.png"];
    this.position =pos;
}


Obstacles.prototype.draw = function (){
    if(this.position ===1){
        y_top = -450;
    }else{
        y_top = 400;
    }

 
    this.img.src = this.arraySrc[this.position];
    this.ctx.drawImage(this.img, this.x, y_top);

    
}

Obstacles.prototype.move = function(){
    this.x -= this.dx;

}

