const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let interval
let frames = 0
const obstArr = []

const images = {
  bg: 'images/bg_flapy.jpeg',
  flappy: 'images/Kratos.png',
  logo: 'images/logo.png',
  obstacle_bot: 'images/obs_bot.png',
  obstacle_top: 'images/Obst-top-new.png'
}


class Background{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
      this.draw()
    }
  }

  draw(){
    this.x--
    if(this.x < -700) this.x = 0
    ctx.drawImage(this.img, this.x, this.y, 700, 500) //medidas para que no se apachurre la imagen
    ctx.drawImage(this.img, this.x + canvas.width + 300, this.y, 700, 500)
  }

}

class KratosFlappy{
  constructor() {
    this.x = 100
    this.y = 250
    this.width = 40
    this.height = 70
    this.img = new Image()
    this.img.src = images.flappy
  }

  draw(){
    this.y += 3
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  jump(){
    this.y -= 40
  }
}


class Obstacles{
  constructor(y, height, typeObst){
    this.x = canvas.width
    this.y = y
    this.height = height
    this.width = canvas.width/5
    this.imgBot = new Image()
    this.imgTop = new Image()
    this.imgBot.src = images.obstacle_bot
    this.imgTop.src = images.obstacle_top
    this.type = typeObst
  }

  draw() {
    this.x--
    if (this.type) {
      ctx.drawImage(this.imgBot, this.x-50, this.y, 300, this.height)
    } else {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    }
  }
}





let board = new Background() //SE INSTANCIA BACKG GLOBAL
let kratongo = new KratosFlappy() //ISNTANCIA KRATOS


function createObst(){ //necesitamos pintar cada objeto del array en otra funcion
  if (frames % 200 === 0){
    const min = 100
    const max = 300
    const ventanita = 100            //espacio para que pase el kratos
    const randomHeight = Math.floor(Math.random() * (max - min)) + min
    obstArr.push(new Obstacles(0, randomHeight, false))        //este empieza en 0, osea es el de arriba
    obstArr.push(new Obstacles(randomHeight + ventanita, canvas.height - randomHeight, true))         //este empieza 500 despues de donde acaba el otra, y asi crea la ventanita para el flappyKratos
  }
}

function drawObst(){
  obstArr.forEach(obst => obst.draw()) 
}

function update(){
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.draw()
  kratongo.draw()
  createObst()
  drawObst()

}


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    if (interval) return
    interval = setInterval(update, 1000/40)
  }
};

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      kratongo.jump()
  }
})
