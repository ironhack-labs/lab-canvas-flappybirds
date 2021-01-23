window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        console.log('click')
        startGame();
    };

    function startGame() {
        document.getElementById("start-button").setAttribute('disabled', 'true')
        flappyGame.render()
    }

};

flappyGame.init('my-canvas');