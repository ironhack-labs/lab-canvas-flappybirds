window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame(id) {
    Game.init('myCanvas')
  }

};

const Game = {
  canvasDom :undefined,
  ctx: undefined,
  winH:undefined,
  winW: undefined,
  background: undefined,

  init: function(canvasId){
    this.canvasDom = document.getElementById(canvasId)
    this.ctx = this.canvasDom.getContext('2d')
    this.setDimensions()
    this.start()
    this.background = new Background(this.ctx, this.winW, this.winH, "images/bg.png")
    this.player = new Player(this.ctx, this.winH, this.winW, 'images/flappy.png')
  },
  setDimensions: function(){
    this.canvasDom.setAttribute('width', window.innerWidth)
    this.canvasDom.setAttribute('height', window.innerHeight)
    this.winH=window.innerHeight
    this.winW=window.innerWidth
  },
  start: function(){
    setInterval(() => {
      this.clearAll()
      this.drawAll()
      this.moveAll()
    }, 1000/60)
    
  },
  drawAll: function(){   
    
    this.background.drawBackground()
    this.player.drawPlayer()
  
  },
  moveAll: function(){
    this.background.moveBackground()
    
    this.player.movePlayer()

  },
  clearAll: function(){
    this.ctx.clearRect(0, 0, this.winW, this.winH)
  }


}


class Background {
  constructor(ctx, winW, winH, url){
    this.ctx= ctx
    this.winW= winW
    this.winH= winH
    this.img = new Image()
    this.img.src = url
    this.posBackX= 0
    this.dx= 5      //desplazamiento de X
  }
  drawBackground(){
    this.ctx.drawImage(this.img, this.posBackX, 0, this.winW,this.winH)
    this.ctx.drawImage(this.img, this.posBackX+this.winW, 0, this.winW,this.winH)
  }
  moveBackground(){
    this.posBackX -= this.dx;
    if (this.posBackX < -this.winW) this.posBackX = 0
  }
}

class Player {
  constructor(ctx, winH, winW, url){
    this.ctx=ctx
    this.width= 50
    this.height= 50

    this.winW= winW
    this.winH= winH

    this.posX = this.winW/3
    this.posY = this.winH/2
    
    this.velX = 5
    this.velY = 1

    this.gravity = .4  // Aumenta la velocidad en el eje y

    this.img = new Image()
    this.img.src = url

    this.setListeners()
  }
  drawPlayer(){
    this.ctx.drawImage(this.img, this.posX, this.posY, this.width,this.height)
  }

  setListeners(){
    document.onkeydown= function (event){
      if(event.keyCode==16){
        this.velY = -10
        //this.posY--
        
      }
    }.bind(this)
  }

  movePlayer(){
   this.velY+=this.gravity
   this.posY+=this.velY
  }
}