function Obstacle(game){
    this.game = game

    this.x = 1000;
    this.sX = 5;
    
    this.calculateSizes();
    this.width = 60;

    this.topImg = new Image();
    this.topImg.src = "images/obstacle_top.png";

    this.bottomImg = new Image();
    this.bottomImg.src = "images/obstacle_bottom.png";
}

Obstacle.prototype.draw = function() {
    this.yTop = 0;
    this.yBottom = this.game.canvas.height - this.downHeight;

    this.game.ctx.drawImage(this.topImg, this.x, this.yTop, this.width, this.upHeight);
    this.game.ctx.drawImage(this.bottomImg, this.x, this.yBottom, this.width, this.downHeight);
}

Obstacle.prototype.calculateSizes = function() {
    var birdHeight = 200;
    this.maxHeight = this.game.canvas.height - birdHeight;

    this.upHeight = Math.floor(Math.random() * ((this.maxHeight-100) - 100)) + 100;
    this.downHeight = this.maxHeight - this.upHeight;
}

Obstacle.prototype.move = function() {
    this.x -= this.sX;
}

Obstacle.prototype.checkCollision = function(bird) {
    var bWidth = bird.width;
    var bHeight = bird.height;

    if(this.x < bird.x + bWidth && this.x + this.width > bird.x){
        if(this.yTop < bird.y + bHeight && this.yTop + this.upHeight > bird.y){
            window.location.reload();
        } else if (this.yBottom < bird.y + bHeight && this.yBottom + this.downHeight > bird.y){
            window.location.reload();
        }
    }
}