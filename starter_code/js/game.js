var App = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    score: undefined,
    keySpace: 32,
    framesCounter: undefined,
    obstacles: undefined,
    scorePoints: 0,
    init: function (canvadId) {
        this.canvas = document.getElementById(canvadId)
        this.ctx = this.canvas.getContext("2d")
        this.fps = 60

        this.reset()

        this.interval = setInterval(
            function () {
                this.clear()
                this.framesCounter++

                if (this.framesCounter > 1000) {
                    this.framesCounter = 0
                }
                if (this.framesCounter % 50 === 0) {
                    this.generateObstacle()
                }

                // this.score += 0.01 FIX SCORE
                this.moveAll()
                this.drawAll()
                this.addPoints()

                this.clearObstacles()
                if (this.isColision() || this.colision()) {
                    this.gameOver()
                }
            }.bind(this),
            1000 / this.fps
        )
    },
    stop: function () {
        clearInterval(this.interval)
    },
    gameOver: function () {
        this.stop()
        if (confirm(`
        GAME OVER
        Your score was: ${this.scorePoints} 
        Do you want to play again?`)) {
            this.reset()
            this.init("myGame")
        }
    },
    clearObstacles: function () {
        this.obstacles = this.obstacles.filter(function (obstacle) {
            return obstacle[0].x >= -20 && obstacle[1].x >= -20
        })
    },
    generateObstacle: function () {
        let pipeTop = new ObstacleTop(this)
        let pipeBot = new ObstacleBot(this)
        pipeTop.heigth = Math.floor(Math.random() * 300)
        pipeBot.y = pipeTop.heigth + 200
        pipeBot.heigth = 700 - pipeBot.y
        this.obstacles.push([pipeTop, pipeBot])
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    reset: function () {
        this.background = new Background(this)
        this.faby = new Faby(this)
        this.score = new Score(this)
        this.framesCounter = 0
        this.scorePoints = 0
        this.obstacles = []
    },
    drawAll: function () {
        this.background.draw()
        this.faby.draw()
        this.obstacles.forEach(function (obstacle) { 
            obstacle[0].draw() 
            obstacle[1].draw()
        })
        this.score.draw()
    },
    moveAll: function () {
        this.background.move()
        this.faby.move()
        this.obstacles.forEach(function (obstacle) { 
            obstacle[0].move() 
            obstacle[1].move()
        })
    },
    isColision: function () {
        if (this.faby.y >= this.canvas.height - this.faby.height || this.faby.y <= -9) {
            return true
        }
    },
    colision: function () {
        // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
        return this.obstacles.some(function (obstacle) {
            return (
                (this.faby.x + this.faby.width) > obstacle[0].x &&
                (obstacle[0].x + obstacle[0].width) > this.faby.x &&
                (this.faby.y + this.faby.height) > obstacle[0].y  &&
                (obstacle[0].y + obstacle[0].h) > this.faby.y
                )
        }.bind(this))
    },
    addPoints: function () {
        if(this.obstacles.length > 1){
            if(this.obstacles[0][0].x < this.faby.x)
            this.scorePoints++
        }
    }
}
