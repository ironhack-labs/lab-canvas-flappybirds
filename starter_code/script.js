
/*
 * CLASSES
 */

class Board {
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image();
    this.img.src = 'images/bg.png'
    this.img.onload = () =>{
      this.draw()
    }
  }
  draw(){
    this.x--
    if (this.x < -canvas.width) this.x = 0;
    // dibujamos la imagen normal
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // dibujamos la otra imagen, despues de la primer imagen, para que ocupe el espacio en blanco, cuando la primer imagen esta fuera
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);

  }
}

class Flappy{
  constructor(){
    this.x = 100
    this.y = canvas.height/2
    this.width = 60
    this.height = 50
    this.img = new Image();
    this.img.src = 'images/flappy.png'
    this.img.onload = () =>{
      this.draw()
    }
  }
  draw(){
    if (this.y>canvas.height){
      this.y = canvas.height
    } else if (this.y<0){
      this.y = 0;
    } else {
      this.y +=2
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly(){
    this.y -= 25;
  }
  isTouching(obstacle){
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}

class Pipes{
  constructor(y, height, bar){
    this.x = canvas.width + 20
    this.y = y
    this.width = 50
    this.height = height
    this.imgTop = new Image()
    this.imgTop.src = 'images/obstacle_top.png'
    this.imgBot = new Image()
    this.imgBot.src = 'images/obstacle_bottom.png'
    this.bar = bar;
  }
  draw(){
    this.x--
    if(this.bar == 'top'){
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    }else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

/*
 * VARIABLES
 */

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let frames = 0;
let board = new Board()
let flappy = new Flappy()
let obstacles = [];
let interval;
let score = 0;

/* 
* GAME FUNCTIONS
*/

function createPipes(){
  randomLengthTop = Math.floor(Math.random()*(canvas.height-200))
  lengthBottom = randomLengthTop + 100
  if (frames%250===0){
    obstacleTop = new Pipes(0, randomLengthTop, 'top')
    obstacleBottom = new Pipes(lengthBottom, canvas.height, 'bottom')
    obstacles.push(obstacleTop)
    obstacles.push(obstacleBottom)
  }

}

function drawPipes(){
  createPipes()
  obstacles.forEach((obstacle)=>{obstacle.draw()})
}

function checkColition(){
  obstacles.forEach((e)=> {
  if (flappy.isTouching(e)){
    gameOver()
  }
  })
} 

/**
 * GAME RUN
 */
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    //if (interval)return;
    interval = setInterval(update, 1000/60)
  }

};

function clearRect(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function update(){
  frames++
  clearRect()
  board.draw()
  flappy.draw()
  drawPipes()
  checkColition()
  keepScore()
  drawScore()
}

function gameOver(){
  clearInterval(interval)
  ctx.font = '30px Arial'
  ctx.fillText('Game Over', canvas.width/2, canvas.height/2)
}

document.onkeydown = (e)=>{
  switch(e.keyCode){
    case 32:
      flappy.fly()
      break;
  }
}
function drawScore(){
  ctx.font = '30px Arial'
  ctx.fillText(`Score: ${score}`, 100, 45)
}

function keepScore(){
  if (frames%250 === 0 && frames>860){
    score += 5
  }
}

