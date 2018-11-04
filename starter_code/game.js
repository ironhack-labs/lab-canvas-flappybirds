
let game = {
    // canvas : document.querySelector('body canvas'),
    // ctx : this.canvas.getContext('2d'),

    ctx: null,
    fps: 60,

    
    init: function (ctx) {
        this.ctx = ctx;

        var tempBackground = new Background(ctx);
        this.background = tempBackground;
        var tempBird = new Bird(ctx)
        this.bird = tempBird;
        

    //TEST OUTPUT MODULE
        var parent = document.querySelector('body');
        var startButton = document.querySelector('#start-button');
        var h2Elem = document.createElement('h2');
        parent.insertBefore(h2Elem, startButton);

        // var parent = document.querySelector('body');
        // var startButton = document.querySelector('#start-button');
        // var buttonElem = document.createElement('button');
        // document.createElement('button').setAttribute("id", "jump-button");
        // parent.insertBefore(buttonElem, startButton);

        document.getElementById("jump-button").onclick = function() {
            this.bird.jump();
        }.bind(this);   

        
        // document.querySelector('body h2').innerHTML=`(game)this: ${this} (game)this.ctx:${this.ctx}`;
        // this.ctx.fillRect(300, 300, 100, 100);
    //======================================================

    },

    renderer: function () {
        indervalID = setInterval(function () {
            this.bird.clear();
            this.background.draw();
            this.bird.update();
            this.bird.draw();
        }.bind(this), 1000 / this.fps)
    }
}