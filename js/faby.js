const fabyImg = document.createElement('img');
fabyImg.src = '../images/flappy.png';

// create player class
class Bird {
    constructor(canvasContext, positionX, positionY, width, height){
        this.ctx = canvasContext,
        //this.image = fabyImg,     //probably no required
        this.x = positionX,
        this.y = positionY,
        this.width = width,
        this.height = height,
        this.speedX = 0,    // probably not used
        this.speedY = 0,
        this.gravity = 0,
        this.gravitySpeed = 0
    }

    draw(){
        this.ctx.drawImage(fabyImg, this.x, this.y, this.width, this.height);
    }

    // in progress: update new position, probaly x axis information is not required
    newPos () {
        this.gravitySpeed += this.gravity
        this.y += this.gravitySpeed;
    }

    // grativy value negative when spacebar is kept pressed
    spaceBarClicked () {
        this.gravitySpeed = 0;
        this.gravity = -1;
    }

    // gravity back to positive value when spacebar released
    spaceBarReleased () {
        this.gravitySpeed = 0;
        this.gravity = 1;
    }

}

