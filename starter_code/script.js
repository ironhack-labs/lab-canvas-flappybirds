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
  },
  setDimensions: function(){
    this.canvasDom.setAttribute('width', window.innerWidth)
    this.canvasDom.setAttribute('height', window.innerHeight)
    this.winH=window.innerHeight
    this.winW=window.innerWidth
  },
  start: function(){
    setInterval(() => {
      this.drawAll()
      this.moveAll()
    }, 1000/60)
    
  },
  drawAll: function(){   
    
    this.background.drawBackground()
  
  },
  moveAll: function(){
    this.background.moveBackground()
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