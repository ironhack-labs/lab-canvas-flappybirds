var myGameArea = new GameArea;
var myPlayer = new Player;

function startGame(){
  myGameArea.clear();
  myGameArea.start();
  animation();
}

function updateEverything(){
  myGameArea.update();
  myPlayer.update();
}

function drawEverything(){
  myGameArea.clear();
  myGameArea.drawBg();
  myPlayer.draw();
}

function animation(){
  updateEverything();
  drawEverything();
  window.requestAnimationFrame(animation)
}

document.getElementById("start-button").onclick = function() {
    startGame();
}

document.onkeydown = function(event){
    event.preventDefault();
    if(event.keyCode === 32) myPlayer.gravitySpeed -= 0.2;
};

document.onkeyup = function(event){
  myPlayer.gravitySpeed += 0.2;
  myPlayer.gravity = 0.1;
}
