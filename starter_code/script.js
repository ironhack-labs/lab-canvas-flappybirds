const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let interval
let frames = 0
const obstacles = []


const images = {
  background: './images/bg.png',
  flappy: './images/flappy.png',
  obstaculo1: './images/obstacle_bottom.png',
  obstaculo2: './images/obstacle_top.png'
};

class Background{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.background
    this.img.onload = () => {
      this.draw()
    } 
  }
  draw(){
    this.x--
    if(this.x < -canvas.width) this.x = 0
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
    }
  }
  
  class Flappy{
    constructor(){ //¿por que en el flappy del constructor no tenemos nada?
      this.x = 50
      this.y = 50
      this.width = 50
      this.height = 50
      this.img = new Image()
      this.img.src = images.flappy
      this.img.onload = () => {
        this.draw()
      }
    }
    draw(){
      this.y += 5 
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    fly(){
      this.y -= 200
    }
    isTouching(pipe){
      return (  //esta es cuando tocan los objetos
        this.x < pipe.x + pipe.width &&
        this.x + this.width > pipe.x &&
        this.y < pipe.y + pipe.height &&
        this.y + this.height > pipe.y
      )
    }
  }

  class Pipe{
    constructor(y, height, imgType){
      this.x = canvas.width
      this.y = y
      this.height = height 
      this.width = canvas.width / 5
      this.img = new Image()
      this.img2 = new Image()
      this.img.src = images.obstaculo1
      this.img2.src = images.obstaculo2
      this.imgType = imgType //¿para que sirve imgType?
    }
    draw(){
      this.x--
      if(this.imgType){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height,)
      } else {
        ctx.drawImage(this.img2, this.x, this.y, this.width, this.height) //aquí son dos obstaculos pero por que tenemos un if/else
      }
    }
  }

  const flappy = new Flappy() //Por que creaamos un new?
  const background = new Background()
  
  const generatePipes = () => { //entender como funciona la funcion generatePipes
    if(frames % 300 === 0){
        const min = 100
        const max = 300
        const espacio = 200
        const randomHeight = Math.floor(Math.random() * (max - min)) + min //Me puedes explicar esta funcion??
        obstacles.push(new Pipe(0, randomHeight, false))
        obstacles.push(new Pipe(600, randomHeight + espacio, canvas.height - randomHeight, true))
      console.log(obstacles)
    }
  }
  
  const drawPipe = () => {
    obstacles.forEach(pipe => pipe.draw())
  }
  
  function checkCollitions() {
    if(flappy.y >= canvas.height - flappy.height) return gameOver()
    obstacles.forEach((pipe, i) => {
    if(pipe.x + pipe.width <= 0){
      obstacles.splice(i, 1)
    }
    flappy.isTouching(pipe) ? gameOver() : null
    })
  }

  const gameOver = () => {
    clearInterval(interval)
    ctx.font = '40px Avenir'
    const title = 'Game Over'

    ctx.fillStyle = 'red'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText(title, (canvas.width / 3),400)
    obstacles = []
    clearInterval(interval)
}


  const update = () => {
    frames++
    ctx.clearRect(0,0,canvas.width,canvas.height)
    background.draw()
    flappy.draw()
    generatePipes()
    drawPipe()
    checkCollitions()
    drawScore()
  }

  window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
    };
    
  document.addEventListener('keydown',({keyCode}) => {
    switch (keyCode){
      case 32:
        flappy.fly()
        }
      })
      
    function startGame() {
        if(interval) return
        interval = setInterval(update, 1000 / 60)
    }
  }