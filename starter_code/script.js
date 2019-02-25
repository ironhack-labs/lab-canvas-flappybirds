window.onload = function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  


  document.getElementById("start-button").onclick = function() {
    startGame();
    Faby();
  };

  function startGame() {
    myGameArea.start();
  };

  var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.canvas.id = "canvas";
        this.context = this.canvas.getContext("2d");
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }
  }

function Faby(width, height, x, y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.img2 = new Image();
  img2.src ="./images/flappy.png";
  imgScale = 159/319;
  this.update = function() {
    ctx = myGameArea.ctx;
    ctx.drawImage(img2, 365, 615, 150*imgScale, 150);
  }
};

function update() {
  hitBottom();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  faby.vy = faby.vy + (gravity - faby.userPull);
  faby.y += faby.vy;
  console.log(faby.vy, faby.y)
  faby.x += faby.vx
  faby.draw()
}

function hitBottom () {
  var rockbottom = rockbottom - canvas.height;
    if (faby.y > rockbottom) {
      faby.y = rockbottom;
      clearInterval(intervalId)
    }
  }

var intervalId = setInterval(update, 20);


document.onkeydown = function(e) {
  if(e.keyCode == 32){
    faby.userPull = 0.3;
  }           
}

document.onkeyup = function(e) {
  if (e.keyCode == 32) {
    faby.userPull = 0;
  }
}

};
