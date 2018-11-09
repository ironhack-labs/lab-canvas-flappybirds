//canvas
var canvas = document.getElementById('c')
var ctx = canvas.getContext('2d')


//variables
var interval
var frames = 0
var images = {
  bg:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
  flappy:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
  logo: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true",
  obstacle_bottom:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
  obstacle_top:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
}

var audio = {
  fail:"http://www.sonidosmp3gratis.com/sounds/flappy-bird-fail",
  start:"http://www.sonidosmp3gratis.com/sounds/dracula-dracula-bach"
}
var pipes = []

//clases

//en esta clase board 
function Board(){
  this.x=0
  this.y=0
  this.width = canvas.width
  this.height=canvas.height
  this.image= new Image()
  this.image.src = images.bg
  //this.image.onload = ()=>this.draw() LO QUITAMOS PARA QUE NO CARGAR ANTES QUE L BG
  this.draw=function(){
    this.x--
    if(this.x < -this.width) this.x = 0
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height)//empieza donde la anterior termina
    
  }
this.drawScore = function(){
  ctx.font="bold 24px Avenir"
  ctx.fillText(Math.floor(frames/60),50,50)
}

}

function Flappy(){
  Board.call(this)
  this.x = 100
  this.y = 200
  this.width = 40
  this.height = 30
  this.image.src = images.flappy
  //this.image.onload = ()=>this.draw()//Aqui si ponemos el onload que quitamos en board
  
  this.draw = function(){
    this.boundaries()
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}
  
  this.boundaries = function(){
    //Con esto vamos a dar gravedad

    if(this.y + this.height > canvas.height-10) {
      this.y=canvas.height-this.height
    }
    else if(this.y<10){
      this.y=10
    
    }
   else this.y+=2.01
  }

//estos son los limites cuando flappy toca los limites
this.isTouching = function(item){
  return(this.x<item.x+item.width) &&
  (this.x+this.width>item.x)&&
  (this.y<item.y+item.height)&&
  (this.y+this.height>item.y);
}

}//flappy





function Pipe(height,y,position){
  this.x = canvas.width + 60
  this.y =  y || 0
  this.width=60
  this.height=height
  this.image = new Image ()
  this.image.src = position === "top" ? images.obstacle_top : images.obstacle_bottom
  this.draw= function(){
    this.x-=2
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


//instancias
var bg= new Board()
var flappy = new Flappy()
var pipe = new Pipe()
var musica


//main functions

function start(){
  pipes =[]
  frames=0
  //Dar musica de inicio
  musica = new Audio()
  musica.src = audio.start
  musica.play()

  if(!interval) interval=setInterval(update,1000/60)//ponemos este if para que no se repita cada vez que presionemos la tecla
    
}

//Si no esta aqui no se dibuja
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height)//siempre tiene que borrar el canvas y ya con eso podemos dibujar lo necesario
    bg.draw()
    flappy.draw()//Aqui ponemos las clases que queremos dibujar
    drawPipes()
    bg.drawScore()
    checkFlappyCollition()
  }

function gameOver(){
  clearInterval(interval)
  interval=null
  ctx.fillStyle="red"
  ctx.font="bold 60px Avenir"
  ctx.fillText("GAME OVER", 50,200)
  ctx.fillStyle="black"
  ctx.font="bold 40px Arial"
  ctx.fillText("Tu Score: " + Math.floor(frames/60),200,300)
  ctx.font="bold 20px Arial"
  ctx.fillText("Presiona 'ENTER' pra reiniciar",50,350)
  musica = new Audio()
  musica.src=audio.fail
  musica.play()
}


//dibujar



//aux functions


//Esta funcion drawCover dibuja la pantalla de inicio
function drawCover(){
  var img = new Image()
    img.src = images.logo
    img.onload = function(){
      bg.draw()
      ctx.drawImage(img, 50,100,300,100)
      ctx.font="bold 24px Avenir"//Ponemos la fuente de lo que queremos
      ctx.fillStyle="black"//Ponemos el color que queremos
      ctx.fillText("Presiona la tecla 'ENTER' para comenzar",50,300)//texto,x,y
  }
}

//esta funcion generara los obstaculos aleatoriamente
 function generatePipes(){
   //necesitamos altura
   if (frames%150===0){
    var height = Math.floor(Math.random()*200+50)
    pipes.push(new Pipe(height,0,"top"))

    var h= canvas.height-height-100
    var y = canvas.height - h
    pipes.push(new Pipe(h,y))
   }
 }
//esta funcion los pasa de anonimos a genericos

function drawPipes(){
  generatePipes()
  pipes.forEach(function(pipe){
    pipe.draw()
  })
}

function checkFlappyCollition(){
  //usamos for of en esta ocasion, como es for pregunta por todos los pipes, si toca uno gameover
  for(var pipe of pipes){
    if(flappy.isTouching(pipe)){
      gameOver()
    }
  }

}

//listeners
//pone una portada con la que iniciaremos el juego

//En este caso usamos enter para iniciar
addEventListener('keyup',function(e){
  switch(e.keyCode){
    case 13:
      return start()
    default:
      return
  }
})

addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 32:
      flappy.y -=40//Aqui le estamo sdando que con cada tecla 32 space se eleve en y ese numero
      return
    default:
      return
  }
})


//Llamo a funcion del dibujo inicio de pantalla drawCover
drawCover()