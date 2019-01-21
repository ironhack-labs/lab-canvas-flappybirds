function addCanvas() {
  const newCanvas = document.createElement('canvas');
  const oldDiv = document.getElementById('game-board');
  oldDiv.appendChild(newCanvas);
  document.getElementsByTagName('canvas')[0].setAttribute('id', 'flappy-bird');
  document.getElementsByTagName('canvas')[0].setAttribute('width', '800');
  document.getElementsByTagName('canvas')[0].setAttribute('heigth','800');
}


function startGame() {
  const canvas = document.getElementById('flappy-bird');
  const ctx = canvas.getContext('2d');
  const height = canvas.height;
  const width = canvas.width;
  
  function drawBackground() {
    const img = new Image();
    img.onload = function camp() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = 'images/bg.png';
  }
  drawBackground();

  const bird = {
    x: 540,
    y: 70,
    xv: 5,
    yv: 2
  };

  function drawFaby() {
    const img = new Image();
    img.onload = function screeGame() {
      ctx.drawImage(img, bird.x, bird.y, 80, 15);
    };
    img.src = 'images/flappy.png';
  }
  drawFaby();

  //function update() {
  //  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //  bird.update();
  //  bird.x += bird.vx;
  //  bird.y += bird.vy;
  //  raf = window.requestAnimationFrame(update);
  //  }
 
// bird.update();

  //function newPosition() {
    
 // } 
}

window.onload = function button() {
  document.getElementById('start-button').onclick = function press() {
    addCanvas();
    startGame();
  };
};

