
//BACKGROUND CANVAS ANIMATION------------------------------------------------------------------------------------------------

const img = new Image();
img.src = './images/bg.png';

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//---------------------------------------------------------------------------------------------------------------------------

const backgroundImage = {
  img: img,
  x: 0,
  speed: +1,
  move: function() {
    this.x -= this.speed;
    this.x %= canvas.width
  },
  draw: function() {
    ctx.drawImage(this.img, this.x, 0, 900,500);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x - canvas.width,0);
    } else {
      ctx.drawImage(this.img, this.x + canvas.width, 0 );
    }
  },
  clear: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
};

function updateCanvas() {
  backgroundImage.move();
  backgroundImage.draw();
  requestAnimationFrame(updateCanvas);
}

//BIRD AND OBSTACLE CONSTRUCTOR-----------------------------------------------------------------------------------------------

const img1 = new Image();
img1.src = './images/flappy.png';

class Component {
  constructor(width, height, fill, x, y, speedX, speedY, gravity, gravitySpeed) {
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.gravity=gravity;
    this.gravitySpeed=gravitySpeed;

  }
  move(){ //bird move
    this.gravitySpeed += this.gravity;
    this.x+=this.speedX;
    this.y+=this.speedY+this.gravitySpeed; 
  }
  newPos(){ //obstacle move
    this.x+=this.speedX;
    this.y+=this.speedY;
  }
  draw(){ //bird / obstacle draw
    const canvas1 = document.getElementById('my-canvas');
    const ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(this.fill, this.x, this.y, this.width, this.height);  
  }
  update(){ //finishing line draw
    const canvas2 = document.getElementById('my-canvas');
    const ctx2 = canvas2.getContext('2d');
    ctx2.fillStyle = this.fill;
    ctx2.fillRect(this.x, this.y, this.width, this.height);
  }
  left() {
      return this.x;
  }
  right() { 
      return this.x + this.width; 
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }  
  crashWith(obstacle) {
    return !(this.bottom() < obstacle.top() || 
    this.top() > obstacle.bottom() || 
    this.right() < obstacle.left() || 
    this.left() > obstacle.right());
    }
  hitBottom(){
    let rockbottom = canvas.height - this.width;
      if (this.y > rockbottom) {
        this.y = rockbottom;
      }
  }
}

//-----------------------------------------------------------------------------------------------------------------------

const newBird = new Component(50, 50, img1, 200, 250, 0, 0, 0.05, 0);

//-----------------------------------------------------------------------------------------------------------------------

const img2 = new Image();
img2.src = './images/obstacle_bottom.png'

const img3 = new Image();
img3.src = './images/obstacle_top.png'

let obsWidth, obsHeight, obsPosX, obsPosY,obsSpeedX

let height1 =  400
let height2 = Math.floor(Math.random() * height1)

obsWidth = 60  
obsPosX=canvas.width
obsSpeedX=-2     

let topObstacleArr = []

for (let i=0;i<10;i++){ //Assuming we set 10 obstacles
  topObstacleArr.push(
  new Component(obsWidth, Math.floor(Math.random() * height1), img3, obsPosX+(i*600), 0, obsSpeedX, 0, 0, 0)
  )
}

let bottomObstacleArr=[]

for (let i=0;i<10;i++){
  bottomObstacleArr.push(
  new Component (obsWidth, height2, img2, obsPosX+(i*600)+300, canvas.height-height2, obsSpeedX, 0, 0, 0)
  )
}

//-----------------------------------------------------------------------------------------------------------------------

let finishingLine = new Component (30, canvas.height, "yellow", obsPosX+6300, 0, obsSpeedX, 0, 0, 0)

//FUNCTIONS---------------------------------------------------------------------------------------------------------------

let score = document.getElementById('score')

function updateScore(obstacleNumber){
  if(obstacleNumber==="side"){
    score.innerText = `Oops you have crashed! You score nothing :(`
  }
  else{
    let scoreVal = (obstacleNumber*5)+5

    if(scoreVal <= 50){
      score.innerText=`Your score is: ${scoreVal}! Better Luck next time!`
    }
    else if (scoreVal===55) {
      score.innerText=`Your score is: ${scoreVal}! You are a winner!!!`
    }
  } 
} 

//-----------------------------------------------------------------------------------------------------------------------

function updateNewBird(){
  newBird.move()  
  newBird.draw()
  requestAnimationFrame(updateNewBird)
}

//-----------------------------------------------------------------------------------------------------------------------

function updateNewObstacles(){
  for(let item of topObstacleArr){
    item.newPos()
    item.draw()
    checkGameOver()
  }
  for(let item of bottomObstacleArr){
    item.newPos()
    item.draw()
  }
  finishingLine.newPos()
  finishingLine.update()
  requestAnimationFrame(updateNewObstacles);
}
function stopGame(){
  backgroundImage.speed=0
  finishingLine.speedX=0
  newBird.speedY=0
  newBird.gravity=0
  newBird.gravitySpeed=0
  document.onkeydown = function (e) {
    if (e.keyCode == 32) {
      e.preventDefault();
       return false
      }
    };
  for(let element of topObstacleArr){
    element.speedX=0
  }
  for(let element of bottomObstacleArr){
    element.speedX=0
  }
}

//-----------------------------------------------------------------------------------------------------------------------

function checkGameOver(){ 
    for(let item of topObstacleArr){
      let itemNumber = topObstacleArr.indexOf(item);
      if(newBird.crashWith(item) && item.fill===img3){ 
        stopGame()
        updateScore(itemNumber)  
      }  
    }
    for(let item of bottomObstacleArr){
      let itemNumber = bottomObstacleArr.indexOf(item);
      if(newBird.crashWith(item) && item.fill===img2){ 
        stopGame()
        updateScore(itemNumber)  
      }
    }
    if(newBird.crashWith(finishingLine)){
      updateScore(topObstacleArr.length)
      setTimeout(function(){
       stopGame()
      },1500)
    }
    if (newBird.y + newBird.speedY > 0) {
      
      if (newBird.y+newBird.height>=canvas.height){
        stopGame()
        newBird.hitBottom()
        updateScore("side")
      }
    }
    //if(newBird.y + newBird.speedY < 0){
      //newBird.speedY*=-1
    //}
}

//-----------------------------------------------------------------------------------------------------------------------
function startGame() {
  updateCanvas()
  updateNewBird()
  updateNewObstacles()
}

//-----------------------------------------------------------------------------------------------------------------------
 
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};

document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
      newBird.speedY-=2.5
  }
};
 
