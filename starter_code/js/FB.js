var FB = {
  canvas: null,
  ctx: null,
  w: null,
  w2: null,
  h: null,
  h2: null,
  frameCount: 0,
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
      this.frameCount = 0;
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
    this.gameLoop();
  },
  gameLoop: function(){
    this.checkFrameCount();
    this.clearScreen();
    this.moveAll();
    this.drawAll();

    requestAnimationFrame(this.gameLoop.bind(this));
  },
  moveAll: function(){
    this.Components.move();
  },
  drawAll: function(){
    this.Components.draw();
  },
};