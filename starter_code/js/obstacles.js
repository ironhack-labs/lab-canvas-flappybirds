function Obstacles (type) {
    this.x = 100;
    this.y = 0;
    this.image = new Image();
    this.image.src = 'images/obstacle_'+type+'.png';
    this.scale=138/793;
}

Obstacles.prototype.render = function (ctx){
    ctx.drawImage(this.image, this.x, this.y, 300*this.scale,300);
}