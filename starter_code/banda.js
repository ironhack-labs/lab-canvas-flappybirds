class Section{
  constructor(initX ,size, supY, lowY, color){
    this.x1 = initX;
    this.y1 = supY;
    this.x2 = this.x1 + size;
    this.y2 = supY;
    this.x3 = this.x2 - size;
    this.y3 = lowY;
    this.x4 = this.x3 - size;
    this.y4 = lowY;
    this.dark = color;
  }

  draw(ctx){
    ctx.beginPath();  
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.lineTo(this.x3,this.y3);
    ctx.lineTo(this.x4,this.y4);  
    ctx.closePath();
    ctx.fillStyle   = this.dark ? "#71BF2E" : "#9BE658"; 
    ctx.fill();
    ctx.strokeStyle = this.dark ? "#71BF2E" : "#9BE658"; 
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  changeColor(){
    this.dark = !this.dark;
  }
}

class Banda{
  constructor(width, sectionSize, supY, lowY){
    debugger
    this.secciones = [];
    var x1 = width;
    var numSections = width / sectionSize;
    for (let x = numSections ; x > -sectionSize ; x--) {      
      this.secciones.push(new Section(x1,sectionSize,supY, lowY, x % 2 === 0 ? true : false))
      x1 = x1 - sectionSize;
    }
  }

  draw(ctx){
    
/*     for (let index = this.secciones.length; index >= 0 ; index--) {
       this.secciones[index].draw(ctx);
    } 
*/
    
/*     var reverseSections = [...this.secciones];
    reverseSections.reverse();
    this.reverseSections.forEach(seccion => {
      seccion.draw(ctx);
    }) 
*/

    this.secciones.forEach(seccion => {
      seccion.draw(ctx);
    })

  }

  changeColors(){
    this.secciones.forEach(seccion => {
      seccion.changeColor();
    })    
  }

}