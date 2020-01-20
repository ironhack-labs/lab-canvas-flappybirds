//setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let interval
let frames = 0;
let score = 0;
let pipes =[];
const imgs = {
  bg: "./images/bg.png",
  go: "./images/9.jpg",
  flappy: "./images/flappy.png",
  logo: "./images/logo.png",
  pipeBottom: "./images/obstacle_bottom.png",
  pipeTop: "./images/obstacle_top.png",
};
//background
  class Background {
    constructor(){
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.img = new Image()
      this.img.src = imgs.bg 
      this.img2 = new Image
      this.img2.src = imgs.go
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      this.x--
      if(this.x < -canvas.width) this.x = 0
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.img, this.x + canvas.width,this.y, this.width, this.height)
    }
    drawGO(){
        ctx.drawImage(this.img2, 0, 0, 50, 50)
    }
  }
   
  //bird
  class Flappy{
    constructor() {
      this.x = 70
      this.y = 70 
      this.width = 70
      this.height = 70 
      this.img = new Image()
      this.img.src = imgs.flappy
    }
    draw(){
      this.y += 2
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    fly() {
      this.y -= 40
      console.log(score)
    }
    isTouching(pipe) {
      return (
        this.x < pipe.x + pipe.width &&
        this.x + this.width > pipe.x &&
        this.y < pipe.y + pipe.height &&
        this.y + this.height > pipe.y
      )
    }
  }

  //pipes
  class Pipes {
    constructor(y, height, imgType){
      this.x = canvas.width
      this.y = y
      this.width = canvas.width / 5
      this.height = height
      this.img = new Image()
      this.img2 = new Image()
      this.img.src = imgs.pipeTop
      this.img2.src = imgs.pipeBottom
      this.imgType = imgType
    }
    draw(){
      this.x--
      if(this.imgType){ ctx.drawImage(this.img2, this.x, this.y, this.width,this.height)}
      else {ctx.drawImage(this.img, this.x, this.y, this.width, this.height)}
    }
  }

  let flappy = new Flappy;
 let background = new Background;

  function update(){
    frames++
    ctx.clearRect(0, 0, canvas.width , canvas.height)
    background.draw()
    flappy.draw()
    spawnPipes()
    drawPipes()
  }

  function spawnPipes (){
    if (frames % 200 === 0){
      const min =80
      const max =200
      const pathway = 150
      const randomize = Math.floor(Math.random()* (max - min)) + min
      pipes.push(new Pipes(0, randomize, false))
      pipes.push( new Pipes(randomize + pathway, canvas.height - randomize, true))
    }
  }
  function drawPipes (){
    pipes.forEach(pipes => pipes.draw() )
  }

  function checkCollitions() {
    if (flappy.y >= canvas.height - flappy.height) {return gameOver()}
   else  {pipes.forEach((pipes, i) => {
      if (pipes.x + pipes.width <= 0) {
        pipes.splice(i, 1)
      }
      flappy.isTouching(pipes) ? gameOver() : score++
    })
  }}
  

  function startGame() {
    if(interval) return
    interval = setInterval( update, 1000 / 60)
    pipes = []
    frames = 0
    background.draw()
    flappy.draw()
  
    
  }
  function gameOver() {
    clearInterval(interval)

  }
  const drawScore = () => {
    ctx.font = "20px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(`Score: ${score}`, canvas.width - 200, 50);

  }
  
  document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 32:
        flappy.fly()
    }
  })





window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    console.log("miau")
  };
};
