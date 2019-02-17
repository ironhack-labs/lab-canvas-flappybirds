var Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    scoreBoard: undefined,
    keys: {
        TOP_KEY: 38,
        SPACE: 32
    },


    init: function(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.w = window.innerWidth
        this.h = window.innerHeight
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.start()
        console.log("YEAAAAAA")

    },

    start: function() {
        this.reset()
        this.interval = setInterval(function() {
            this.clear()
            this.framesCounter++
                if (this.framesCounter > 1000)
                    this.framesCounter = 0
            this.paintAll()
        }.bind(this), 1000 / this.fps)
    },
    reset: function() {
        this.background = new Background(this)
        this.player = new Player(this)
        this.framesCounter = 0
    },
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    paintAll: function() {
        this.background.paint()
        this.player.paint()
    }

}