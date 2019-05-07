window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    Game.init("canvas")
  };
  document.onkeydown = function(event) {
    if (event.keyCode === this.keys.SPACE) { event.preventDefault() }
  }
};