

/** @type HTMLCanvasElement */
var canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
var ctx = canvasDOMEl.getContext("2d");

var w = 400
var h = 700


var w2 = w / 2;
var h2 = h / 2;
//var dashedLineY = 800


//poniendo atributos para el screen
//canvasDOMEl.setAttribute("width", window.innerWidth);
//canvasDOMEl.setAttribute("height", window.innerHeight);

class game{
  constructor(){
    this.canvas = ""
    this.ctx =""
    this.imgBCG = new Image()
    this.imgBCG.src = 'images/bg.png'

  }
  
  init=()=>{
    this.draw()
  }

  draw=()=>{

    this.drawBackground = undefined;
  }

  drawBackground = () =>{
    p
  }


}






///////////////////////////////
//////////////////////////////////
///////////////////////////////////
class tuberias {
  constructor(width, heigth, color){
    this.width = width;
    this.heigth = heigth;

  }

  colorTuberias(tuberias){
    if (tuberias >= 20){
      this.colorTuberias = "red";
    } else {
      this.colorTuberias = "green";
    }
  }

  boxCanvas() {
    //poniendo atributos para el screen
    //hay poner una imagen

    canvasDOMEl.setAttribute("height", h)
    canvasDOMEl.setAttribute("width", w);

  }

  //metiendo el background
  
  imgStage.onload = function(){
    this.img = newImage();
    this.img.src = "images/bg.png";
    }
   
}

boxCanvas()