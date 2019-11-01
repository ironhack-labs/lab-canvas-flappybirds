const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    playerKeys: {
        ArrowUp: 38
    },
    score: 0,

    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth/2;
        this.height = window.innerHeight/2;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.start();
    },


    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;
            // this.clear();
            this.drawAll();
            this.moveAll();
            // this.clearObstacles()
            // if (this.framesCounter % 70 === 0) this.generateObstacles()
            // if (this.framesCounter % 100 === 0) this.score++;
            // if (this.isCollision()) this.gameOver()
            // if (this.framesCounter > 1000) this.framesCounter = 0;
        }, 1000 / this.fps) 

    // }
},

    reset(){
        this.background=new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 100, 70, "./images/flappy.png", this.height, this.playerKeys);
    },

    drawAll() {
        this.background.draw();
        this.player.draw()
    },

    moveAll(){
        this.background.move();
        this.player.move();
    }

}