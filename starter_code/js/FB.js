var FB = {
  canvas: null,
  ctx: null,
  w: null,
  w2: null,
  h: null,
  h2: null,
  frameCount: 0,
  frameID: null,
  status: 0,
  init: function(){
    /** @type {HTMLCanvasElement} */
    this.canvas = document.querySelector('#canvas');
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d');
    
    this.DOM.init();
    this.ImageManager.init();
    this.Events.init();
    this.Components.init();
  },
  checkFrameCount: function(){
    if(++this.frameCount > 3600){
      this.frameCount = 1;
    }
  },
  clearScreen: function(){
    this.ctx.clearRect(0, 0, this.w, this.h);
  },
  startGame: function(){
    this.DOM.showGame('#game-board');
    this.DOM.setCanvasFullScreen();
    this.Events.pressKey();
    this.Events.releaseKey();
    if(!this.status){
      this.gameLoop();
    }
    this.status = 1;
  },
  gameLoop: function(){
    this.frameID = requestAnimationFrame(this.gameLoop.bind(this));
    this.checkFrameCount();
    this.clearScreen();
    this.moveAll();
    this.drawAll();
  },
  moveAll: function(){
    this.Components.move();
  },
  drawAll: function(){
    this.Components.draw();
  },
  gameOver: function(){
    // Add score and reset option by DOM or painting in canvas
    if(this.status){
      cancelAnimationFrame(this.frameID);
    }
    this.status = 0;
    document.querySelector('#game-over').style.visibility = 'visible';
    document.querySelector('#points').innerText = this.Components.ScoreManager.points;
  }
};