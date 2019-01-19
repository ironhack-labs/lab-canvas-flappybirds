var myGameArea = new GameArea;
var myPlayer = new Player();
var myObstacles = [];

//adding two pipes with the gap in a random height
function addObstacle(){
  var gap = 180;
  var minHeight = 100;
  var maxHeight = 440;
  var heightTop = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
  var heightBottom = myGameArea.canvas.height - heightTop - gap;
  myObstacles.push(new Obstacle (heightTop, heightBottom))
}

//starting game by clearing the canvas, 
//setting the player to the default values,
//initiating a canvas and starting the animation
function startGame(){
  myGameArea.clear();
  myPlayer.clear();
  myGameArea.start();
  animation();
}

//animation
var myAnimation;
function animation(){
  updateEverything();
  drawEverything();
  myAnimation = window.requestAnimationFrame(animation);
  //stop the game if flappy crashed into a pipe or the bottom
  var crashed = myObstacles.some(function(obstacle){
    return myPlayer.crashWith(obstacle);
  })
  if (crashed || myPlayer.outOfGrid()) {
    window.cancelAnimationFrame(myAnimation);
    myGameArea.ctx.font = "30px SansSerif"
    myGameArea.ctx.fillText("GAME OVER",150,350)
  }
}

function updateEverything(){
  myGameArea.update();
  myPlayer.update();
  myGameArea.frames ++;
  if (myGameArea.frames % 200 === 0){
    addObstacle();
  }
}

function drawEverything(){
  myGameArea.clear();
  myGameArea.drawBg();
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].update();
    myObstacles[i].draw();
  }
  myPlayer.draw();
}

document.getElementById("start-button").onclick = function() {
    startGame();
}

document.onkeydown = function(event){
    event.preventDefault();
    if(event.keyCode === 32) 
      myPlayer.gravity = -10;
      myPlayer.direction = 1;
};

document.onkeyup = function(event){
  myPlayer.gravity = 0.1;
  myPlayer.direction = 0;
}
