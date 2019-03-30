var FB = {
  canvas: null,
  ctx: null,
  w: null,
  w2: null,
  h: null,
  h2: null,
  images: {},
  currentImage: null,
  hideIntro: function(selector){
    document.querySelector(selector).style.display = 'none';
  },
  showGame: function(selector){
    document.querySelector(selector).style.display = 'block';
  },
  setCanvasFullScreen: function(){
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.w2 = this.w/2;
    this.h2 = this.h/2;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  },
  loadImages: function(){
    let dataset = ['bg.png', 'flappy.png', 'obstacle_bottom.png', 'obstacle_top.png'];
    let name;
    for(let image of dataset){
      name = image.split('.')[0];
      this.images[name] = {};
      this.images[name].img = new Image();
      this.images[name].img.src = 'images/'+image;
      this.images[name].pos = {};
      this.images[name].pos.x = 0;
      this.images[name].pos.y = 0;
    }

  },
  startGame: function(){
    this.showGame('#game-board');
    this.setCanvasFullScreen();
    this.gameLoop();
  },
  init: function(){
    
    /** @type {HTMLCanvasElement} */
    this.canvas = document.querySelector('#canvas');
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d');
    
    window.onresize = this.setCanvasFullScreen;

    this.currentImage = new Image();
    this.loadImages();

    document.getElementById("start-button").onclick = function() {
      this.hideIntro('#game-intro');
      this.startGame();
    }.bind(this);
  },
  gameLoop: function(){
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.moveAll();
    this.drawAll();
    requestAnimationFrame(this.gameLoop.bind(this));
  },
  moveAll: function(){
    this.moveBackground();
  },
  moveBackground: function(){
    if(this.images.bg.pos.x + this.w <= 0){
      this.images.bg.pos.x = 0;
    }
    this.images.bg.pos.x--;
  },
  drawAll: function(){
    this.printBackground();
  },

  printBackground: function(){
    this.ctx.drawImage(this.images.bg.img, this.images.bg.pos.x, this.images.bg.pos.y, this.w, this.h);
    this.ctx.drawImage(this.images.bg.img, this.images.bg.pos.x+this.w, this.images.bg.pos.y, this.w, this.h);
  },
};