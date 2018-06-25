
//Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var startButton = document.getElementById("start-button");

//Constants
var interval;
var frames = 0;
var pipes = [];
let spaceBetweenTubes = Math.floor(0.20*canvas.height);
let gravity = 2.5;
var music = new Audio();
music.src = 'https://www.playonloop.com/audio/mp3/POL-hitch-a-ride-long.mp3';
music.loop = true;
var score = 0;

var gameOverSound = new Audio();
gameOverSound.src = "./gameOver.mp3";

var gameOverFlag = false;
var flappy = 0;

var imagesSrc = {
  flappy: "./images/flappy.png",
  bg: "./images/bg.png",
  pipeBottom: "./images/obstacle_bottom.png",
  pipeTop: "./images/obstacle_top.png"
}

//Clases
class Board{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = imagesSrc.bg;
    this.image.onload = function(){
      this.draw();
    }.bind(this)
  }
  draw(){
    this.x--;         //Mueve la imagen
    if(this.x === -this.width) this.x = 0;  //Resetea la imagen cuando llega al final
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
  }

  drawScore(){
    ctx.strokeStyle = "black";
    ctx.font = "20px Arial"
    ctx.strokeRect(canvas.width*.89,canvas.height*.1, 110,50);
    ctx.fillText("Score: "+score,canvas.width*.895,canvas.height*.16);
  }

  gameOver(){
    ctx.strokeStyle = "black";
    ctx.font = "100px Georgia";
    ctx.fillText("Game Over", 200,200);
    ctx.strokeStyle = "green";
    ctx.font = "50px Georgia";
    ctx.fillText("Final Score: " + score, 300, 250);
    ctx.font = "100px"
    ctx.fillText("Press R to Play Again", 300, 320);
  }
}
class Flappy{
  constructor(){
    this.x = 100;
    this.y = 100;
    this.width = 32;
    this.height = 24;
    this.image = new Image();
    this.image.src = imagesSrc.flappy;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }
  draw(){
    this.y += gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  goUp(){
    this.y -= 50;
  }
  goDown(){
    this.y +=25;
  }
  isTouching(item){  //ITEM = tubo Si parte o toda el área que ocupa la instancia está en el área del item = choco
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }
  isOutsideCanvas(){  //Item is canvas
    return  (this.y + this.height > canvas.height) ||
            (this.y < 0);
  }
  
}
//Receives position and y
class Tubo{
  constructor(position, y){
    this.x = canvas.width;  // Los tubos inician al terminar el primer background  
    this.y = y;
    //Constantes
    this.width = 65;
    this.height = canvas.height;
    //Imagen
    this.image = new Image();
    this.image.src = position === "top" ? imagesSrc.pipeTop : imagesSrc.pipeBottom;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }
  draw(){
    this.x -= gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this. height);
  }
}
//Instancias
var board = new Board();

//Main functions
function update(){
  frames++;
  score =+ Math.floor((frames/100));
  ctx.clearRect(0,0, canvas.width, canvas.height);
  board.draw();
  flappy.draw();
  generatePipes();
  drawPipes();
  board.drawScore();
  if(flappy.isOutsideCanvas()) killFlappy();
  console.log(flappy.y);
  if(gameOverFlag) board.gameOver();
}

function startGame() {
  if(interval) return;
  flappy = new Flappy();
  interval = setInterval(update, 1000/60);
  music.play();
}

//Aux functions
/*Returns an array of 2 pipes*/
function generatePipes(){
  if(!(frames%120 === 0)) return;
  //Random Generator: generates a random [0...canvas.height]
  var random = Math.floor(Math.random()*canvas.height);

  //Checks to see if random is smaller then the min allowed
  var maxHeight = -canvas.height + spaceBetweenTubes;
  var randomHeight = random > (2*spaceBetweenTubes) ? (random*=-1) : maxHeight;
  //Calculation of bottom pipe position
  var bottomHeight = randomHeight + canvas.height + spaceBetweenTubes;

  var topPipe = new Tubo("top",randomHeight); // goes from -canvas.height to min: spaceBetweenTubes
  var bottomPipe = new Tubo("bottom",bottomHeight); // goes from -canvas.height to 0
  pipes.push(topPipe);
  pipes.push(bottomPipe);
}
//Goes thru the array of pipes and draws them to the canvas.
function drawPipes(){
  pipes.forEach(function(element){
    element.draw();
    if(flappy.isTouching(element)) killFlappy();
  });
}
function killFlappy(){
  clearInterval(interval);
  music.pause();
  gameOverFlag = true;
  gameOverSound.play();
}

function resetGame(){
  interval = 0;
  frames = 0;
  pipes = [];
  score = 0;
  gameOverFlag = false;
  flappy = 0;
}

//Listeners
addEventListener("keydown", function(event){
  switch(event.keyCode){
    case 38:
    case 32:
      flappy.goUp();  
    break;
    case 40:
      flappy.goDown();
    break;
    case 69:
      clearInterval(interval);
      music.pause();
      board.gameOver();
    case 82:
      if(gameOverFlag){
        resetGame();
        startGame();
      }
  }
});
startButton.onclick = function() {
  if (!gameOverFlag) startGame();
};
