
//



var canvas = document.getElementsByTagName('canvas')[0];//pincel
var ctx = canvas.getContext('2d')//lienzo
//testing
//ctx.fillRect(0,0,50,50)

//Variables globales
var pipes = []
var interval;
var frames = 0; //cuantass vecess se ha dibujado el canvas, nos ayuda a a ver cuantas vecees se ejecuta update
var images = {
    bg: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true',
    flappy: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true',
    pipe1: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true',
    pipe2:'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
}
//CLASES, todas las cosas en un videojuego son un objeto que viene de una clase ALV
class Board{  //las clases por convencion inician con letra mayuscula
        constructor(){ //inicializa todo, te da lo necesario para tener preparado al objeto
            this.x = 0;
            this.y = 0;
            this.width = canvas.width;
            this.height = canvas.height;
            this.image = new Image() //document.createElement('img')  //*/new Image('')
            this.image.src = images.bg
           /* this.image.onload = function(){
                this.draw()  // esto es  un callback por que tarda en cargar la imagen
            }.bind(this)//conivierte el this anterior en el this de este constructor
            */
            this.image.onload = () => { // lo mismo que rriba pero mejor, del siglo XXI
                this.draw() 
            }           
        }
         // esto esta viejo this.draw = function() mejor usar como sigue
        draw(){
            this.x--      //Solo debe haber un set interval en todo mi juego      
            if (this.x < -canvas.width) this.x = 0
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)//(imagen, x,y,widt,hight), tiene mas atributos, investigar
            ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)//(imagen, x,y,widt,hight), tiene mas atributos, investigar
            ctx.font = '50px Avenir'
            ctx.fillText(frames,100,100)
        }
}//termina clase board

class Flappy{
    constructor(){
        this.x = 150;
            this.y = 150;
            this.width = 40;
            this.height = 30
            this.image = new Image() //document.createElement('img')  //*/new Image('')
            this.image.src = images.flappy
            this.image.onload = () => {
                this.draw()
            }
            this.gravity = 3.5
    }
    draw(){
        if(this.y < canvas.height-40) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    crashWith(item){
              return  (this.x < item.x + item.width) &&
                      (this.x + this.width > item.x) &&
                      (this.x < item.y + item.height) &&
                      (this.y + this.height > item.y);
    }

}// termina Flappy

class Pipe{
    constructor(y,height,pipeName = 'pipe2'){ //si no llega pipeName, entonces se asiga por deafault pipe2
            this.x= canvas.width -50
            this.y = y ? y : 0 // si no llega y, toma como y= 0
            this.width = 50;
            this.height = height || 100 //este or para que no de error si no llega ese valor
            this.image = new Image() 
            this.image.src = images[pipeName]
            this.image.onload = () => {
                this.draw()
            }

    }
    draw(){
        this.x -= 3
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}
//INSTANCIAS -es un objeto a partir de una clase

var board = new Board()
var flappy = new Flappy()
//var pipe = new Pipe(100,300,'pipe1') // de ejemplo
// board.draw() esto ya no es necesario por qye tenemos el callback

// FUNCIONES PRINCIPALES
function update(){ //esto es importante por que borra el canvas, limpia la pantalla todo el tiempo,redibuja
    frames ++
    ctx.clearRect(0,0,canvas.width,canvas.height) //Esto me va a fallar, si no pongo el objeto que uqiero dibujar en update, no se va a dibujar, todas las cosas que quiero en mi videojuego tienen que etsar en update y tienes qe llamar a draw.
    board.draw()
    flappy.draw()
    //pipe.draw()//de ejemplo
    //1.- generar pipes
    generatePipes()
    //2.- dibujar pipes
    drawPipes()
}

function  start(){
    pipes=[]
    frames = 0
    interval = setInterval(update,1000/60) // este mil entre 60 es suficiente par aun videojuego, 30 y 60. Start es un itervalo que ejecuta update cada 60 veces por segundo

}
        
function gameOver(){
  clearInterval(interval)
  ctx.font= "100px Avenir"
  ctx.fillText("Game Over", 50,250)
}


// FUNCIONES AUXILIARES
function generatePipes(){
    if(frames % 100 === 0){
        //new Pipe(y,height,pipeName = 'pipe2')
    //1.- Generar el tubo de arriba
    var y = 0;
    var alto = Math.floor(Math.random() * 400)+20  
    var topPipe = new Pipe(y,alto,'pipe2')
    //2.- Establecer el espacio donde pasa flappy
    var window = 100
    var alto2 = canvas.height - (window + alto)
    //3.- generar el tubo de abajo
    var bottomPipe = new Pipe(canvas.height-alto2, alto2, 'pipe1')
    //4.- Donde jodidos pongo los tubos
    pipes.push(topPipe)
    pipes.push(bottomPipe)
    }
    

}

function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw()
    })
}



function checkCollitions(){
  pipes.forEach(function(pipe){
    if( flappy.crashWith(pipe) ){
      gameOver()
    }

  })
}

// LOS OBSERVADORES

addEventListener('keydown',function(e){//           escuchar cuando alguin presione una tecla
    if(e.keyCode === 32  && flappy.y > 50 ){
        flappy.y -= 70
    }

    if(e.keyCode === 27){
      start()
    }
})
start()