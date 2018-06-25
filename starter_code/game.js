
function Game(canvaId) {
    this.canvas = document.getElementById(canvaId);
    this.ctx = this.canvas.getContext('2d');
    this.fps = 60;
    this.reset();
}

Game.prototype.start = function () {
    this.interval = setInterval(function () {
        this.clear();

        this.framesCounter++;
        if (this.framesCounter > 1000) {
            this.framesCounter = 0;
        }

        if (this.framesCounter % 50 === 0) {
            this.generateObstacle();
        }

        this.score += 0.01;
        this.draw();
        this.moveAll();
        this.clearObstacles();

    }.bind(this), 1000 / this.fps);
};


Game.prototype.stop = function () {

};

Game.prototype.gameOver = function () {

};

Game.prototype.reset = function () {
    this.background = new Background(this);
    this.bird = new Bird(this);
    this.obstacles = [];
};

Game.prototype.isCollision = function () {

};

Game.prototype.clearObstacles = function () {

};

Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function () {
    this.background.draw();
    this.Bird.draw();
};

Game.prototype.moveAll = function () {
    this.background.move();
    this.Bird.move();


};

