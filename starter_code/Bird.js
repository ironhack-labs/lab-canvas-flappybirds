function Bird(ctx) {
    this.ctx = ctx;

    this.w = 50;
    this.h = 50;
    this.x = 200;
    this.y = 200;

    this.vx = 3;
    this.vy = -3;
    this.gravity = 0.025;
    // this.gravitySpeed = 1;

    this.birdImg = new Image()
    this.birdImg.src = "./images/flappy.png";
}

Bird.prototype.update = function () {
    // this.posY = initPosy + this.vy;
    this.vy += this.gravity;
    this.y += this.vy;

    document.querySelector('body h2').innerHTML = `this.vy: ${this.vy} this.intPosY:${this.y}`;
}

Bird.prototype.jump = function () {
    this.vy -= 1;
}

// Bird.prototype.newPos = function () {
// }

Bird.prototype.setListeners = function () {
    var spacebar = 32;
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case spacebar:
                // this.y -= 3;
                this.jump();
                // this.gravity *=-1;
                break;
        }
    }.bind(this)
}

Bird.prototype.draw = function () {

    // this.birdImg.onload = function () {
    this.ctx.drawImage(this.birdImg, this.x, this.y, this.w, this.h);
    // this.game.ctx.fillRect(10,10,50,100);
    //   }.bind(this)
}

Bird.prototype.clear = function () {
    var canvas = document.querySelector('#canvas');
    // document.querySelector('body h2').innerHTML=`this: ${this} this.ctx:${this.ctx} `;
    this.ctx.clearRect(0, 0, canvas.w, canvas.h)
}