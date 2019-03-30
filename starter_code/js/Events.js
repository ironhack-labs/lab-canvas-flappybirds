FB.Events = {
  init: function(){
    this.onResize();
    this.playButton();
  },
  playButton: function(){
    document.getElementById("start-button").onclick = function() {
      FB.DOM.hideIntro('#game-intro');
      FB.startGame();
    };
  },
  onResize: function(){
    window.onresize = FB.DOM.setCanvasFullScreen;
  },
};