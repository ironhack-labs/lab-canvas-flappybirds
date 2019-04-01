var flappy = new Image();
flappy.src = "./images/flappy.png";






class Ball {
    constructor(we, he, ctx, r) {
        this.posX = we;
        this.posY = he;
        this.ctx = ctx;
        this.radius = r;
        this.y0 = this.posY * 0.5;
        this.y = this.y0;
        this.gY = 0;
        this.setListeners();
    }
    drawBall() {
        // aquí pintamos una pelota
        this.ctx.beginPath()
        this.ctx.clearRect(0, 0, w, h)
        this.ctx.save()
        this.ctx.fillStyle = "green"
        // this.ctx.arc(this.posX, this.y, this.radius, 0, 2 * Math.PI)
        this.ctx.drawImage(flappy, this.posX - this.radius, this.y - this.radius, this.radius * 3, this.radius * 2)
        this.ctx.fill()
        this.ctx.restore()
        this.ctx.closePath()
    }
    move() {
        // Aumenta la velocidad en el eje y.
        var gravity = 0.4;

        // el limite de la pelota es la posición original
        // if (this.y >= this.y0) {
        //   this.gY = 1;
        //   this.y = this.y0;
        // } 
        // else { 
        //   this.gY += gravity;
        //   this.y += this.gY;
        // }
        if (this.y <= this.radius) {
            this.gY = 0;
            this.gY += gravity;
            this.y = this.radius;
            this.y += this.gY;
        } else if (this.y >= (h - this.radius)) {
            this.gY = 1;
            this.y = h - this.radius;
        } else {
            this.gY += gravity;
            this.y += this.gY;
        }
    }
    setListeners() {
        document.onkeydown = function (event) {
            // console.log(event.keyCode);
            //   if (event.keyCode === 38 && this.y == this.y0) {
            if (event.keyCode === 32 && this.y >= this.radius) {
                this.y -= 10;
                this.gY -= 10;
            }
        }.bind(this);
    }
}

var topObsImg = new Image();
var bottomObsImg = new Image();
topObsImg.src = "./images/obstacle_top.png";
bottomObsImg.src = "./images/obstacle_bottom.png";


class Obstaculo {
    constructor(playerPos, playerH, ctx) {
        this.ctx = ctx;
        this.w = 100;
        this.h = this.w * 5;
        this.dx = 10;
        this.x = w;
        this.y = h2;
        this.imagenTop = topObsImg;
        this.imagenBottom = bottomObsImg;
        this.PosAncla = (h2 / 4) + (Math.floor(Math.random() * 300));
        

        /// DAMAGE AREAS
        this.posTop = this.PosAncla - 500;
        this.posBottom = this.PosAncla + 200;
    }

    draw() {
        this.ctx.drawImage(this.imagenBottom, this.x, this.posBottom, this.w, this.h)
        console.log(this.PosAncla)
        this.ctx.drawImage(this.imagenTop, this.x, this.posTop, this.w, this.h)
    }
    move() {
        this.x -= 3;
    }
    isTouched(){
        alert("Dead")
    }
};

// class bg {
//     this.ctx = ctx;
//     draw() {
//         this.ctx.drawImage(imgBG, 0, 0, w, h);
//     }
// }