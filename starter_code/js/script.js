var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');
canvas.height = 504;
canvas.width = 900;
var height = canvas.height;
var width = canvas.width;
var bg = new Background(ctx, './images/bg.png', 2,);
var player = new Faby(ctx, './images/flappy.png', 'speedx', 'speedy', 'gravity', 'gravitySpeed', 50, 200 );


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").style.display = 'none';
    startGame();
  };
  
  function startGame() {
    document.querySelector('#game-board').appendChild(canvas);
   
    setInterval(()=> {
      update();
      drawEverything();
    }, 1000/60);
  }
};



function drawEverything() {
  ctx.clearRect(0, 0, width, height)
  bg.draw() 
  player.draw() 

  
}

function update() {
  bg.update()
  player.update();
  
}

