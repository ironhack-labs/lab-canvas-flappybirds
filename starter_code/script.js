window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").innerHTML = "Restart Game"
      startGame();
    
  };

};
var obstacles= [];
var flappy;
var points=0;
  function startGame() {
    obstacles=[];
    clearInterval(myFlappyArea.interval);
    myFlappyArea.start();
    points=0;
    myFlappyArea.frames=0;

    flappy = new Flappy();
  }
  var background = new Image();
  background.src="images/bg.png";
  var x = 0;

  var myFlappyArea = {
    canvas : document.getElementById("canvas"),
    frames : 0,
    start : function(){
      this.ctx = this.canvas.getContext("2d");
      this.interval = setInterval(updateFlappy, 10);
      
    },
    stop: function(){
      clearInterval(this.interval);

      myFlappyArea.ctx.clearRect(0, 0, 900, 504);
      myFlappyArea.ctx.drawImage(background, x, 0, 900, 504);

      myFlappyArea.ctx.drawImage(background, x+900, 0, 900, 504);
      for (var i = 0; i< obstacles.length; i++){
        obstacles[i].update();
      }
      myFlappyArea.ctx.drawImage(flappy.imgGameOver, flappy.x-20, flappy.y-35, 102, 100);
      myFlappyArea.score();
      console.log("hola")
      
    },
    score: function(){
      this.ctx.font = "18px serif";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Score: "+points, 30, 30);
    }   
  }

  function updateFlappy(){
    if (flappy.y>469){
      myFlappyArea.stop();  
      return;

    }

    for (var p = 0 ; p< obstacles.length; p++){
      if (flappy.crashWith(obstacles[p])) {
        myFlappyArea.stop();
        return;
      }
    }
    myFlappyArea.frames++;
//Si la primera imagen se sale completamente del canvas, se reinicia el x, para comenzar de nuevo
    if (x<-900){
      x=0;
    }
    flappy.y+=(flappy.speedY*flappy.gravity);
    myFlappyArea.ctx.drawImage(background, x, 0, 900, 504);
//se crea una segunda imagen en x+ el width de la imagen
    myFlappyArea.ctx.drawImage(background, x+900, 0, 900, 504);
    x--;

    myFlappyArea.ctx.drawImage(flappy.img, flappy.x, flappy.y, flappy.width, flappy.height);
    if (myFlappyArea.frames>500 && myFlappyArea.frames%150 ===0){

      points ++;
    }
    if (myFlappyArea.frames%150 ===0){

      
      minHeight=50;
      maxHeight=250;
      minGap=100;
      maxGap=200;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1))+minHeight;
      gap = Math.floor(Math.random()*(maxGap-minGap+1))+minGap;
      width=50;
      obstacles.push(new Obstacles(width, height, 900, 0, 0));
      obstacles.push(new Obstacles(width, 504-height-gap, 900, height+gap, 1));
    }

    for (var i = 0; i< obstacles.length; i++){
      obstacles[i].x--;
      obstacles[i].update();
    }

    myFlappyArea.score();
  }

  

  function Flappy(){
    this.width=50;
    this.height=35;
    this.speedX=1;
    this.speedY=1;
    this.gravity=0;
    this.gravitySpeed=0;
    this.img = new Image;
    this.img.src = "images/flappy.png";
    this.imgGameOver = new Image;
    this.imgGameOver.src = "images/flappy-bird-game-over.png";
    this.x = 425;
    this.y = 250;
  }

    

  Flappy.prototype.move = function(){
    if (this.y>50){
      this.y-=40;
    } 
  }

  Flappy.prototype.left = function(){
    return this.x;
  }
  
  Flappy.prototype.right = function(){
    return this.x+50;
  }

  Flappy.prototype.top = function(){
    return this.y;
  }

  Flappy.prototype.bottom = function(){
    return this.y+35;
  }

  Flappy.prototype.crashWith = function(obstacle){
    return !((this.bottom() < obstacle.top())    ||
    (this.top()    > obstacle.bottom()) ||
    (this.right()  < obstacle.left())   ||
    (this.left()   > obstacle.right()))
  }

  document.onkeydown=function(e){
    if (e.keyCode===32){
      flappy.move();
      flappy.gravity=2;
      console.log(obstacles)
    }
  }

  function Obstacles(width, height, x, y, side){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = new Image;
    if (side===0){
      this.img.src="images/obstacle_top.png"
    } else{
      this.img.src="images/obstacle_bottom.png"
    }
    this.update = function(){
      myFlappyArea.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  Obstacles.prototype.left = function(){
    return this.x;
  }
  
  Obstacles.prototype.right = function(){
    return this.x+this.width;
  }

  Obstacles.prototype.top = function(){
    return this.y;
  }

  Obstacles.prototype.bottom = function(){
    return this.y+this.height
  }
