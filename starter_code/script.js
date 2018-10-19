let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
var bg = new Background(ctx, 'images/bg.png', 1)
let on = false;
let intervalId;
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    if(!on){
      intervalId = setInterval(function(){
        update();
        drawEverything();
      }, 1000/60);
      on = true;
    } else {
      on = false;
      clearInterval(intervalId);
    }
  }
  
};

function update() {
    bg.update();
}

function drawEverything() {
    bg.draw();
}