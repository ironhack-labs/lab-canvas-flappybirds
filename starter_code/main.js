window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var start= new startGame("canvas")
    start.run();
   
  };
}