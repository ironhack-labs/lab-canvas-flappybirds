const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 25,
    framesCounter: 0,
    score: 0,
    obstacles: [],
    obstaclesBottom: [],


    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, 30, this.height / 2, this.height + 20)

        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight / 1.6;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },
    start() {
        this.interval = setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.framesCounter++;
            this.generateObstacles()
            this.clearObstacles()
            this.isCollision()
            this.drawAll()
            this.moveAll()
        }, 1000 / this.FPS)
    },
    drawAll() {
        this.background.draw()
        this.player.draw()
        this.obstacles.forEach(obs => obs.draw())
        this.obstaclesBottom.forEach(obs => obs.draw())
    },
    moveAll() {
        this.background.move()
        this.player.move()
        this.obstacles.forEach(obs => obs.move())
        this.obstaclesBottom.forEach(obs => obs.move())
    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },
    generateObstacles() {
        if (this.framesCounter % 90 === 0) {
            this.obstacles.push(new Obstacle(this.ctx, this.width))
            this.obstaclesBottom.push(new ObstacleBot(this.ctx, this.width))
        }
    },
    clearObstacles() {
        this.obstacles = this.obstacles.filter(obs => obs.posX >= 0);
        this.obstaclesBottom = this.obstaclesBottom.filter(obs => obs.posX >= 0)
    },
    isCollision() {
        this.obstacles.forEach(obs => {
            if (obs.posY + obs.height > this.player.posY && obs.posY < this.player.posY + this.player.height && obs.posX + obs.width > this.player.posX && obs.posX < this.player.posX + this.player.width) {
                clearInterval(this.interval)
            }
        })
    }
    //     console.log("aaa")
    //     return this.obstacles.some(obs => {
    //         return (
    //             this.player.posX + this.player.width >= obs.posX &&
    //             this.player.posY + this.player.height >= obs.posY &&
    //             this.player.posX <= obs.posX + obs.width

    //         );
    //     });
    // },
}