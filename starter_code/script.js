const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
let interval;
let frames = 0;
let obstacles = [];
let score=0;
let gameover=false;

const images={
  background:"./images/bg.png",
  flappy: "./images/flappy.png",
  logo:"./images/logo.png",
  obtaculo_arr:"./images/obstacle_bottom.png",
  ostaculo_abj:"./images/obstacle_top.png"
};

class background{
  constructor(){
    this.x=0;
    this.y=0;
    this.width=canvas.width;
    this.height=canvas.height;
    this.img=new Image();
    this.img.src=images.background;
    this.img.onload=()=>{
      this.draw();
    }
  }
  draw(){
    this.x--
    if (this.x < -canvas.width) this.x = 0
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height);
  }
}
class bird{
  constructor(){
    this.x = 50;
    this.y = 50;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = images.flappy;
    this.img.onload=()=>{
      this.draw();
    }
  }
  draw() {
    this.y+=2;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  fly() {
    this.y -= 25;
  }
  isTouching(tubo){
    return (
      this.x < tubo.x + tubo.width &&
      this.x + this.width > tubo.x &&
      this.y < tubo.y + tubo.height &&
      this.y + this.height > tubo.y
    )
  }
}

class tubo{
  constructor(y,height,imagenType) {
    this.x=canvas.width;
    this.y=y;
    this.height=height;
    this.width=canvas.width/5;
    this.imagen1=new Image();
    this.imagen2=new Image();
    this.imagen1.src=images.obtaculo_arr;
    this.imagen2.src=images.ostaculo_abj;
    this.imagenType=imagenType;
  }
  draw(){
    this.x--
    if(this.imagenType)
      ctx.drawImage(this.imagen1, this.x, this.y, this.width, this.height);
    else
      ctx.drawImage(this.imagen2, this.x, this.y, this.width, this.height);
  }
}

function generarTubo(){
  if(frames%300===0){
    const randomHeight = Math.floor(Math.random() * (200)) + 100;
    obstacles.push(new tubo(0, randomHeight, false));
    obstacles.push(new tubo(randomHeight + 105, canvas.height - randomHeight, true));
  }
}

function drawTubo() {
  obstacles.forEach(tubo => tubo.draw());
}

function drawScore(){
  ctx.fillStyle="white";
  ctx.font="30px Courier New";
  ctx.fillText("Puntuación:" + score, 0,30);
}


const ave=new bird();
const fondo=new background();

function collitions(bird){
  if(bird.y>=canvas.height - bird.height)
    return gameOver();
  obstacles.forEach((tubo,i)=>{
    if(tubo.x+tubo.width<=0){
      score+=0.5;
      obstacles.splice(i,1);
    }
    bird.isTouching(tubo) ? gameOver() : null;
  })
  
}

function gameOver(){
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fondo.draw();
  ave.draw();
  drawTubo();
  gameover=true;
  ctx.fillStyle = "red";
  ctx.font = "30px Courier New";
  ctx.fillText("GAME OVER", 125, 200);
  ctx.font = "20px Courier New";
  ctx.fillStyle = "black";
  ctx.fillText("TU PUNTUACION ES: "+score, 90, 250);
  ctx.fillText("PRESIONA ENTER PARA CONTINUAR", 30, 300);
}

function update() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fondo.draw();
  ave.draw();
  generarTubo();
  drawTubo();
  drawScore();
  collitions(ave);
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    interval = setInterval(update, 1000 / 60);
  }

  function restartGame(bird){
  	if (gameover) {
    	obstacles = [];
    	frames = 0;
    	score = 0;
    	bird.y=50;
    	gameover=false;
    	startGame();
	}
  }
  window.onkeydown = function({keyCode}){
    switch(keyCode){
      case 32: return ave.fly();
      case 13: return restartGame(ave);
    }
  }
};