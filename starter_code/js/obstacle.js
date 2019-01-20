function Obstacle() {
    this.width = 200
    this.heigth = 0
    this.x = 1600
    this.velocity = 10
    this.y = 0
}

Obstacle.prototype.move = function() {
    this.x -= this.velocity;
    }

function ObstacleTop(game) {
    Obstacle.call(this, game)
    this.game = game
    this.ctx = game.ctx
    this.imgPTop = new Image()
    this.imgPTop.src = "images/obstacle_top.png"
}
ObstacleTop.prototype = Object.create(Obstacle.prototype)

ObstacleTop.prototype.draw = function () {
    for (let i = 0; i < game.obstacle.length; i++) {
        this.ctx.drawImage(
            imgPTop,
            game.obstacle[i][0].x,
            game.obstacle[i][0].y,
            game.obstacle[i][0].width,
            game.obstacle[i][0].heigth
        )
    }
}

function ObstacleBot(game) {
    Obstacle.call(this, game)
    this.game = game
    this.ctx = game.ctx
    this.imgPBot = new Image()
    this.imgPBot.src = "images/obstacle_bottom.png";
}
ObstacleBot.prototype = Object.create(Obstacle.prototype)

ObstacleBot.prototype.draw = function () {
    for (let i = 0; i < game.obstacle.length; i++) {
        this.ctx.drawImage(
            imgPTop,
            game.obstacle[i][1].x,
            game.obstacle[i][1].y,
            game.obstacle[i][1].width,
            game.obstacle[i][1].heigth
        )
    }
}