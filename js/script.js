window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
    };
    window.onload = function() {
        const canvas = document.getElementById("my-canvas");
        const ctx = canvas.getContext("2d");
        let game = undefined;


        function startGame() {
            document.addEventListener("keydown", (e) => {
                game.onKeyUp(e);
            });

        }
        document.addEventListener("keyup", (e) => {
            game.onKeyDown(e);
        });

        document.getElementById("start-button").onclick = function() {
            game = new Game(ctx);
            game.startGameLoop();
        };
    }
};