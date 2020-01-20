window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  const canvas=document.querySelector('canvas')
  const ctx=canvas.getContext('2d')
  
  //definicion de variables
  
  let interval
  let frames = 0
  const obstacles = []
  let flappy
  let board 
  let score = 0
  
  //constructor fondo
  class backGround{
  constructor(){
  this.x = 0
  this.y = 0
  this.width = canvas.width
  this.height = canvas.height
  this.img = new Image()
  this.img.src = "./images/bg.png"
  this.img.onload = () => {
  this.draw()
      };
  }
  draw() {
  this.x--
  if (this.x < -canvas.width) this.x = 0
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
  }
 }
  //Personaje
  class character {
  constructor() {
  this.x = 50
  this.y = 50
  this.width = 50
  this.height = 50
  this.img = new Image()
  this.img.src = './images/flappy.png'
  }
  draw() {
  this.y += 2
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
  this.y -= 25
  }
  Touchingpipe(pipe) {   //Tocar el tubo
  return (
    this.x < pipe.x + pipe.width &&
    this.x + this.width > pipe.x &&
    this.y < pipe.y + pipe.height &&
    this.y + this.height > pipe.y)
  }
  }
  //constructor tubo
  class Pipe { 
  constructor(y, height, imgType) {
    this.x = canvas.width
    this.y = y
    this.height = height
    this.width = 100
    this.img = new Image()
    this.img2 = new Image()
    this.img.src = "./images/obstacle_bottom.png"
    this.img2.src = "./images/obstacle_top.png"
    this.imgType = imgType
  }
  draw() {
  this.x--
  if (this.imgType) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  } else {
    ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
  }
  }
  }
  function generatePipes() {
  if (frames % 300 === 0) {
  const min = 100
  const max = 300
  const ventana = 100
  const randomHeight = Math.floor(Math.random() * (max - min)) + min
  obstacles.push(new Pipe(0, randomHeight, false))
  obstacles.push(
  new Pipe(randomHeight + ventana, canvas.height - randomHeight, true))
  }
  }
  
  function drawPipe() {
  obstacles.forEach(pipe => pipe.draw())
  }
  
  function checkCollitions() {
  if (flappy.y >= canvas.height - flappy.height) return gameOver()
  obstacles.forEach((pipe, i) => {
    if (pipe.x + pipe.width <= 0) {
      obstacles.splice(i, 1)
    }
    flappy.Touchingpipe(pipe) ? gameOver() : null })
  }
  
  function gameOver() {
  clearInterval(interval)
  ctx.fillStyle = 'orange'
  ctx.fillRect(100, 100, 1000, 400)
  ctx.lineWidth = "10px"
  ctx.font = "100px serif"
  ctx.fillStyle = 'red'
  ctx.lineWidth = 2
  ctx.fillText= ('GameOver', 150, 180, 140)
  ctx.stroke()
  
  }
  
  function startGame() {//flapy-1
  board = new backGround()
  flappy = new character()
  board.draw()
  flappy.draw()
    if (interval) return
    interval = setInterval(update, 1000 / 100)

  }

  function update() {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    flappy.draw()
    generatePipes()
    drawPipe()
    checkCollitions()
  }

   document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 32:
    flappy.fly()
  }
  })

};
