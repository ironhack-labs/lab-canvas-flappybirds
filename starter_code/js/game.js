var Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    keys: {
      SPACE : 32
    },
    init: function(id){
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d")
        this.width = 500
        this.height = 650
        this.score = 0
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.sound = new Audio("./sounds/background-music.mp3");

        this.start()
    },
    start: function () {

        this.sound.play()
        this.reset()

        this.interval = setInterval(function () {
            this.clear();
      
            this.framesCounter++;
      
            if (this.framesCounter > 999) {
              this.framesCounter = 0;
            }

            if (this.framesCounter %200 === 0){
                this.obstacles.push(new Obstacle(this)) 
            }
            this.obstacles.forEach(function(obstacle) {
                if(this.player.x > obstacle.x && this.player.x < obstacle.x + 5){
                    this.scoreboard.score+=1
                }
            }.bind(this))

            this.obstacles = this.obstacles.filter(function(obstacle){
                return (obstacle.x > -100)
            })


            this.drawAll();
            this.moveAll();

            if (this.player.y <= -100 || (this.player.detectCollisionFloor() === true) || this.detectObstacleCollision()===true){
                this.stopGame()
            }
        }.bind(this), 1000 / this.fps)
    },
    reset: function() {
        this.background = new Background(this)
        this.player = new Player(this)
        this.scoreboard = new ScoreBoard(this)
        this.framesCounter = 0
        this.obstacles = [] 
    },
    drawAll: function () {
        this.background.draw()
        this.player.draw()
        this.obstacles.forEach(function(obstacle) {
            obstacle.draw()
        })
        this.scoreboard.draw()
    },
    moveAll: function () {
        this.player.move()
        this.background.move()
        this.obstacles.forEach(function(obstacle) {
            obstacle.move()
        });    
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stopGame: function() {
        this.sound.pause()
        alert("You crashed! You got " + this.scoreboard.score + " points!")
        clearInterval(this.interval)
    },
    detectObstacleCollision: function(){
        var happens
        this.obstacles.forEach(function(obstacle) {
            if(this.player.y > obstacle.bottomObsDrawOrigin&& this.player.x + this.player.width -10 > obstacle.x && this.player.x < obstacle.x + 100 ){
                happens = true
            }
            if(this.player.y + this.player.height < obstacle.topObsHeight && this.player.x + this.player.width - 10 > obstacle.x && this.player.x < obstacle.x + 100 ){
                happens = true
            }
        }.bind(this));   
        return happens         
    }
}