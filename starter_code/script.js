/** @type {HTMLCanvasElement} */
var canvas;
/** @type {CanvasRenderingContext2D} */
var ctx; 

var w = 480;
var h = 640;
var w2 = w / 2;
var h2 = h / 2;

var floor = 565;


var cityImg = new Image;
cityImg.src = "./images/bg.png"

var keyPressed = false;
var keyInterval;
var posX;
var posY;
var frameID;
var score = 0;

window.onload = function() {
  document.onkeydown = pressingDown;
  document.onkeyup = freeUp;
  setup();
  document.getElementById("start-button").onclick = function() {  
    startGame();
  };
};

function setup(){
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext('2d');
}

function startGame() {    
  document.getElementById("game-intro").style.display = "none";
  setCanvasDimensions();
  var posX = w2;
  var posY = h2;
  gameProcess();  
}

function pressingDown(e) {
  if (e.keyCode === 32) {
    console.log("Presionado " + flappy.y);
    clearInterval(keyInterval);
    if (!keyPressed) {
      debugger
      var y = flappy.jump();
      //flappy.putOn(y);
    }
    keyPressed = true;
    flappy.fly();
  }
}

function freeUp(e) {
  if (e.keyCode === 32) {
    console.log("Liberado " + flappy.y);
    keyInterval = setInterval(function(){
      flappy.fall();      
    }
    ,10);
    keyPressed = false;
  }
}

function setCanvasDimensions(){
  canvas.setAttribute("height", h);
  canvas.setAttribute("width", w);
}

function gameProcess() {
  frameGame =  setInterval(() => {
    ctx.save();
    drawBackground(); 
    drawBird();
    drawFloor();
    drawLines();
    if(checkCollision()) gameOver();
  }, 4000 / 60); 
}

function drawFloor(){
  band.changeColors();
  band.draw(ctx);
}

function drawBird(){
  flappy.draw(ctx);
};

function drawBackground() {
  ctx.beginPath()
  ctx.drawImage(cityImg, 0, 0, 480, 550);
  ctx.rect(0,550,w,h);
  ctx.fillStyle = "#DED895";
  ctx.fill();  
  ctx.closePath();
}



function drawLines(){

  ctx.beginPath();
  ctx.moveTo(0,566);
  ctx.lineTo(w,566); 
  ctx.closePath();
  ctx.strokeStyle = "#548023" ;
  ctx.lineWidth = 3;
  ctx.stroke();

  
  ctx.beginPath();
  ctx.moveTo(0,569);
  ctx.lineTo(w,569); 
  ctx.closePath();
  ctx.strokeStyle = "#D7A84C" ;
  ctx.lineWidth = 3;
  ctx.stroke();
}

function stop() {
  clearInterval(frameGame);
};

function gameOver() {
  stop();
  ctx.font = "75px Verdana";
  ctx.fillStyle = "black"
  var textSpace = ctx.measureText("Game Over!")
  ctx.fillText("Game Over!  \n:( ", w2 - textSpace.width/2, h2);

}

function checkCollision(){
  if( flappy.y >= this.floor - 75) return true
  else return false;
}






