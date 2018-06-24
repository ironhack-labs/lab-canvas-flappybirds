var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Crash(){
  this.gameover = function() {
    if (flappy.y < 0 || flappy.y > 435) {
      ctx.font = '50px serif';
      ctx.fillStyle = 'black';
      ctx.fillText("GAME OVER", 310, 250); 
      return true;
    }
    return false;
  }
}

var crash = new Crash();