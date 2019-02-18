window.onload = function() {
    var started = false
    document.getElementById("start-button").onclick = function() {
        if (!started) {
            Game.init("Flappy-game")
            started = true
        }
    }
};