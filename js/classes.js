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
        this.image.src = '../images/bg.png' 
    }

    update(){
        
        // ctx = context 
        //Éste método recibe 5 parámetros .drawImage(img, posición x, posición y, this.width)
        ctx.drawImage(this.image, this.x, this.y , this.width, this.height)

    }
}