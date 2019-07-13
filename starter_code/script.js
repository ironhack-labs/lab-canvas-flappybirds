// window.onload = function() {
//   document.getElementById("start-button").onclick = function() {
//     startGame();
//   };

//   function startGame() {

//   }

// };

window.onload = () => {
  document.getElementById("start-button").onclick = function () {
    Game.init("canvas")
  }
}

