window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    // var pattern = context.createPattern(backImg, 'repeat');
    // ctx.fillStyle = pattern;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    startGame();
  };

  function Game() {
    var addCanvasHTML = document.createElement("canvas");
    addCanvasHTML.setAttribute("id", "canvas");
    document.body.appendChild(addCanvasHTML);

    this.canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.backImg = new Image();
    this.backImg.src = "images/bg.png";

    this.drawBackground = function () {
      this.ctx.drawImage(this.backImg, 0, 0, this.canvas.width, this.canvas.height);
    }
  }


  var game = new Game();

  function Player(game) {
    this.width = 50;
    this.height = 75;
    // this.speedX = 2;
    this.speedY = 10;
    this.gravity = 0.1;
    //this.gravitySpeed = 1;
    this.initialX = game.canvas.width * 0.08;
    this.initialY = game.canvas.height * 0.8;
    this.newY = this.initialY;

    this.playerImg = new Image();
    this.playerImg.src = "images/flappy.png";
  }

  var space = 32;


  Player.prototype.newPos = function () {
    console.log(player.newY);
    // player.gravity *= 1;
    // player.newY += 20;
    document.onkeydown = function (e) {
      if (e.keyCode == space) {
        //player.gravity *= -1;
        player.newY -= 100;
      }
    }
    //this.speedY += this.gravity; //this simulates the gravity effect
    //this.newY += this.speedY; //this updates the newY position
  }

  // Player.prototype.update = function () {
  //   game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  //   game.drawBackground();
  //   this.drawPlayer();
  // }

  Player.prototype.drawPlayer = function () {
    game.ctx.drawImage(this.playerImg, this.initialX, this.newY, this.width, this.height);
  }

  var player = new Player(game);

  function startGame() {

    game.drawBackground();
    //player.setListeners();
    player.newPos();
    //player.update();
    player.drawPlayer();
  }
};
