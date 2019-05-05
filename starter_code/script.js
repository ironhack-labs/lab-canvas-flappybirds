window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    FlappyGame.init("canvasId");
  }
};

const FlappyGame = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  keys: { TOP_KEY: 38, SPACE: 32 },
  framesCounter: 0,

  init: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.setHandlers();
    this.start();
  },
  setDimensions: function() {
    this.canvas.setAttribute("width", window.innerWidth) * 0.8;
    this.canvas.setAttribute("height", window.innerHeight * 0.6);
    this.winH = window.innerHeight;
    this.winW = window.innerWidth;
  },
  setHandlers: function() {
    window.onresize = () => this.setDimensions();
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function() {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.obstacles.forEach(function(obstacle) {
      obstacle.draw();
    });
  },

  moveAll: function() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function(obstacle) {
      obstacle.move();
    });
  },

  start: function() {
    this.fps = 60;

    this.reset();

    this.interval = setInterval(() => {
      this.clear();

      this.framesCounter++;

      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      // controlamos la velocidad de generación de obstáculos
      if (this.framesCounter % 50 === 0) {
        this.generateObstacle();
      }

      this.score += 0.01;

      this.moveAll();
      this.drawAll();

      // eliminamos obstáculos fuera del canvas
      this.clearObstacles();

      if (this.isCollision()) {
        this.gameOver();
      }
    }, 1000 / this.fps);
  },

  gameOver: function() {
    this.stop();

    if (confirm("game over. PLAY AGAIN?")) {
      this.reset();
      this.start();
    }
  },

  stop: function() {
    clearInterval(this.interval);
  },
  reset: function() {
    this.background = new Background(
      this.canvas.width,
      this.canvas.height,
      this.ctx
    );
    this.player = new Player(
      this.canvas.width,
      this.canvas.height,
      this.ctx,
      this.keys
    );
    this.obstacles = [];
  },
  isCollision: function() {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    // esto chequea que el personaje no estén en colisión con cualquier obstáculo
    return this.obstacles.some(obstacle => {
      return (
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.h - 20) >= obstacle.y
      );
    });
  },
  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
  },
  //generamos nuevos obstáculos
  generateObstacle: function() {
    this.obstacles.push(new Obstacle(this.canvas.width, this.ctx));
  }
};

class Background {
  constructor(w, h, ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "images/bg.png";
    this.h = h;
    this.w = w;

    this.x = 0;
    this.y = 0;

    this.dx = 10;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.dx;

    if (this.x < -this.w) this.x = 0;
  }
}

class Player {
  constructor(w, h, ctx, keys) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.keys = keys;
    this.x = this.canvasW * 0.08;

    this.y0 = this.canvasH * 0.8;
    this.y = this.y0;

    this.img = new Image();
    this.img.src = "images/flappy.png";

    this.img.frames = 3;
    this.img.frameIndex = 0;

    this.w = 80;
    this.h = 60;

    this.vy = 1;
    this.setListeners();
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  setListeners() {
    document.onkeydown = function(event) {
      if (event.keyCode === this.keys.TOP_KEY) {
        this.y -= 5;
        this.vy -= 10;
      }
    }.bind(this);
  }

  move() {
    var gravity = 0.4;

    if (this.y >= this.y0) {
      this.vy = 1;
      this.y = this.y0;
    } else {
      this.vy += gravity;
      this.y += this.vy;
    }
  }
}

class Obstacle {
  constructor(w, ctx) {
    this.ctx = ctx;
    this.w = 35;
    this.h = Math.floor(Math.random() * 200) + 50;
    this.dx = 10;
    this.x = w;
    this.y = FlappyGame.winH * 0.6 - this.h - 4;
    this.imgBottom = new Image();
    this.imgTop = new Image();
    this.imgBottom.src = "images/obstacle_bottom.png";
    this.imgTop.src = "images/obstacle_top.png";
  }

  draw() {
    this.ctx.drawImage(this.imgBottom, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.imgTop, this.x, 0, this.w, this.h);
  }

  move() {
    this.x -= this.dx;
  }
}
