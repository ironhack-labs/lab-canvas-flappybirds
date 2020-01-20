//Primary
const canvas = document.createElement('canvas')
const instructions = document.createElement('p')
const ctx = canvas.getContext('2d')

canvas.width = 400
canvas.height = 600

let interval
let frames = 0
let obstacles = []
let score = 0
const flyAudio = new Audio('./audio/sfx_wing.mp3')

const $gameBoard = document.getElementById('game-board')
const $startButton = document.getElementById('start-button')


const images = {
  bg: './images/bg.png',
  flaby: './images/flappy.png',
  obstacleTop: './images/obstacle_top.png',
  obstacleBottom: './images/obstacle_bottom.png',
  gOver: './images/gameOver.jpg'
}

//Functions to start game
function drawCanvas() {
  $gameBoard.appendChild(instructions).innerText = `Instructions: Press space to fly. Avoid pipes. Don't touch ground. Score: ${score}.`
  $gameBoard.appendChild(canvas)
}
/*Function that will help make the button hidden once the game has started and 
change it's text to restart once you have started the game once*/
function hideStartButton() {
  $startButton.style.visibility = 'hidden'
  $startButton.innerText = 'Restart'
}
//This function will help make the button be visible when the game is over.
function showStartButton(){
  if ($startButton.style.visibility === 'hidden') {
    $startButton.style.visibility = 'visible'
  }
}

//Classes for creating the game objects.
class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.background = new Image()
    this.background.src = images.bg
    this.background.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    } else {
      ctx.drawImage(this.background, this.x, this.y, this.width,this.height)
    }
    ctx.drawImage(
      this.background,
      this.x + canvas.width,
      this.y,
      canvas.width,
      canvas.height
    )
  }
}

class Flaby {
  constructor() {
    this.x = 50
    this.y = 250
    this.width = 40
    this.height = 40
    this.flaby = new Image()
    this.flaby.src = images.flaby
    }
  draw() {
    this.y += 2
    ctx.drawImage(
      this.flaby,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  fly() {
    this.y -= 35
  }
  contact(pipeline) {
    return (this.x < pipeline.x + pipeline.width &&
          this.y < pipeline.y + pipeline.height &&
          this.x + this.width > pipleline.x &&
          this.y + this.height > pipeline.y)
  }
}

class Pipes {
  constructor(y, height, pipeType) {
    this.x = canvas.width
    this.y = y
    this.width = canvas.width / 5
    this.height = height
    this.pipeTop = new Image()
    this.pipeBottom = new Image()
    this.pipeTop.src = './images/obstacle_top.png'
    this.pipeBottom.src = './images/obstacle_bottom.png'
    this.pipeType = pipeType
  }
  draw() {
    this.x--
    if (this.pipeType) {
      ctx.drawImage(this.pipeTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.pipeBottom, this.x, this.y, this.width, this.height)
    }
  }
}

const gameOver = new Image()
gameOver.src = images.gOver

//Functions to generate pipelines and push them into our obstacle array.
function generatePipelines() {
  if (frames % 200 === 0) {
    let minHeightV = 120
    let maxHeightV = 300
    let outOfCanvas = 500
    const randomHeight = Math.floor(Math.random() * (maxHeightV - minHeightV)) + minHeightV
    obstacles.push(new Pipes(0, randomHeight, true))
    obstacles.push(new Pipes(randomHeight + minHeightV, randomHeight + outOfCanvas, false ))
    //console.log(obstacles)
  }
}

//Function to draw the pipelines in our canvas.
function drawPipelines() {
  obstacles.forEach(pipeline => pipeline.draw())
}
//Instances of the classes.
const background = new Background()
const flaby = new Flaby()


//Function to end game.
function youLose() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0, canvas.width,canvas.height)
  ctx.drawImage(gameOver,80,200,250,250)
  clearInterval(interval)
}

//Function to check for collision and clear pipes.
function checkCollition() {
  if (flaby.y >= canvas.height - flaby.height) {
    youLose()
    showStartButton()
  } 
}

/*
Could not manage to simulate the collision. I was trying the next piece of code, but it throwed and error in the console. Note:
It didn't break the program.

else {
  obstacles.forEach((pipe, index) => {
    if (pipe.x + pipe.y <= 0) {
      obstacles.splice(index, 1)
    }
  if (flaby.contact(pipe)) {
    youLose()
  } else {
    null
  }
})
}*/

//Function to update score.
function updateScore() {
  score++
}

//Functions to update and start game.
function update() {
  frames++
  //ctx.clearRect(0, 0, canvas.width, canvas.height)
  background.draw()
  flaby.draw()
  generatePipelines()
  drawPipelines()
  checkCollition()
}

//This function specifies what to do to run the game and it is called from the onload function when the start button is clicked.
//It draws the canvas and sets and interval to execute the update function 60 times every 1 second.
function startGame() {
  drawCanvas()
  interval = setInterval(update, 1000 / 60)
  interval2 = setInterval(updateScore, 1000) 
  //I want to update the score with an interval that repeats the function each second, but it does not work.
}

/*On load, tells the window to execute  a function that will get the element with the Id 'start-button' and on click will execute
a function that contains: hideStartButton and startGame described above.*/
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    hideStartButton();
    startGame();
    score = 0
  };
};

//Flaby function for control
function makeFlabyFly(key) {
  if (key.keyCode == '32') {
    flaby.fly()
    flyAudio.play()
  }
}

//Event listener to check for a keydown event and run the function makeFlabyFly 
document.addEventListener('keydown', makeFlabyFly)

