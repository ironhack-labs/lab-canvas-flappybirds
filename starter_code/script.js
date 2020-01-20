const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
let interval
let frames = 0
let flapicito 
let fondo 
let obstacles = []
let score = 0



const img = {
  flappy: './images/flappy.png', 
  bg: './images/bg.png',
  obstacleTop: './images/obstacle_top.png',
  obstacleBott: './images/obstacle_bottom.png',
}

class Background{
  constructor (){
    this.x = 0
    this.y = 0
    this.width = $canvas.width 
    this.height = $canvas.height
    this.image =new Image()
    this.image.src = img.bg
    this.image.onload = () => {
      this.draw()
    }
    this.audio = new Audio()
    this.audio.src = ''
    this.audio.loop = true
  }

  draw(){
    this.x --
    if(this.x < -$canvas.width) this.x =0
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + $canvas.width, this.y, this.width, this.height)  
    ctx.font = '50px Arial'
    ctx.fillStyle = 'white'
  }
}

class Flappy{
  constructor(){
    this.x = 425      
    this.y = 100
    this.width = 50
    this.height = 35
    this.image = new Image()
    this.image.src = img.flappy
  }
  draw(){
    this.y ++
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)   
  }
  fly(){
    this.y -= 30
  }
  isTouching(obstacle) {
		return (
			this.x < obstacle.x + obstacle.width &&
			this.x + this.width > obstacle.x &&
			this.y < obstacle.y + obstacle.height &&
			this.y + this.height > obstacle.y
		);
	}
}

class Pipe{
  constructor (y, alturaPipe, imgPipe){
    this.x = $canvas.width
    this.y = y
    this.height = alturaPipe
    this.width = $canvas.width /10
    this.imgTop = new Image ()
    this.imgBott = new Image ()
    this.imgTop.src = img.obstacleTop
    this.imgBott.src = img.obstacleBott
    this.imgType = imgPipe
}
draw(){
  this.x--
  if(this.imgPipe){
    ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
  } else {
    ctx.drawImage(this.imgBott, this.x, this.y, this.width, this.height)
    }
  }
}





//window.onload = function(){
  
  // document.getElementById("start-button").onclick= function () {
  //   flapicito = new Flappy()
  //   fondo = new Background()
  //   flapicito.draw()
  //   fondo.draw() 
  //   console.log("inicio el juego")
  //   startGame();
      
   
  //document.getElementById("start.button").blur()
  //startGame()


    flapicito = new Flappy()
    fondo = new Background()
    //flapicito.draw()
    //fondo.draw() 
    //console.log("inicio el juego")
    startGame();
    
    function startGame (){
      if (interval)return
      fondo.audio.play()
    interval = setInterval( update,1000/80)
}



function update(){
  frames ++
  ctx.clearRect(0,0, $canvas.width, $canvas.height)
  fondo.draw()
  flapicito.draw()
  generatePipes()
  drawPipe()
  checkCollitions() 
  ctx.fillText(String (score), $canvas.width - 100, 100)

}

function generatePipes() {
  if (frames % 330 === 0){
    const min = 100
    const max = 330
    const espacio = 100
    const alturaRnd = Math.floor(Math.random()* (max - min)) + min
    obstacles.push(new Pipe(0, alturaRnd, false))
    obstacles.push(
      new Pipe(alturaRnd + espacio, $canvas.height - alturaRnd, true)
    )
    console.log(obstacles)
  }
}

function drawPipe(){
  obstacles.forEach(pipe => pipe.draw())  
}

function checkCollitions() {
  if(flapicito.y >= $canvas.height - flapicito.height) return gameOver()
  obstacles.forEach((pipe, indx)=>{
    if (pipe.x + pipe.width <= 0){
      obstacles.splice (indx , 1)
    }
    flapicito.isTouching(pipe) ? gameOver() : null
  })
}

function gameOver() {
  ctx.font = '70px Arial';
  ctx.fillStyle = 'purple'
	ctx.fillText('Game over', $canvas.width / 2 - 150 , $canvas.height / 2);
	ctx.fillText(`Score: ${keepScore ()}`, $canvas.width / 2 - 150 , $canvas.height / 2 + 60);
  clearInterval(interval)
}

function keepScore() {
  if (frames % 330 === 0 && frames > 330) {
		score ++ // aquí hice una variable para poder ir guardando el score, pero siento que falta que le asigne cuanto va sumando
	}  
}

document.addEventListener('keydown', ({keyCode})=>{
  keyCode === 39 ? flapicito.fly() : null // tuve muchos problemas con el tabulador, así que escogí otra tecla
  
})




