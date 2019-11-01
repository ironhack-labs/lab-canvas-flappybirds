const game = {
    canvas:undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    obstacles : [ ],
    score: undefined,
    keys: {
        SPACE: 32
    },
    
    init() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.startGame()

    },
    startGame() {
        this.reset()
        this.interval = setInterval(() => {
            // this.framesCounter++
            this.clear()
            this.drawAll()
            this.moveAll()
        }, 1000/this.fps)
    },
    reset (){
        this.background = new Background(this.ctx,this.width,this.height)
        this.player = new Player(this.ctx, 50, 50, this.canvas.height, this.keys)
    },
    clear (){

    },
    drawAll() {
       this.background.draw()
        this.player.draw()

    },
    moveAll() {
        this.player.move()
        this.background.move()
    },
    generateObstacles (){

    },
    clearObstacles(){

    },
    isCollision(){

    },
    gameOver() {

    },
 
    






}

