FB.Events = {
  SPACE_BAR: {
    code: 32,
    status: false,
    timer:  0,
  },
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
  pressKey: function(key){
    document.addEventListener('keydown', function(e){
      e.keyCode = key || e.keyCode;
      switch(e.keyCode){
        case 32:
          this.SPACE_BAR.status = true;
          this.SPACE_BAR.timer = performance.now();
        break;
      }
    }.bind(this));
  },
  releaseKey: function(key){
    document.addEventListener('keyup', function(e){
      e.keyCode = key || e.keyCode;
      switch(e.keyCode){
        case this.SPACE_BAR.code:
          this.SPACE_BAR.status = false;
          this.SPACE_BAR.timer = null;
        break;
      }
    }.bind(this));
  }
};