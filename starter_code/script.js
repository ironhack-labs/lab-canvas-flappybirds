window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  

    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    var arrPipe = [];

    function startGame() {
      drawBackground();
      drawBird();
      pipesMovement();
    }

  function drawBackground() {
    var image = new Image();
    image.src = 'images/bg.png';
    ctx.drawImage(image, 0, 0, 1400, 800);
  }

  function drawBird() {
    var imageFlappy = new Image();
    height = 50;
    width = 60;
    posX = 0;
    posY = 0;

    speedX = 0;
    speedY = 0;
    gravity = 0;
    gravitySpeed = 0;

    imageFlappy.src = 'images/flappy.png';
    ctx.drawImage(imageFlappy, 300, 400 + 100, width, height);
  }

  function drawPipes(){
    var imgPTop = new Image();
    var imgPBot = new Image();
    imgPTop.src = "images/obstacle_top.png"
    imgPBot.src = "images/obstacle_bottom.png"
    for(var i = 0; i < arrPipe.length; i++){
      ctx.drawImage(imgPTop,arrPipe[i][0].posX,arrPipe[i][0].posY,arrPipe[i][0].width,arrPipe[i][0].heigth)
      ctx.drawImage(imgPBot,arrPipe[i][1].posX,arrPipe[i][1].posY,arrPipe[i][1].width,arrPipe[i][1].heigth)
    }
  }
  
  function pipesMovement(){
    setInterval(function(){
      ctx.clearRect(0,0,1400,800);
      drawBackground();
      drawBird();
      drawPipes();
      for(var i = 0; i < arrPipe.length; i++){
        arrPipe[i][0].posX--
        arrPipe[i][1].posX--
      }
    },1000/60);
  
    setInterval(function(){
      createPipelines();
    },10000)
    createPipelines();
  }

  function createPipelines(){
    var pipeTop = new PipelineTop();
    var pipeBot = new PipelineBot();
    pipeTop.heigth = Math.random()*300;
    pipeBot.posY = pipeTop.heigth + 200;
    pipeBot.heigth = 800 - pipeBot.posY;
    arrPipe.push([pipeTop,pipeBot]);
  }


  function PipelineTop(){
    this.width = 200;
    this.heigth = 0;
    this.posX = 1400;
    this.posY = 0;
  }

  function PipelineBot(){
    this.width = 200;
    this.heigth = 0;
    this.posX = 1400;
    this.posY = 0;
  }
}
// var background = {
//   img: bck,
//   x: 0,
//   speed: -1,

//   move: function () {
//     this.x += this.speed;
//     this.x %= myGame.canvas.width;
//   },

//   draw: function () {
//     ctx.drawImage(this.img, this.x, 0);
//     if (this.speed < 0) {
//       ctx.drawImage(this.img, this.x + myGame.canvas.width, 0);
//     } else {
//       ctx.drawImage(this.img, this.x - this.img.width, 0);
//     }
//   },
// };