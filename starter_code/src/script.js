// Setting up Canvas Element //
var canvas = document.createElement("canvas");
document.getElementById("game-board").appendChild(canvas); 
var ctx = canvas.getContext("2d");
var width = "900px";
var height = "504px";
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
var img = new Image();
img.src = "images/bg.png";


// Background //

var background = {
  img: img,
  x: 0,
  speed: -1,
  move: function(){
    this.x += this.speed;
    this.x %= canvas.width;
  },
  draw: function(){
    ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
}

function updateCanvas(){
  for (i = 0; i < obArray.length; i += 1) {
    if (b1.checkCrash(obArray[i])) {
        gameover();
        return;
    } 
  }
  background.move();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  background.draw();
  b1.draw();  

  for(var i = 0; i < obArray.length; i++){
    obArray[i].draw();
  }

  for(var i = 0; i < obArray.length; i++){
    if(i % 2){
      obArray[i].topMove();
    } else {
      obArray[i].boMove();
    }
  }

}

// startbutton & stopbutton
startButton =  document.getElementById("start-button");
stopButton = document.getElementById("stop-button");

startButton.onclick = function() {
  console.log("start");
  intervalId = setInterval(function() {
  updateCanvas(); 
  }, 1000/100)
};

stopButton.onclick = function() {
  console.log("stop");
  clearInterval(intervalId);
}

// function updateGameArea() {
//   for (i = 0; i < obArray.length; i += 1) {
//       if (b1.checkCrash(obArray[i])) {
//           gameover();
//           return;
//       } 
//   }
// }

function gameover(){
  ctx.font = "60px arial";
  ctx.fillStyle = "red"
  ctx.fillText("Game Over!", 300, 200);
}

// function checkCrash(bird, obstacle){
//   return ((bird.bottom() < obstacle.top()) ||
//   (bird.top()  > obstacle.bottom()) ||
//   (bird.right() < obstacle.left()) ||
//   (bird.left() > obstacle.right())) 
// }

// console.log(b1);
// console.log(obArray[0]);
// console.log(checkCrash(b1,obArray[0]));
// var checkCrash1 = checkCrash(b1,obArray[0]);
// var checkCrash2 = checkCrash(b1,obArray[1]);
// var checkCrash3 = checkCrash(b1,obArray[2]);
// var checkCrash4 = checkCrash(b1,obArray[3]);

// if(checkCrash1 || checkCrash2 || checkCrash3 || checkCrash4){
//   gameover();
// }


// var test1 = 1 > 2; // false 
// var test2 = 3 > 1; // true

// if(test2){
//   console.log("hello");
// }
// if(test1){
//   console.log("hello");
// }
// if(test2 || test1){
//   console.log("hello");
// }

