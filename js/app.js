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

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.background = new Background(this.ctx, this.canvasSize)
        this.flappy = new Player(this.ctx, this.canvasSize)
        this.setListeners()
        this.render()
    },


    render() {
        const myInterval = setInterval(() => {
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
        }, 50)
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight,
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
        newTopObstacle.setObstacleDimensions()
        this.obstacles.push(newTopObstacle)
        const newBottomObstacle = new Obstacle(this.ctx, this.canvasSize, 'bottom', newTopObstacle.getHeight())
        newBottomObstacle.setObstacleDimensions()
        this.obstacles.push(newBottomObstacle)
    }

}