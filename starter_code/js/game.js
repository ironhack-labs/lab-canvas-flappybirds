const Game = {
    title: 'Flappy Bird',
    author: 'Rebe',
    license: '1.0',
    canvasObj: undefined,
    fps: 60,
    obstacles: [],      //array de obstaculos
    ctx: undefined,
    winH: undefined,
    winW: undefined,
    framesCounter: undefined,
    keys: {
        SPACE: 32
    },


    //métodos
    
    init: function(id){
        this.canvasObj = document.getElementById(id)
        this.ctx = this.canvasObj.getContext('2d')
        this.setDimensions()
        this.start()
    },
    start: function(){
        this.reset()  //reinicia la configuración del juego
        this.interval = setInterval(()=>{
            this.clear()
            this.framesCounter ++   //Contamos una vuelta             
            if(this.framesCounter > 1000) {   //Cada 1000 vueltas lo reiniciamos
                this.framesCounter = 0
                console.log('7')
            }

            if(this.framesCounter % 200 == 0) { //Cada 200 vueltas pintamos un objeto
                this.generateObstacles() 
                console.log('8')      
            }
            
            this.drawBack() 
            this.moveBack()
            this.drawAll()
            this.clearObstacles()
        },1000/this.fps)
        
    },

    reset: function() {         //reset del game
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx,40, 40)
       
    },

    setDimensions: function(){
        this.width = 1000
        this.height = 600
        this.canvasObj.width = this.width 
        this.canvasObj.height = this.height
   
    },
    setEventListeners: function () {
        document.onkeydown = e => {
            e.keyCode === this.keys.SPACE ? this.newBall() : null
        }
    },
    
    drawBack(){
        this.background.draw()
    },

    moveBack(){
        this.background.move()
    }, 

    drawPlayer(){
        this.player.draw()
    },
    
    movePlayer: function () {
        play.draw()
        player.move()   
    },

    drawAll: function() {
        this.drawPlayer()
        // console.log('pinta')
        // this.player.draw(this.framesCounter)
        // console.log('pinta frames')
        this.obstacles.forEach( obs => obs.draw())  
        // this.drawScore()
    },

    generateObstacles: function() {
        console.log("se genera obstaculo")
        this.obstacles.push(new Obstacle(this.canvas.width, 0, "green", 30, Math.floor(Math.random() * 100 + 200)))  //Generamos obstaculos en el array. El math.Random sirve para que tengan diferentes tamanios.
    },
    
    clearObstacles: function() {
        this.obstacles.forEach((obs, idx) => {
          if(obs.x < 0)  {this.obstacles.splice(idx, 1)}  //Limpiamos los obstaculos iterando sobre ellos.
        })
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvasObj.width, this.canvasObj.height)
    },
    
}