var App = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    score: undefined,
    keySpace: 32,
    framesCounter: undefined,
    obstacle: [],
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
                // controlamos la velocidad de generación de obstáculos
                if (this.framesCounter % 10 === 0) {
                    this.generateObstacle()
                }
                // this.score += 0.01 FIX SCORE
                this.moveAll()
                this.drawAll()

                // this.clearObstacles()
                if (this.isColision()) {
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
        if (confirm("GAME OVER. Play again?")) {
            this.reset()
            this.init("myGame")
        }
    },
    //esto elimina los obstáculos del array que estén fuera de la pantalla
    /* clearObstacles: function () {
        this.obstacles = this.obstacles.filter(function (obstacle) {
            return obstacle.x >= 0
        })
    }, */
    generateObstacle: function () {
        let pipeTop = new ObstacleTop(this)
        let pipeBot = new ObstacleBot(this)
        pipeTop.heigth = Math.random() * 300 + 100
        pipeBot.posY = pipeTop.heigth + 200
        pipeBot.heigth = 700 - pipeBot.posY
        this.obstacle.push([pipeTop, pipeBot])
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    reset: function () {
        this.background = new Background(this)
        this.faby = new Faby(this)
        this.framesCounter = 0
        this.obstacles = []
    },
    drawAll: function () {
        this.background.draw()
        this.faby.draw()
        this.obstacles.forEach(function (obstacle) { obstacle.draw() })
    },
    moveAll: function () {
        this.background.move()
        this.faby.move()
        this.obstacles.forEach(function (obstacle) { obstacle.move() })
    },
    isColision: function () {
        if (this.faby.y >= this.canvas.height - this.faby.height || this.faby.y <= -9) {
            return true
        }
    }
        // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
        /*
        return this.obstacles.some(function (obstacle) {
            return (
                ((this.faby.x + this.faby.w) >= obstacle.xTop &&
                    this.faby.x < (obstacle.xTop + obstacle.wTop) &&
                    this.faby.y + (this.faby.h - 20) >= obstacle.y)
            )
        }.bind(this))
    }, */
}
