window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};
  
var canvas = document.getElementById("example");
var ctx = canvas.getContext('2d'); 


function startGame() {
  updateCanvas();
}


