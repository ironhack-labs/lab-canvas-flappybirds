var img = new Image();
img.src = "./images/bg.png";
var flappyImg = new Image();
flappyImg.src = "./images/flappy.png";
var imgScale = 498 / 351;
var wallTop = new Image();
wallTop.src = "./images/obstacle_top.png";
var wallBottom = new Image();
wallBottom.src = "./images/obstacle_bottom.png";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    //updateCanvas();
  };

  function startGame() {
    updateCanvas();
  }
};

var backgroundImage = {
  img: img,
  x: 0,
  speed: -2,

  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function() {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  }
};

var player = {
  x: 15,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speedX: 5,
  speedY: 5,
  gravity: 0.7,
  gravitySpeed: 1,

  move: function(direction) {
    if (direction === "space") {
      this.y -= this.speedY;
    }
    this.x = Math.min(canvas.width - this.width, Math.max(0, this.x));
    this.y = Math.min(canvas.height - this.height, Math.max(0, this.y));
  },
  update: function() {
    this.y += this.gravity;
  },

  draw: function() {
    ctx.drawImage(flappyImg, this.x, this.y, 50 * imgScale, 50);
  }

  // isColliding: function(wall) {
  //   return (
  //     this.x < wall.x + wall.w &&
  //     this.x + this.width > wall.x &&
  //     this.y < wall.y + wall.h &&
  //     this.height + this.y > wall.y
  //   );
  // },

  //   isDead: function(walls) {
  //     return walls.some(this.isColliding.bind(this));
  //   }
};

function updateCanvas() {
  Object.keys(keysPressed).forEach(function(direction) {
    if (keysPressed[direction]) {
      player.move(direction);
    }
  });
  obstacles.move();
  player.update();
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  player.draw();
  obstacles.draw();

  requestAnimationFrame(updateCanvas);
}

var keysPressed = {
  space: false
};

var SPACE_KEY = 32;

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case SPACE_KEY:
      keysPressed.space = true;
      break;
  }
};

document.onkeyup = function(event) {
  switch (event.keyCode) {
    case SPACE_KEY:
      keysPressed.space = false;
      break;
  }
};

var obstacles = {
  walls: [],
  width: 40,
  speed: 10,
  maxSpace: 450,
  minSpace: 175,

  createWall: function() {
    var space = Math.random() * (this.maxSpace - this.minSpace) + this.minSpace;
    var posY = Math.random() * (canvas.height - space);

    //ctx.drawImage(flappyImg, this.x, this.y, 50 * imgScale, 50);
    this.walls.push({
      image: wallTop,
      x: canvas.width,
      y: 0,
      w: this.width,
      h: posY
    });

    this.walls.push({
      image: wallBottom,
      x: canvas.width,
      y: posY + space,
      w: this.width,
      h: canvas.height - posY - space
    });
  },

  moveWall: function(wall) {
    wall.x -= this.speed;
  },

  move: function() {
    this.walls.forEach(this.moveWall.bind(this));
  },

  drawImage: function(wall) {
    //ctx.drawImage(flappyImg, this.x, this.y, 50 * imgScale, 50);
    ctx.drawImage(wall.image, wall.x, wall.y, wall.w, wall.h);
  },

  draw: function() {
    ctx.fillStyle = "green";
    this.walls.forEach(this.drawImage);
  }
};

setInterval(function() {
  obstacles.createWall();
}, 500);
