const game = {
    name: 'Flappy Bird',
    author: "David y Pedro",
    license: undefined,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    windowsSize: {
        width: 800,
        height: 600,
    },
    framesCounter: 0,
    objectsArray: [],

    init() {
        this.canvas = document.getElementById("Flappy");
        this.ctx = this.canvas.getContext("2d");
        this.setDimensions();
        this.setWindowsMove();
        this.start();

    },
    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter > 1000) this.framesCounter = 0;
            this.clearScreen()
            this.drawAll();
            this.moveALl();
            this.generateObstacles();
            this.collision()

        }, 1000 / 40)
    },
    reset() {
        this.background = new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, './images/bg.png')
        this.bird = new Bird(this.ctx, this.windowsSize.width, this.windowsSize.height)
        this.objectsArray = []
    },
    drawAll() {
        this.background.draw()
        this.bird.draw()
        this.objectsArray.forEach(obs => obs.draw())
    },
    moveALl() {
        this.background.move()
        this.bird.move()
        this.objectsArray.forEach(obs => obs.move())
    },
    generateObstacles() {
        if (this.framesCounter % 200 == 0) {
            this.objectsArray.push(new Obstacle(this.ctx, this.windowsSize.width, this.windowsSize.height))
        }

    },
    setDimensions() {
        this.canvas.width = this.windowsSize.width
        this.canvas.height = this.windowsSize.height
    },
    setWindowsMove() {
        window.onresize = () => this.setDimensions()
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.windowsSize.width, this.windowsSize.height)
    },

    collision() {

        this.objectsArray.forEach((elm) => {
            if (this.bird.posX + this.bird.birdWidth >= elm.posX &&
                this.bird.posY + this.bird.birdHeight >= elm.posY &&
                this.bird.posX <= elm.posX + elm.obsWidth &&
                this.bird.posY <= elm.posY + elm.obsHeight) {
                return this.gameOver()
            }
        })


    },
    gameOver() {
        console.log('hola cara colawww')
        clearInterval(this.interval)
        alert('Has perdido GAÑAN')
        this.clearScreen()
        this.objectsArray = []

    },
}