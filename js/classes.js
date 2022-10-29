class Background{
    /**
     * 
     * @param {*} w => canvas.width
     * @param {*} h => canvas.height
     */
    constructor(w, h){
        // Estructura en canvas => x,y,w,h
        
        this.x = 0; 
        this.y = 0;
        this.width = w; 
        this.height = h;  
        // Image
        this.image = new Image(); 
        this.image.src = 'images/bg.png' 
    }

    update(){
        if(this.x  < -canvas.width){
            this.x =0; 
        }
        // Generar el movimiento de la imagen 
        this.x--;
        // ctx = context 
        //Éste método recibe 5 parámetros .drawImage(img, posición x, posición y, this.width)
        ctx.drawImage(this.image, this.x, this.y , this.width, this.height)
        // Re dibujar la imagen
        ctx.drawImage(
            this.image, 
            this.x + this.width, // Agregar la imagen 2 al final de la imagen 1
            this.y, 
            this.width, 
            this.height
        )
    }
}

class Flappy{
    /**
     * @param {number} x => 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    constructor(x,y,w,h){   
        this.x = x;
        this.y = y; 
        this.width = w; 
        this.height = h; 
        // Image 
        this.image = new Image();
        this.image.src = 'images/flappy.png'    
        
        this.vy = 2 //
        this.userPull = 0 // Movimiento
    }
    update(){
        // dropdown 
        this.vy = this.vy + (gravity - this.userPull)
        if(this.y  <=0){
            this.userPull =0; 
            this.y = 2; 
            this.vy = 2; 
        }
        // Modificar el valor de la posición y con la gravedad
        this.y += this.vy
        // .drawImage(image, x,y, w,h)
        ctx.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
    }
    /**
     * @param {*} item = {x:..., y:...,, vida, width, height}
     */
    collision(item){
        return(
            this.x  < item.x + item.width &&
            this.x + this.width > item.x && 
            this.y  < item.y + item.height  && 
            this.y + this.height > item.y 
        );
    }
}


class Pipe extends Flappy{
    /**
     * @param {*} pos 
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     */
    constructor(pos, x, y, h){
        super(x,y,50,h)
        this.image.src = pos === 'top' ? 'images/obstacle_top.png' : 'images/obstacle_bottom.png';

    }
    update(){
        console.log('sdfsg');
        this.x -=2; 
        ctx.drawImage(this.image,
            this.x, 
            this.y, 
            this.width, 
            this.height)
    }
  }