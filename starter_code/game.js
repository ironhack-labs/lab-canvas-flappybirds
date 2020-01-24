const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    keySpace: 38,
    interval: undefined,
    background: undefined,
    player: undefined,
    tube : undefined,

    init(){
        this.canvas = document.getElementById('game-board')
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth / 1.5
        this.height = window.innerHeight - 280
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start()
    },
    start(){
        this.reset()
        this.interval = setInterval(() => {
            this.clear()
            this.drawall()
            this.moveall()
        },1000 / this.fps)
    },
    reset(){
        this.background = new Background(this.ctx, this.width,this.height)
        this.player = new Bird (this.ctx,this.canvas.width,this.canvas.height, this.keySpace)
        this.tube = new Tubes(this.ctx,this.width,this.height)
        this.tube.generate()
    },

    drawall(){
        this.background.draw()
        this.player.draw()
        this.tube.draw()
    },
    moveall(){
        this.background.move()
        this.player.move()
        this.tube.move()
    },
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    },
    gameover(){
        clearInterval(this.interval)
    }
}
