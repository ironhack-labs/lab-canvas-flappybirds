var Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    scoreBoard: undefined,
    keys: {
        SPACE : 32
    },
    
    init: function (id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d")
        this.w = 450,
        this.h = window.innerHeight - 20,
        this.topH = undefined,
        this.gap = 125
        this.botH = undefined,
        this.setDimensions()
        this.start()
    },

    setDimensions: function () {
        this.canvas.setAttribute("width",this.w)
        this.canvas.setAttribute("height",this.h)
    },

    start: function () {
        this.reset()

        this.interval = setInterval(function () {
            this.clear()

            this.framesCounter++

            if (this.framesCounter > 1000) {
                this.framesCounter = 0;
            }

            if (this.framesCounter % 250 === 0) {
                this.getRandomHeight()
                this.generatePipe()
            }

            if (this.pipes.length > 0){     
                if (this.player.x > this.pipes[0].x + 100 && this.player.x < this.pipes[0].x + 102){
                    this.score++
                }
            }

            this.moveAll()
            this.drawAll()

            this.clearPipes()

            if (this.isCollision() || (this.player.y > this.h) || this.player.y + this.player.h < -25) {
                this.gameOver()
            }

        }.bind(this), 1000 / this.fps);
    },

    reset: function () {
        this.background = new Background(this)
        this.player = new Player(this)
        this.framesCounter = 0;
        this.pipes = [];
        this.scoreBoard = ScoreBoard
        this.score = 0;
    
    },

    stop: function () {
        clearInterval(this.interval);
    },

    getRandomHeight: function () {
        this.topH = Math.floor(Math.random() * ((this.h / 2 + 50) - 50)) + 50;
        this.botH = this.h - this.topH - this.gap
    },

    generatePipe: function () {
        this.pipes.push(new Pipe(this))
    },

    clearPipes: function () {
            this.pipes = this.pipes.filter(function (pipe) {
            return pipe.x >= -40
        })
    },

    isCollision: function () {
        if (this.pipes.length > 0){     
            return (this.player.x <= (this.pipes[0].x + this.pipes[0].w)) && (this.player.x + this.player.w >= this.pipes[0].x) && ((this.player.y <= this.topH) || (this.player.y + this.player.h >= (this.h - this.botH)))
        }
    },

    drawAll: function () {
        this.background.draw()
        this.player.draw()
        this.pipes.forEach(function (pipe) { pipe.draw() })
        this.drawScore();
    },

    moveAll: function () {
        this.background.move()
        this.player.move()
        this.pipes.forEach(function (pipe) { pipe.move() })

    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.w, this.canvas.h)
    },

    gameOver: function () {
        this.stop()
    
        if (confirm("GAME OVER. Play again?")) {
          this.reset()
          this.start()
        }
    },  

    drawScore: function () {
        this.scoreBoard.update(this)
    }
}