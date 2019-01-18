window.onload = function () {
  document.getElementById('start-button').onclick = function () {
    startGame();
  };

  function addCanvas() {
    const canvasTag = document.createElement('canvas');
    document.getElementById('game-board').appendChild(canvasTag);
    const canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');
    canvas.setAttribute('width', '450');
    canvas.setAttribute('height', '700');
  }

  function background() {
    const img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
     };
     img.src = '../starter_code/images/bg.png';
  }

  // Game constants
  const FLAPPY_SIZE_X = 50;
  const FLAPPY_SIZE_Y = 35;
  const FLAPPY_X = 350;
  const FLAPPY_Y = 225;
  const SPEED_X = 0;
  const SPEED_Y = 0;
  const GRAVITY_Y = 50;

  function FlappyBirds() {
    this.x = FLAPPY_X;
    this.y = FLAPPY_Y;
    this.width = FLAPPY_X;
    this.height = FLAPPY_Y;
    this.speedX = SPEED_X;
    this.speedY = SPEED_Y;
    this.gravitySpeed = GRAVITY_Y;
  }

  FlappyBirds.prototype.drawFlappy() {
    const flappyImg = new Image();
    flappyImg.onload = function () {
      ctx.drawImage(flappyImg, this.x, this.y);
      ctx.scale(0.1, 0.1);
      ctx.drawImage(flappyImg, this.x, this.y);
    };
    flappyImg.src = '../starter_code/images/flappy.png';
  } 
  
  function startGame() {
    addCanvas();
    background();
    FlappyBirds()
  }
};

