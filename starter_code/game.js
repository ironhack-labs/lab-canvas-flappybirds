const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    obstacles: [],
    score: 0,

    init: function () {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98 - 110
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start()
    },


    start: function () {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++
            this.scoreboard = ScoreBoard
            this.scoreboard.init(this.ctx)
            if (this.framesCounter > 1000) this.framesCounter = 0
            if (this.framesCounter % 100 == 0) this.score++
            this.drawAll()
            this.moveAll()
            this.generateObstacles()
            this.clearObstacles()
            this.isCollision()
        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height)
        this.faby = new Faby(this.ctx, this.canvas.width, this.canvas.height)
        this.obstacles = []
        this.score = 0
    },

    drawAll: function () {
        this.background.draw()
        this.faby.draw()
        this.obstacles.forEach(obs => obs.draw())
        this.drawScore()

    },


    moveAll: function () {
        this.background.move()
        this.faby.move()
        this.obstacles.forEach(obs => obs.move())
    },

    generateObstacles: function () {
        if (this.framesCounter % 70 == 0) {
            this.obstacles.push(new Obstacles(this.ctx, this.w, this.h, this.canvas.height))
        }
    },

    clearObstacles: function () {
        this.obstacles.forEach((obs, idx) => {
            if (obs.posX < -200) {
                this.obstacles.splice(idx, 1)
            }
        })
    },

    drawScore: function () {
        this.scoreboard.update(this.score)

    },

    isCollision: function () {
        //Aquí me he hecho un lío y lo he dejado
        this.obstacles.some(obs => {
            console.log(obs.posYBot)
            if ((this.faby.posX + this.faby.width >= obs.posX
                && this.faby.posY + this.faby.height >= (obs.posYTop + this.faby.height)
                && this.faby.posX <= obs.posX + obs.width) || (this.faby.posX + this.faby.width >= obs.posX
                    && this.faby.posY + this.faby.height >= (obs.posYBot - this.faby.height)
                    && this.faby.posX <= obs.posX + obs.width)) {

                this.gameOver()
            }

        })

    },

    gameOver: function () {
        clearInterval(this.interval)
    }

}