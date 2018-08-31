
//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

//testing
//ctx.fillRect (0,0,50,50);

//Variables globales
var pipes = []
var interval;
var frames = 0 ;
var images = {
    bg:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
    flappy: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
    pipe1: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
    pipe2: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
}

//Clases (todas las cosas en un videojuego son un objeto que viene de una clase)
//tablero,fondo,dcore,nombre de usuario, vidas etc...=> Board
class Board{
    //el construvtor es el que va iniciar
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = new Image ()
        this.image.src = images.bg
        this.image.onload = function(){
            this.draw()
        }.bind(this)
        this.music = new Audio()
        this.music.src = "flamu.mp3"
    }

    //metodos
    draw(){
        //infinizar el fondo
        this.x-=.5
        if (this.x < -this.width) this.x = 0

        //crear un imagen atras de la otra  
        ctx.drawImage(this.image,this.x, this.y, this.width, this.height) 
        ctx.drawImage(this.image,this.x + this.width, this.y, this.width, this.height)

        ctx.font = "50px Avenir"
        ctx.fillStyle = "white"
        ctx.fillText(Math.floor(frames/8), canvas.width - 400, 100);

    }

}


class Flappy{
    constructor(){
        this.x=100
        this.y=150
        this.width = 40
        this.height = 30
        this.image = new Image ()
        this.image.src = images.flappy
        this.image.onload = ()=> {
            this.draw()
        }
        this.gravity = 3
        this.crash = new Audio()
        this.crash.src = "crash.mp3"
    }

    draw (){
        if (this.y < canvas.height -  35) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    crashWith(item){

        var crash =  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
        
        if(crash) this.crash.play()
        return crash
    
    }

 }


class Pipe{
    constructor(y, height, pipeName="pipe2"){
        this.x = canvas.width
        this.y = y ? y : 0
        this.width = 50
        this.height = height || 100
        this.image = new Image()
        this.image.src = images[pipeName]
        this.image.onload = () => {
            this.draw()
        }
    }
    draw(){
        this.x-=2
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
    }
}


//Instancias (un objeto a partir de una clase)

var board = new Board()
var flappy = new Flappy()


//Funciones principales
function update(){
    frames++

    //borrar canvas para evitar la estela
    ctx.clearRect(0,0,canvas.width, canvas.height)

    //sino pones en al update el objeto que quieres dibujar no se va dibujar ... llamalo con board.draw()
    board.draw()
    flappy.draw()

    //pipes
    generatePipes()
    drawPipes()

    //choques
    checkCollitions()
}


function start(){
    if(interval) return
    pipes = []
    frames = 0
    //60 frames o cuadros por segundo .... 
    //start crea un intervalo que ejecuta update 60 veces por seg
    interval = setInterval(update,1000/60)

}

function gameOver(){
    clearInterval(interval)
    ctx.font = "80px Avenir"
    ctx.fillText("Game Over", 50, 250)
    ctx.font = "30px Avenir"
    ctx.fillStyle="red"
    ctx.fillText("Press esc to restart", 60, 300)
    interval = null
    board.music.pause()
}

//Funciones Auxiliares
function generatePipes(){
    if (frames % 100 === 0){

    //DATO new Pipe(y, alto, "pipe1")
    //1.- generar la pipa de arriba
    var y = 0
    var alto = Math.floor(Math.random() * 400) + 20
    var topPipe = new Pipe(y, alto, "pipe2")

    //2.- establecer el espacio donde pasa flappy
    var window = 100
    var alto2 = canvas.height - (window  + alto)

    //3.- generar la pipa de abajo
    var bottomPipe = new Pipe (canvas.height - alto2, alto2, "pipe1")

    //4.- donde pongo los tubos  ????
    pipes.push(topPipe)
    pipes.push(bottomPipe)
    }
}

function checkCollitions(){
    pipes.forEach(function(pipe){
        if(flappy.crashWith(pipe) ){
            gameOver()

        }

    })

}


function drawPipes(){
    pipes.forEach(function(pipe) {
        pipe.draw()
    })
}



//Los observadores (escuchadores)
addEventListener('keydown', function(e){
    if (e.keyCode === 32 && flappy.y > 50){
    flappy.y -= 60
    }

    //reiniciar el juego
    if (e.keyCode === 27){
        start()
    }

    if(e.key = "Enter"){
        start()
        board.music.play()
    }


})




