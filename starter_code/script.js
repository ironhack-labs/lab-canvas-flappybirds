window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  const KEY_SPACE = 32;

  function setCanvasDimensions () {
      game.canvas.setAttribute("height", 900)
      game.canvas.setAttribute("width", 900)
  }


  function Game(id) {
    this.canvas =document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.background = new Background(this.canvas, 'images/bg.png', 0 , 0, 1800, 900);
    this.character = new Character(this.canvas, 'images/flappy.png', 100 , 450, 60, 50);
    this.obstacles = [];
    this.fps = 60;
    this.counter = 0;
    this.id;

  }

  Game.prototype.start = function() {

    setCanvasDimensions();

    this.id = setInterval(function(){
      this.clear();
      this.move();
      this.draw();

      this.counter++;
      
      if(this.counter % 200 == 0) {

        var random1 = Math.random() * 450;
        var random2 = Math.random() * 450;
    
        this.obstacles.push(new Obstacle(this.canvas,'images/obstacle_top.png','images/obstacle_bottom.png',900, 0, 900,(900 - random2),random1,random2));
        console.log(this.obstacles);
      }

    }.bind(this),1000/this.fps)
  
  }

  Game.prototype.generateObstacles = function() {
    
  
 
  }

  Game.prototype.draw = function() {

   
      this.background.draw();
      this.obstacles.forEach(function(obstacle){
        obstacle.draw();
      })
      this.character.draw();


  }

  Game.prototype.move = function() {
     this.background.infiniteLoop();
     this.obstacles.forEach(function(obstacle){
       obstacle.move();
     })
  }

  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  function Background(canvas, src, x, y, w, h) {

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = 2;


    this.image.src = src;

  }

  Background.prototype.draw = function() {
    this.ctx.drawImage(this.image, this.x,this.y,this.w,this.h)
    this.ctx.drawImage(this.image, this.x + this.w,this.y,this.w,this.h)
  }

  Background.prototype.infiniteLoop = function () {
      if (this.x > -1200) {
        this.x -= this.vx;
      } else {
        this.x = 0;
      }
  } 

  function Character(canvas, src, x, y, w, h) {

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx;
    this.vy;
    this.gravity;
    this.vg;

    this.image.src = src;
    this.setListeners();

  }

  Character.prototype.draw = function() {
    this.ctx.drawImage(this.image, this.x,this.y,this.w,this.h)
  }

  Character.prototype.update = function() {

  }

  Character.prototype.newPos = function() {

  }

  Character.prototype.setListeners = function() {
    document.onkeydown = function(e) {
      e.preventDefault();
      switch(e.keyCode) {
        case KEY_SPACE: 
        console.log('hola');
          if (this.gravity > 0) {
            console.log(this.gravity);
            this.gravity *= -1;
          } else {
            this.gravity *= -1;
          }
          break;
      }
    }.bind(this);
  }


  function Obstacle(canvas, srcUp,srcDown,x, y, x1, y1, h, h1) {

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.imageUp = new Image();
    this.imageDown = new Image();
    this.x = x;
    this.y = y;
    this.x1 = x;
    this.y1 = y1;
    this.w = 100;
    this.h = h
    this.h1 = h1
    this.vx = 2;

    this.imageUp.src = srcUp;
    this.imageDown.src = srcDown;

  }
  
  Obstacle.prototype.draw = function() {
    this.ctx.drawImage(this.imageUp, this.x,this.y,this.w,this.h)
    this.ctx.drawImage(this.imageDown, this.x1,this.y1,this.w, this.h1)
  

  }

  // 

  Obstacle.prototype.move = function() {
    if (this.x > -100) {
      this.x -= this.vx;
    } else {
      game.obstacles.shift();
    }
  }

  var game = new Game('flapyBird');

  game.start();
  function startGame() {
    clearInterval(game.id);
  }

};
