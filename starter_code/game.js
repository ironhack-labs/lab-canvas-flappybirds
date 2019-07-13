const Game = {
    canvas: undefined,
    ctx: undefined,
    winW: undefined,
    winH: undefined,
    keys: {
        SPACE: 32
    },
    obstaclesBottom: [],
    obstaclesTop: [],
    framesCounter: 0,
    fps: 60,
    score: 0,
    init: function() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.winW = window.innerWidth
        this.winH = window.innerHeight
        this.canvas.width = this.winW
        this.canvas.height = this.winH
        this.components()
    },
    start: function() {
        this.scoreboard = ScoreBoard
        this.scoreboard.init(this.ctx)
        this.interval = setInterval(() =>{
            this.framesCounter++
            if(this.framesCounter > 10000){
                this.framesCounter = 0
            }
            if (this.framesCounter%1000 == 0){
                this.generateObstacles()
            }
            if(this.framesCounter%100==0) this.score++
            this.clearAll()
            this.drawAll()
            this.moveAll()
            this.clearObstacles()
            this.gameOver()
        },1000/this.fps)
    },
    components: function(){
        this.background = new Background(this.ctx, "images/bg.png")
        this.faby = new Faby(this.ctx, "images/flappy.png", this.keys)
    },
    clearAll: function(){
        this.ctx.clearRect(0, 0, this.winW, this.winH);
    },
    
    drawAll: function() {
        this.background.draw()
        this.faby.draw()
        this.obstaclesBottom.forEach((obs)=>obs.draw())
        this.obstaclesTop.forEach((obs)=>{
            obs.draw()
        })
        this.drawScore()
    },
    moveAll: function () {
        this.background.move()
        this.faby.goDown()
        this.obstaclesBottom.forEach((obs) => {
            obs.move()
        })
        this.obstaclesTop.forEach((obs) => {
            obs.move()
        })
    },
    generateObstacles: function() {
        this.a = Math.random()*200 +100
        this.b = Math.random()*200 +100
        this.obstaclesBottom.push(new Obstacle(this.ctx, "images/obstacle_bottom.png", this.a, this.winH - this.a))
        this.obstaclesTop.push(new Obstacle(this.ctx, "images/obstacle_top.png", this.b, 0))
    },

    clearObstacles: function() {
        this.obstaclesBottom = this.obstaclesBottom.filter((obs) => obs._posX >= 0)
        this.obstaclesTop = this.obstaclesTop.filter((obs) => obs._posX >= 0)

    },

    isCollisionBottom: function () {
        return this.obstaclesBottom.some(obs => {
            return (this.faby._posX + this.faby._width > obs._posX &&
                this.faby._posY + this.faby._height > obs._posY &&
                this.faby._posX <= obs._width + obs._posX)
        })
    }, 
    isCollisionTop: function () {
        return this.obstaclesTop.some(obs => {
            return (this.faby._posX + this.faby._width >= obs._posX &&
                this.faby._posY <= obs._posY + obs._height &&
                this.faby._posX <= obs._width + obs._posX)
        })
    }, 
    drawScore: function() {             //con esta funcion pintamos el marcador
        this.scoreboard.update(this.score)
    },
    gameOver: function(){
        if (this.faby._posY + 50 >= this.winH ||
        this.faby._posY <= 0 ||
        this.isCollisionBottom() ||
        this.isCollisionTop()) 
        alert("Game Over")
        else{
            null
        }
    }
    
}