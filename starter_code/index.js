window.onload = function() {
  Game.init("mycanvas")
  document.getElementById("start-button").onclick = () => Game.init("mycanvas")
}
