window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  const KEY_SPACE = 32;

  const width = 1200;
  const height = 600;


  function Game(id) {
    this.canvas =document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.background = new Background(this.canvas, 'images/bg.png', 0 , 0, width*2, height);
    this.character = new Character(this.canvas, 'images/flappy.png', 100 , height/2, 40, 30);
    this.obstacles = [];
    this.fps = 60;
    this.counter = 0;
    this.id;

  }

  Game.prototype.start = function() {

  
    this.id = setInterval(function(){
      // this.clear();
      this.move();
      this.draw();
      this.gravity();

      this.counter++;
      
      if(this.counter % 100 == 0) {

        var random1 = ((Math.random() * height/2)- game.character.h);
        var random2 = ((Math.random() * height/2) - game.character.h);
    
        this.obstacles.push(new Obstacle(this.canvas,'images/obstacle_top.png','images/obstacle_bottom.png',width, 0, width,(height - random2),random1,random2))
      }

    }.bind(this),1000/this.fps)
  
  }


  Game.prototype.draw = function() {

   
      this.background.draw();
      this.obstacles.forEach(function(obstacle){
        console.log(obstacle);
        obstacle.draw();

        if( game.character.x+game.character.w >= obstacle.x && obstacle.x+obstacle.w >= game.character.x &&
          game.character.y+game.character.h >= obstacle.y && obstacle.y+obstacle.h >= game.character.y
        ){
          stopGame();
        }

        if( game.character.x+game.character.w >= obstacle.x && obstacle.x+obstacle.w >= game.character.x &&
          game.character.y+game.character.h >= obstacle.y1 && obstacle.y1+obstacle.h2 >= game.character.y
        ){
          stopGame();
        }

      })
      this.character.draw();


  }

  Game.prototype.move = function() {
     this.background.infiniteLoop();
     this.obstacles.forEach(function(obstacle){
       obstacle.move();
     })
  }

  Game.prototype.gravity = function() {
    this.character.update();
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
    this.vx = 4;


    this.image.src = src;

  }

  Background.prototype.draw = function() {
    this.ctx.drawImage(this.image, this.x,this.y,this.w,this.h)
    this.ctx.drawImage(this.image, this.x + this.w,this.y,this.w,this.h)
  }

  Background.prototype.infiniteLoop = function () {
      if (this.x > -width*2) {
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
    this.vy = 2;
    this.vx = 0;
    this.gravity = 0.35;
    this.userPull = 0;
    this.vg;

    this.image.src = src;
    this.setListeners();

  }

  Character.prototype.draw = function() {
    this.ctx.drawImage(this.image, this.x,this.y,this.w,this.h)
  }

  Character.prototype.update = function() {
      this.vy += this.gravity - this.userPull;
      this.y += this.vy;
      this.x += this.vx
  }

  Character.prototype.newPos = function() {

  }

  Character.prototype.setListeners = function() {
    document.onkeydown = function(e) {
      e.preventDefault();
      switch(e.keyCode) {
        case KEY_SPACE: 
            this.userPull = 0.6;
            this.gravity *= -1;
            break;
      }
    }.bind(this);

    document.onkeyup = function(e) {
      this.userPull = 0.6;
      e.preventDefault();
      switch(e.keyCode) {
        case KEY_SPACE: 
            this.userPull = 0;
            this.gravity *= -1;
          break;
      }
    }.bind(this);


  }


  function Obstacle(canvas, srcUp,srcDown,x, y, x1, y1, h, h2) {

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.imageUp = new Image();
    this.imageDown = new Image();
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.w = 100;
    this.h = h
    this.h2 = h2
    this.vx = 5;

    this.imageUp.src = srcUp;
    this.imageDown.src = srcDown;

  }
  
  Obstacle.prototype.draw = function() {
    this.ctx.drawImage(this.imageDown, this.x,this.y1,this.w, this.h2)
    this.ctx.drawImage(this.imageUp, this.x,this.y,this.w,this.h)

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

  }

  function stopGame() {
    clearInterval(game.id);
  }

};
