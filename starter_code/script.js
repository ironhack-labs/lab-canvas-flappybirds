var myGamePiece;
var myBackground;
var fps = 40;
var gravity = 0.02;


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    myGamePiece = new Bird(50*498/351, 50, "images/flappy.png", 50, 50, "image");
    myBackground = new Component(900, 504, "images/bg.png", 0, 0, "background");
    myGameArea.start();
    myGameArea.canvas.focus();
  }

  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 900;
        this.canvas.height = 504;
        this.canvas.tabIndex = 1000;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game-board").appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 1000/fps);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
  }

  function Component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
    this.x = x;
    this.y = y; 
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, this.y, this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image, 
                this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    } 
  }

  function Bird(width, height, color, x, y, type){
    Component.call(this, width, height, color, x, y, type);
    this.gravity = gravity;
    this.gravitySpeed = 0;
    this.newPos = function() {
      if(this.y + this.speedY + this.gravitySpeed < 0){
        this.y = 0;
        this.gravity = gravity;
        this.gravitySpeed = 0;
      } else {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
      }
    } 
  }

  function updateGameArea() {
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();    
    myBackground.update();
    myGamePiece.newPos();    
    myGamePiece.update();
  }

  function accelerate(n) {
    myGamePiece.gravity = n;
  }

  myGameArea.canvas.addEventListener("keydown", function(e) {
    if(e.keyCode == 85){
        accelerate(-0.1);
    }
  });

  myGameArea.canvas.addEventListener("keyup", function(e) {
    if(e.keyCode == 85){
      accelerate(gravity);
    }
  });
}

