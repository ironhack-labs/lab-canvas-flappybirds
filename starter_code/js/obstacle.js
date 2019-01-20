function Obstacle() {
    this.width = 100
    this.height = 0
    this.x = 700
    this.y = 0
    this.velocity = 10
}

Obstacle.prototype.move = function() {
    this.x -= this.velocity;
    }

function ObstacleTop(game) {
    Obstacle.call(this, game)
    this.game = game
    this.ctx = game.ctx
    this.img = new Image()
    this.img.src = "images/obstacle_top.png"
}
ObstacleTop.prototype = Object.create(Obstacle.prototype)

ObstacleTop.prototype.draw = function () {
    for (let i = 0; i < this.game.obstacles.length; i++) {
        this.ctx.drawImage(
            this.img,
            this.game.obstacles[i][0].x,
            this.game.obstacles[i][0].y,
            this.game.obstacles[i][0].width,
            this.game.obstacles[i][0].height
        )
    }
}

function ObstacleBot(game) {
    Obstacle.call(this, game)
    this.game = game
    this.ctx = game.ctx
    this.img = new Image()
    this.img.src = "images/obstacle_bottom.png";
}
ObstacleBot.prototype = Object.create(Obstacle.prototype)

ObstacleBot.prototype.draw = function () {
    for (let i = 0; i < this.game.obstacles.length; i++) {
        this.ctx.drawImage(
            this.img,
            this.game.obstacles[i][1].x,
            this.game.obstacles[i][1].y,
            this.game.obstacles[i][1].width,
            this.game.obstacles[i][1].height
        )
    }
}