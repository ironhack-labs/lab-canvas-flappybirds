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

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.background = new Background(this.ctx, this.canvasSize)
        this.flappy = new Player(this.ctx, this.canvasSize)
        this.render()
    },

    render() {
        const myInterval = setInterval(() => {
            this.clearScreen()
            this.background.drawBackground()
            this.background.moveBackground()
            this.flappy.drawFlappy()
            this.flappy.move()
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
    }

}