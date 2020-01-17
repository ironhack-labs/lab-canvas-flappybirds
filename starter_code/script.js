const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let interval // intervalo de repeticion del update
let frames = 0 // cantidad de fraes que han pasado
const obstacules = []

const images = {
  bg: './images/bg.png',
  flappy: './images/flappy.png',
  logo: './images/logo.png',
  obstacle_bot: './images/obstacle_bottom.png',
  obstacle_top: './images/obstacle_top.png'
}

class Board {
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
      this.draw()
    } // a la espera de carga de la imagen
  }
  draw(){
    this.x--
    if(this.x < -canvas.width) this.x = 0
    ctx.drawImage( // primera pintada en el CANVAS
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
    ctx.drawImage(// segunda pintada en el CANVAS
      this.img,
      this.x + canvas.width, // se pinta al final de la primera imagen que se imprimio
      this.y,
      this.width,
      this.height
    ) 
  }
}

class Flappy {
  constructor(){
    this.x = 50
    this.y = 50
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.flappy
  }
  draw() {
    this.y += 2 // Gravedad - que vaya cayendo
    ctx.drawImage(
      this.img, 
      this.x, 
      this.y, 
      this.width, 
      this.height
      )

  }
  fly() {
    this.y -= 25
  }
}

class Pipe {
  constructor(y, height, imgType){
    this.x = canvas.width
    this.y = y
    this.height = height
    this.width = canvas.width / 5
    this.imgBot = new Image()
    this.imgTop = new Image()
    this.imgBot.src
  }
}

const background = new Board()
const flappy = new Flappy()

function startGame() {
  if(interval) return
  interval = setInterval( // se declara los frames a los que va estar refrescando la imagen
    update, 
    1000 /60
    ) 
    document.onkeydown = e => { 
      switch(e.keyCode) {
        case 32:
          flappy.fly() // cada que se presiona arriba en el teclado flappy vuela
      }
    }
}

function update(){ //aqui pasa toda la magia!!!!
  frames++
  ctx.clearRect(0 , 0 ,canvas.width, canvas.height)
  background.draw()
  flappy.draw()
  generatePipes()
}

document.getElementById("start-button").onclick = () => startGame()


