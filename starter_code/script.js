window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  var canvas = document.querySelector("#canvas");
  var ctx = canvas.getContext('2d');

  var arrPipe = [];
  var polluelo = {
    posX: 150,
    posY: 350,
    width: 50,
    heigth: 50,
    speedX: 0,
    speedY: 1.02,
    gravity: 0,
    gravitySpeed: 0,
    update: function(){
    },
    newPos:function(){
    }
  } 

  function startGame() {
    doIt();
  }

  function drawBack(){
    var imagenBack = new Image();
    imagenBack.src = "images/bg.png";
    ctx.drawImage(imagenBack,0,0,1600,700);
  }

  function drawPollo(){
    var imagenPollo = new Image();
    imagenPollo.src = "images/flappy.png";
    ctx.drawImage(imagenPollo,polluelo.posX,polluelo.posY,polluelo.width,polluelo.heigth)
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
  function doIt(){

    setInterval(function(){
      ctx.clearRect(0,0,1600,700);
      drawBack();
      drawPollo();
      drawPipes();
      for(var i = 0; i < arrPipe.length; i++){
        arrPipe[i][0].posX--
        arrPipe[i][1].posX--
      }
    },1000/60);
    
    setInterval(function(){
      createPipelines();
    },10000)
  }
  createPipelines();
  
  function createPipelines(){
    var pipeTop = new PipelineTop();
    var pipeBot = new PipelineBot();
    pipeTop.heigth = Math.random()*300 + 100  ;
    pipeBot.posY = pipeTop.heigth + 200;
    pipeBot.heigth = 700 - pipeBot.posY;
    arrPipe.push([pipeTop,pipeBot]);
  }

  function PipelineTop(){
    this.width = 200;
    this.heigth = 0;
    this.posX = 1600;
    this.posY = 0;
  }

  function PipelineBot(){
    this.width = 200;
    this.heigth = 0;
    this.posX = 1600;
    this.posY = 0;
  }

  document.onkeydown = function(e){
    console.log("entra");
    if(e.keyCode == 32) polluelo.newPos();
  }

};
