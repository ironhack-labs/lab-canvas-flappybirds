const images = {
  backg : './images/bg.png',
  flap  : './images/flappy.png',
  obsb  : './images/obstacle_bottom.png',
  obst  : './images/obstacle_top.png'
}

//variables constates 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;

//clases
class Board {
  constructor (){
   this.x = 0;
   this.y = 0;
   this.width = canvas.width;
   this.height = canvas.height;
   this.img = new Image ();
   this.img.src = images.backg;
   this.img.onload = () => {
    this.draw();
  };
  }

  draw(){
    this.x --;
    if (this.x < -canvas.width) this.x = 0;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }

}

class Faby {
  constructor (){
   this.x = 30;
   this.y = 150;
   this.width = 50;
   this.height = 50;
   this.img = new Image();
   this.img.src = images.flap;
   //this.gravity = 0;
   //this.gravitySpeed =0;
   this.img.onload = () => {
   this.draw();
  };
  }

  draw(){
    this.y++;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

}




//instancia
const board = new Board();
const faby = new Faby();

//funciones
function update() {
  board.draw();  
  faby.draw();
}

function startGame() {
  update()
  if (interval) return;
  interval = setInterval(update, 1000 / 60); 
}



//listener 
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  

};

  
