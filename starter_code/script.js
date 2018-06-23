window.onload = function() {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.setAttribute('height', 800);
  canvas.setAttribute('width', 1200);
  
  var prevTime = 0;
  var background = new Background();
  var flappy = new Flappy();
  var obstacle = new Obstacle(300,300);

  function Flappy(){
    this.x = 150;
    this.y = 400;
    this.vx = 0;
    this.vy= 0; //m/s
    this.width = 50 * 498/351;
    this.height = 50
    this.img = new Image();
    this.img.src = 'images/flappy.png';
    this.img.rel = 498/351;
    this.gravity = 30; // m/s
    this.gravitySpeed = 0;
  }

  Flappy.prototype.draw = function(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height );
  }

  Flappy.prototype.jump = function(){
    this.vy = -700;
  }

  Flappy.prototype.newPos = function(frameTime){
    this.y += this.vy * frameTime / 1000;
  }

  Flappy.prototype.fall = function(){
    this.vy += this.gravity;
  }

  function Background(){
    this.img = new Image();
    this.img.src = 'images/bg.png';
    this.img.imgRel = 900/504;
    this.x = 0;
    this.y = 0;
    this.vx = 5;
  }
  Background.prototype.draw = function() {
    ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, canvas.width, canvas.height);
  };

  Background.prototype.move = function(){
      this.x -= this.vx;
      if (this.x < -canvas.width) this.x = 0;
  };

  function Obstacle(holePosition, holeSize){
    this.imgBot = new Image();
    this.imgBot.src = 'images/obstacle_bottom.png';
    this.imgTop = new Image();
    this.imgTop.src = 'images/obstacle_top.png';
    this.x = canvas.width;
    this.y = 0;
    this.vx = 5;
    this.height = 793;
    this.width = 138;
    this.holePosition = holePosition;
    this.holeSize = holeSize;
  }

  Obstacle.prototype.draw = function(){
    ctx.drawImage(this.imgTop, this.x, this.holePosition - this.height, this.width, this.height);
    ctx.drawImage(this.imgBot, this.x, (this.holePosition) + this.holeSize, this.width, this.height);
  }

  Obstacle.prototype.move = function(){
    this.x -= this.vx;
  }

  var obstacleArray = [];
  function createRandomObstacle(arr){
    var randomHolePosition = Math.random()*canvas.height;
    if(randomHolePosition> canvas.height - 300){
      randomHolePosition = canvas.height - 300;
    }
    arr.push(new Obstacle(randomHolePosition,300));
  }

  function moveObstacles(){
    for (var i= 0; i < obstacleArray.length; i++){
      obstacleArray[i].move();
    }
  }

  function drawObstacleAll(){
    for (var i = 0; i < obstacleArray.length; i++){
      obstacleArray[i].draw();
    }
  }

  function checkCollision(){
    for( var i =0; i < obstacleArray.length; i++){
      if(((flappy.x + flappy.width >= obstacleArray[i].x && flappy.x + flappy.width < obstacleArray[i].x + obstacleArray[i].width) ||
        (flappy.x >= obstacleArray[i].x && flappy.x < obstacleArray[i].x + obstacleArray[i].width)) && 
        ((flappy.y <= obstacleArray[i].holePosition) || flappy.y + flappy.height >= obstacleArray[i].holePosition + obstacleArray[i].holeSize )
      ){
        alert('You lose. Final Score: ' +scoreCounter);
      }
    }
   
    if(flappy.y > canvas.height){
      alert('You lose. Final Score: ' +scoreCounter);
    }
  }
  var scoreCounter = 0;
  function drawScore(){
    ctx.save()
    ctx.font = "24px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText('Score: ' +scoreCounter, 10, 30);
    ctx.restore()
  }
  
  function drawAll(){
    background.draw();
    flappy.draw();
    drawObstacleAll();
    drawScore();
  }

  function animateAll(delta){
    background.move();
    flappy.fall();
    flappy.newPos(delta);
    moveObstacles();
  }

  function startGame() {
    document.getElementById('game-board').appendChild(canvas);
    drawAll();
  }

  var frameCounter = 125;
  function updateCanvas(time){
    checkCollision();
    scoreCounter++;
    frameCounter++;
    if( frameCounter > 125){
      createRandomObstacle(obstacleArray);
      frameCounter = 0;
    }
    var delta = time - prevTime;
    prevTime = time;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    animateAll(delta);
    drawAll();
    window.requestAnimationFrame(updateCanvas);
  }
  
  document.getElementById("start-button").onclick = function() {
    
    startGame();
    window.requestAnimationFrame(updateCanvas);

  };

  document.addEventListener('keydown',function(e){
    e.preventDefault();
    if(e.keyCode == 32){
      flappy.jump();
    }
  });

};
