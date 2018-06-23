function Obstacle(game){
    this.game = game;
    this.imgBottom = new Image();
    this.imgBottom.src = "images/obstacle_bottom.png";
    this.imgTop = new Image();
    this.imgTop.src = "images/obstacle_top.png";

    //Physical properties 
    this.x = this.game.canvas.width;
    this.y = 0;
    this.dx = 7;
    this.width = 100;
    this.gap = 150;
    this.topEnds = 50+parseInt(Math.random()                   *(this.game.canvas.height)/20)*10;
    this.bottomStarts = this.topEnds + this.gap;
}

Obstacle.prototype.draw = function(){
    this.game.ctx.drawImage(this.imgTop, 
                            this.x,
                            this.y,
                            this.width,
                            this.topEnds);
     this.game.ctx.drawImage(this.imgBottom, 
                            this.x,
                            this.bottomStarts,
                            this.width,
                            this.game.canvas.height);
}

Obstacle.prototype.move = function() {
    this.x -= this.dx;
}