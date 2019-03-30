FB.DOM = {
  hideIntro: function(selector){
    document.querySelector(selector).style.display = 'none';
  },
  showGame: function(selector){
    document.querySelector(selector).style.display = 'block';
  },
  setCanvasFullScreen: function(){
    FB.w = window.innerWidth;
    FB.h = window.innerHeight;
    FB.w2 = FB.w/2;
    FB.h2 = FB.h/2;
    FB.canvas.width = FB.w;
    FB.canvas.height = FB.h;
  },
  init: function(){
    this.setCanvasFullScreen();
  }
};