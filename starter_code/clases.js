//se define una clase u objeto que sera primero, y es el fondo
class Board{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.img = new Image()
        this.img.src = './images/bg.png'
        this.img.onload = () => {
            this.draw()//callback del metodo draw que dibuja la imagen
        }
    }
    //el metodo move va a restar a x para que se mueva
    move(){
        this.x--//va a permitir que el fondo se mueveva de derecha a izquierda
        if(this.x< -canvas.width) this.x =0
    }
    //metodo draw   que dibuja la imagen
    draw (){
        this.move()
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
        console.log('pintandoo')
    }
}

class Pipe{
    constructor(y, height, type)/* se declaran las varibales que van a cambiar para las imagenes*/{
        this.x = canvas.width
        this.y = y//sera random cuando lo definamos, por eso es variable
        this.width = 50
        this.height = height//sera random cuando lo definamos, por eso es variable
        this.imgTop = new Image()
        this.imgBotttom = new Image()
        this.imgBotttom.src = './images/obstacle_bottom.png'
        this.imgTop.src = './images/obstacle_top.png'
        this.type = type //se utiliza cuando hagamos el draw e identifica si la imagen es top o bottom
    }
    move(){
        this.x--
    }
    draw(){
        if(this.type){
            ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
            
        }else{
            ctx.drawImage(this.imgBotttom, this.x, this.y, this.width, this.height)  
        }
        this.move()
    }
}
class Flappy {
    constructor (){
        this.x = 150
        this.y = 150
        this.width = 50
        this.height = 50
        this.flappyUp = new Image()
        this.flappyMid = new Image()
        this.flappyDown = new Image()
        this.img = new Image()
        //en un futuro vamos a remover la fuente de img
        this.flappyUp.src = './images/yellowbird-upflap.png'
        this.flappyMid.src = './images/yellowbird-midflap.png'
        this.flappyDown.src = './images/yellowbird-downflap.png'
    }
    draw(){
        this.y+=2
        if(frames %  2 ===0){
            this.img =
            animateHelper === 0 ? this.flappyUp :
            animateHelper === 1 ? this.flappyMid : 
            animateHelper === 1 ? this.flappyDown : this.flappyMid

            if (animateHelper < 4){
                animateHelper++
            } else{
                animateHelper = 0
            } 
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    flap(){
        this.y-=25
    }
    isTouching(pipe){
        return (this.x < pipe.x + pipe.width &&
                this.x + this.width > pipe.x  &&
                this.y < pipe.y + pipe.height &&
                this.y + this.height > pipe.y )
    }
}