function Game(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.reset();
}

Game.prototype.startGame = function(delta) {
    this.clear();

    this.draw();
    this.moveAll(delta);

    this.checkCollisions();

    window.requestAnimationFrame(this.startGame.bind(this));
};

Game.prototype.reset = function() {
    this.background = new Background(this);
    this.bird = new Bird(this);
    this.obstacles = [];
    setInterval(this.createObstacles.bind(this), 1000);
}

Game.prototype.createObstacles = function() {
    var o = new Obstacle(this);
    this.obstacles.push(o);
    
    for(var i = 0; i < this.obstacles.length; i++){
        if(this.obstacles[i].x < -10){
            this.obstacles.splice(i, 1);
        }
    }
    console.log(this.obstacles);
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
    this.background.draw();
    this.bird.draw();
    this.drawObstacles();
}

Game.prototype.drawObstacles = function() {
    for(o of this.obstacles){
        o.draw();
    }
}

Game.prototype.moveObstacles = function() {
    for(o of this.obstacles){
        o.move();
    }
}

Game.prototype.checkCollisions = function() {
    for(o of this.obstacles){
        o.checkCollision(this.bird);
    }
}

Game.prototype.moveAll = function(delta) {
    this.background.move();
    this.bird.move(delta);
    this.moveObstacles();
}