const flappyGame = {
    name: 'Flappy App',
    description: '',
    author: 'Bárbara Díaz',
    version: '1.0.0',
    license: undefined,
    canvasDom: undefined,
    /** @type {CanvasRenderingContext2D} */
    ctx: undefined,
    canvasSize: undefined,
    background: undefined,
    flappy: undefined,
    obstacles: [],
    frames: 0,
    intervalID: undefined,

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.background = new Background(this.ctx, this.canvasSize)
        this.flappy = new Player(this.ctx, this.canvasSize)
        this.setListeners()
        this.background.imageInstance.onload = () => this.background.drawBackground()
        console.log(this.canvasSize.h)
    },


    render() {
        this.intervalID = setInterval(() => {
            this.clearScreen()
            this.background.drawBackground()
            this.background.moveBackground()
            this.flappy.drawFlappy()
            this.flappy.move()
            this.obstacles.forEach(elm => {
                elm.drawObstacle()
                elm.move()
            })
            this.obstacles = this.obstacles.filter((elm) => elm.getPosition() >= -elm.getWidth())
            this.frames++
                if (this.frames === 5000) {
                    this.frames = 0
                }
            if (!(this.frames % 100)) {
                this.createObstacle()
            }
            this.obstacles.forEach(elm => this.detectCollision(elm))
            this.detectWindowCollision()


        }, 50)
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth / 1.5,
            h: window.innerHeight / 1.5,
        }
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.w)
    },

    setListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                this.flappy.setGravity('positive')
            }
        })

        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space') {
                this.flappy.setGravity('negative')
            }
        })

    },

    createObstacle() {
        const newTopObstacle = new Obstacle(this.ctx, this.canvasSize, 'top', 0)
        newTopObstacle.setObstaclePosition()
        this.obstacles.push(newTopObstacle)
        const newBottomObstacle = new Obstacle(this.ctx, this.canvasSize, 'bottom', newTopObstacle.getBottomBorder())
        newBottomObstacle.setObstaclePosition()
        this.obstacles.push(newBottomObstacle)
    },

    detectCollision(obstacle) {
        if (this.flappy.getRightBorder() >= obstacle.getLeftBorder() && this.flappy.getLeftBorder() <= obstacle.getRightBorder() &&
            this.flappy.getTopBorder() <= obstacle.getBottomBorder() && this.flappy.getBottomBorder() >= obstacle.getTopBorder()) {
            this.endGame()
        }
    },

    detectWindowCollision() {
        if (this.flappy.getBottomBorder() >= this.canvasSize.h || this.flappy.getTopBorder() <= 0) {
            this.endGame()
        }
    },

    endGame() {
        clearInterval(this.intervalID)
        this.resetGame()
    },

    resetGame() {
        this.flappy = undefined
        this.obstacles = []
        this.frames = 0
        this.intervalID = undefined
        console.log(document.getElementById("start-button"))
        document.getElementById("start-button").removeAttribute('disabled')
        this.init('my-canvas')
    }

}