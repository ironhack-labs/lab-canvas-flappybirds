window.onload = function() {
    document.getElementById("start-button-sara").onclick = function() {
      basicGame.startGame();
    };
  
    document.getElementById("start-button-laura").onclick = function() {
      basicGameLaura.startGame();
    };
  
    document.getElementById("start-button-guille").onclick = function() {
      basicGameGuille.startGame();
    };
  
    document.getElementById('closeBtn').onclick = function() {
        location.reload()
    }

};


  
  
  