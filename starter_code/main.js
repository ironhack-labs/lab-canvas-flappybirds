// canvas
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d")

//Testing
//  ctx.fillRect(0,0,50,50)

//Variables Globales
var pipes = [];
var interval;
var frames = 0;
var images ={
        bg:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
        flappy:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
        pipe1:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
        pipe2:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"

}


//Clases -> todas las cosas en un VJ son clases
class Board {
    constructor(){
        this.x =0  //cada uno de los objetos tendrá una X
        this.y =0
        this.width = canvas.width
        this.height = canvas.height
        this.image = new Image()
        // this.image =document.createElement("img")
        this.image.src = images.bg
        this.image.onload = () => {
            this.draw()
        }
        this.music = new Audio ()
        this.music.src = "music.mp3"
    }
        //this.draw = function(){}
draw(){
this.x--
if(this.x < -this.width) this.x =0
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
ctx.font = "50px Avenir"
//ctx.fillText(frames,100,100)
    }
} //clase Board
class Flappy{
    constructor (){
    this.x = 200
    this.y =50
    this.width = 40
    this.height = 30
    this.image = new Image()
    this.image.src = images.flappy
    this.image.onload = () => {
        this.draw()
    }
    this.gravity = 3
    this.crash= new Audio ()
    this.crash.src ="crash.m4a"
}
    draw (){
        if(this.y < canvas.height -40) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    // crashWith(item){            //ITEM = cada uno de los PIPES;THIS=flappy
    //     return (this.x < item.x + item.width) &&
    //             (this.x + this.width > item.x) &&
    //             (this.y < item.y + item.height) &&
    //             (this.y + this.height > item.y);

        crashWith(item){            //ITEM = cada uno de los PIPES;THIS=flappy
        var crash = (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y)
        if(crash) this.crash.play()
        return crash;
                
    }

} //Clase Flappy
class Pipe{
    constructor(y, height, pipeName="pipe2") {
    this.x = canvas.width - 50
    this.y = y ? y : 0
    //te trajeron y? si ... no? entonces usa 0 (del lado derecho)
    this.width = 50
    this.height = height || 100
    this.image = new Image()
    this.image.src = images[pipeName]
    this.image.onload = () => {
        this.draw()
    }
}
    draw (){
    this.x-=2
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
    }
    




//Instancia (Objeto a partir de una clase)
//var pipe = new Pipe(100, 300, "pipe1")
var board = new Board()
// board.draw() ya no va porque arriba lo está dibujando
var flappy = new Flappy()


//Main function 
function update (){
    frames++
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board.draw()
    flappy.draw()
    //pipe.draw()
    generatePipes()
    drawPipes()
    checkCollitions()
}

function start(){
    if(interval) return
    pipes = [] //se borran los pipes
    interval = setInterval(update, 1000/60)
}
function gameOver (){
    clearInterval(interval)
    ctx.font="80px Avenir"
    ctx.fillStyle = "red"
    ctx.fillText("GAME OVER",50,250)

    ctx.font="50px Avenir"
    ctx.fillStyle = "black"
    ctx.fillText("Press 'esc' to restart", 50,300)
    interval = null
    board.music.pause()
}

//-------------------------------------//

//Funciones aux

function generatePipes(){
    if(frames % 130 === 0){

    //var pipe = new Pipe(100, 300, "pipe1")
    
    //1- generar el tubo de arriba
    var y = 0;
    var alto = Math.floor(Math.random() * 350) + 20     //* de qué rango a qué rango saca (qué tan alto lo quiero)
    var topPipe = new Pipe (y,alto, "pipe2")

    //2- establecer el espacio donde pasa flappy
    var window = 125
    var alto2 = canvas.height - (window + alto)

    //3- generar la pipa de abajo
    var bottomPipe = new Pipe(canvas.height - alto2, alto2, "pipe1")

    //4- donde pongo los tubos ya que los generé
    pipes.push(topPipe)
    pipes.push(bottomPipe)
    }
}

function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw()
    })

}
function checkCollitions (){
    pipes.forEach(function(pipe){
        if (flappy.crashWith(pipe)){
            gameOver()
        }
    })
}

//----------------------------------------//


//Observadores
addEventListener("keydown",function(e){
    if(e.keyCode === 32 && flappy.y >50){
        flappy.y -=50
    }

    if(e.keyCode === 27){
        start()
    }
    if(e.key = "Enter"){
        start()
        board.music.play()
    }
})

