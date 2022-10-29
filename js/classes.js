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
    update(){}
    collision(){}
}