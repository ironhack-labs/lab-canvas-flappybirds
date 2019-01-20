 window.onload = function() {
  
  var game = new Game("#canvas");
   
   // comentar esta linea
   setInterval(function(){
     startGame();
  }, 10)
  // termina comentar

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

    game.drawBackground();
    game.player.draw();
    game.player.setListeners()
    
    // Obstacle.drawImage();
  }

  /**LÓGICA DEL JUEGO**/
  function Game (canvasId){
    this.canvas = document.querySelector(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.img = new Image ();
    this.isGameStart = false;
    this.img.src = "images/bg.png";
    this.player = new Player(this)
  }

  Game.prototype.drawBackground = function (){
    this.ctx.drawImage(this.img, 0, 0, 1000, 700);
  }

  Game.prototype.startGame = function (){
    this.gameStart = true;
    setInterval (function (){
      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      game.player.move()
    }.bind(this), 1000 / 60);
  }
  
  /**PLAYER**/

  function Player (game){
    this.game = game;
    this.x = this.game.canvas.width * 0.2;
    this.y = this.game.canvas.height * 0.8;
    this.img = new Image ();
    this.img.src = "images/flappy.png";
    this.h = 60;
    this.w = this.h * 498 / 351; // calculo el ancho en base a la altura y aspect ratio
    this.speedX = 20;
    this.speedY = 20;
    this.gravity = 4;
    this.gravitySpeed = 1;
    
  }

  Player.prototype.draw = function (){
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  var SPACE = 32;
  Player.prototype.setListeners = function() {
    document.onkeydown = function(event) {
      if (event.keyCode == SPACE) {
        if (this.game.gameStart) {
          console.log("Mira como salto")
          this.y -=15;
          this.gravitySpeed -= 10;
        } else { // El juego no ha empezado
          this.game.startGame()
        }
      } 
    }.bind(this);
  };

  Player.prototype.move = function (){
    var gravity = 0.4;

    this.gravitySpeed += gravity;
    this.y += this.gravitySpeed;
  }

  function Obstacle (game){
    this.game = game;
    this.img = new Image ();
    this.img.src = "images/obstacle_bottom.png";

  }

  Obstacle.prototype.draw = function (){
    this.ctx.drawImage (this.img, 0, 0, 1000, 700);
  }









};
