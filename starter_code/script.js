const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const PLAYER_WIDTH = 35;
const PLAYER_HEIGHT = 30;
const PLAYER_INITIAL_X = SCREEN_WIDTH / 4;
const PLAYER_INITIAL_Y = SCREEN_HEIGHT / 2;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = SCREEN_HEIGHT - PLAYER_HEIGHT * 4;
const OBSTACLE_FREQUENCY = 240;
const FIRST_OBSTACLE =
  SCREEN_WIDTH - OBSTACLE_FREQUENCY + OBSTACLE_WIDTH + PLAYER_WIDTH;
const FPS = 1000 / 60;

class Scene {
  constructor(img, sounds) {
    this.x = 0;
    this.y = 0;

    this.img = new Image();
    this.img.src = img;

    this.pointSound = new Audio();
    this.pointSound.src = sounds.point;

    this.points = 0;
  }

  draw(ctx) {
    const { img, x, y } = this;

    ctx.drawImage(img, x, y, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.drawImage(img, x + SCREEN_WIDTH, y, SCREEN_WIDTH, SCREEN_HEIGHT);

    if (x < -SCREEN_WIDTH) {
      this.x = 0;
    } else {
      this.x--;
    }
  }

  drawPoints(ctx) {
    if (frames > FIRST_OBSTACLE - 1) {
      const currentFrame = Math.abs(frames - FIRST_OBSTACLE);

      if (currentFrame % OBSTACLE_FREQUENCY === 0) {
        this.pointSound.play();
        this.points++;
      }
    }

    ctx.lineWidth = 2;
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(this.points, SCREEN_WIDTH - 50, 50);
    ctx.strokeText(this.points, SCREEN_WIDTH - 50, 50);
  }

  drawGameOver() {
    ctx.lineWidth = 2;
    ctx.font = 'bold 65px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('Game Over', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    ctx.strokeText('Game Over', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
  }
}

class Hero {
  constructor(img, sounds, x, y) {
    this.x = x;
    this.y = y - PLAYER_HEIGHT / 2;

    this.img = new Image();
    this.img.src = img;

    this.flapsSound = new Audio();
    this.flapsSound.src = sounds.flaps;

    this.diesSound = new Audio();
    this.diesSound.src = sounds.dies;
  }

  draw(ctx) {
    const { img, x, y } = this;

    ctx.drawImage(img, x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.moveY(1);
  }

  moveY(n) {
    let newY = this.y + n;

    newY = Math.min(Math.max(newY, 0), SCREEN_HEIGHT - PLAYER_HEIGHT);

    this.y = newY;
  }

  jump() {
    this.flapsSound.play();
    this.moveY(-20);
  }

  dies() {
    this.diesSound.play();
  }

  checkCollision(obstacle) {
    if (this.y === SCREEN_HEIGHT - PLAYER_HEIGHT) {
      return true;
    }

    return (
      this.x < obstacle.x + obstacle.w &&
      this.x + PLAYER_WIDTH > obstacle.x &&
      this.y < obstacle.y + obstacle.h &&
      this.y + PLAYER_HEIGHT > obstacle.y
    );
  }
}

class Obstacle {
  constructor(img, x, y, w, h) {
    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = img;
  }

  draw(ctx) {
    const { img, x, y, w, h } = this;

    ctx.drawImage(img, x, y, w, h);

    this.x--;
  }
}

class SceneObstacles {
  constructor() {
    this.obstacles = [];
  }

  draw(ctx) {
    const { obstacles } = this;

    obstacles.slice(-10).forEach(obstacle => obstacle.draw(ctx));
  }

  add() {
    const obstacleTopHeight = Math.floor(Math.random() * OBSTACLE_HEIGHT);
    const obstacleBottomHeight = OBSTACLE_HEIGHT - obstacleTopHeight;

    const obstacleTop = new Obstacle(
      assets.images.obstacle.top,
      SCREEN_WIDTH,
      0,
      OBSTACLE_WIDTH,
      obstacleTopHeight
    );
    const obstacleBottom = new Obstacle(
      assets.images.obstacle.bottom,
      SCREEN_WIDTH,
      SCREEN_HEIGHT - obstacleBottomHeight,
      OBSTACLE_WIDTH,
      obstacleBottomHeight
    );

    this.obstacles.push(obstacleTop, obstacleBottom);
  }

  checkCollisions(callback) {
    this.obstacles.slice(-10).some(callback);
  }
}

const render = () => {
  scene.draw(ctx);
  hero.draw(ctx);

  if (frames % OBSTACLE_FREQUENCY === 0) {
    obstacles.add();
  }

  obstacles.draw(ctx);
  scene.drawPoints(ctx);

  obstacles.checkCollisions(obstacle => {
    if (hero.checkCollision(obstacle)) {
      gameOver();
      return true;
    }
  });

  frames++;
};

const startGame = () => {
  if (interval) return;

  frames = 0;

  scene = new Scene(assets.images.background, assets.sounds.board);
  hero = new Hero(
    assets.images.hero,
    assets.sounds.bird,
    PLAYER_INITIAL_X,
    PLAYER_INITIAL_Y
  );
  obstacles = new SceneObstacles();

  interval = setInterval(render, FPS);
};

const gameOver = () => {
  clearInterval(interval);

  hero.dies();
  scene.drawGameOver();

  scene = undefined;
  hero = undefined;
  obstacles = undefined;
  interval = null;
};

const assets = {
  sounds: {
    board: {
      point: 'sounds/point.wav'
    },
    bird: {
      flaps: 'sounds/wing.wav',
      dies: 'sounds/hit.wav'
    }
  },
  images: {
    background: 'images/bg.png',
    hero: 'images/flappy.png',
    obstacle: {
      top: 'images/obstacle_top.png',
      bottom: 'images/obstacle_bottom.png'
    }
  }
};

let interval = null;
let frames, scene, hero, obstacles;

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', startGame);

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 13:
      startGame();
      break;
    case 32:
      if (hero) {
        hero.jump();
      }
      break;
    case 38:
      if (hero) {
        hero.jump();
      }
      break;
  }
});
