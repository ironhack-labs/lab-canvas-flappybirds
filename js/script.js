window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
    };

    function startGame() {
        document.getElementById("start-button").setAttribute('disabled', 'true')
        flappyGame.render()
        console.log('startgame')
    }

};

flappyGame.init('my-canvas');