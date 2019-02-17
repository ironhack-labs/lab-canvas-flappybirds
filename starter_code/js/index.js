window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("to-delete").style.display = "none"
    Game.init("canvas")
  }
}