var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 

function Score(){
  this.points = 0;
  this.draw = function() {
    this.points += 0.1;
    ctx.font = '20px serif';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: '+Math.floor(this.points), 410, 50);
  }
}
var score = new Score();
