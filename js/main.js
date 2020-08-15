window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
    };

    function startGame() {
        if (checkCollision()) {
            reboot()
            intervalId = setInterval(update, 1000 / 60)
        } else if (intervalId) {
            reboot()
        } else {
            reboot()
            intervalId = setInterval(update, 1000 / 60)
        }
    }

    function reboot() {
        board = new Board()
        flappy = new Flappy()
        obstacles = []
        frames = 0
        score = 0
    }
};