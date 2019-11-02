window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000/60)
    obstaclesArray.splice(0);
    points = 0;
    pointCounter = 0;
  }
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
const obstaclesArray = [];
let points = 0;
let pointCounter = 0;
let pointFlag = true;

class Flappy{
  constructor(){
    this.x = 100;
    this.y = canvas.height/2;
    this.vel = 0;
    this.grav = 9.81;
    this.width = 40;
    this.height = 40;
    this.reset = 0;
    this.img = new Image();
    this.img.src = './images/flappy.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    //desciende con una gravedad = 9.8, reinicia la velocidad en y después de invocar a fly()
    this.y= this.y + 0.5 * this.grav * Math.pow((frames-this.reset)/60, 2);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if(this.y+this.height>=canvas.height) {
      gameOver()};
      //frames = 0;
  }

  fly = () => {
    this.y -= 20;
    this.reset = frames;
  }

  collision = (obstacles) =>{

    //Condición para encontrar si Flappy toca un obstáculo
    obstacles.forEach((obst) => {
      if((this.y<=obst.y+obst.height||this.y+this.height>=obst.y+obst.height+obst.ventanita)
      &&(this.x+this.width>=obst.x&&this.x<=obst.x+obst.width)){
        gameOver();
    }
    });
  }
}

class Board{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = './images/bg.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(){
    this.x === -this.width ? this.x = 0 : this.x--
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x+canvas.width, this.y, this.width, this.height);
  }
}

class Obstacle{
  constructor(y){
    this.x = canvas.width + 50;
    this.y = y;
    this.width = 80;
    this.height = canvas.height;
    this.topImg = new Image();
    this.topImg.src = './images/obstacle_top.png';
    this.bottomImg = new Image();
    this.bottomImg.src = './images/obstacle_bottom.png';
    this.ventanita = 80;
  }

  draw() {
    this.x--;
    ctx.drawImage(this.topImg, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.bottomImg, this.x, this.y + this.height + this.ventanita, this.width, this.height);
  }
}

random = ()=> {return Math.floor(Math.random() * 300) -400;}

function generateObst(){
  if(obstaclesArray.length>10){
    obstaclesArray.shift();
    pointCounter--;
  }
  if(frames%300===0){
    obstaclesArray.push(new Obstacle(random()));
  }
  obstaclesArray.forEach((obst)=>obst.draw());
}

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 38:
      myFlappy.fly();
      break;
  }
};

const myFlappy = new Flappy();
const myBoard = new Board();
const oneObstacle = new Obstacle(-250);

function update(){
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myBoard.draw();
  myFlappy.draw();
  generateObst();
  //oneObstacle.draw();
  myFlappy.collision(obstaclesArray);
  getPoints();
}

function gameOver() {
  clearInterval(interval);
  interval = false;
  myFlappy.x = 100;
  myFlappy.y = canvas.height/2;
  myFlappy.reset = 0;
  myBoard.x = 0;
  frames = 0;
  ctx.font = '30px Courier';
  ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);
}

function getPoints() {
  if(myFlappy.x>obstaclesArray[pointCounter].x+obstaclesArray[pointCounter].width){
    points += 10;
    pointCounter++;
  }
  ctx.font = '30px Courier';
  ctx.fillText(`${points} points`, 30, 60);
}