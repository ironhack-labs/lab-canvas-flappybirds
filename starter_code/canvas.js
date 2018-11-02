function Canvas (canvas){
this.canvas = document.getElementById(canvas);
this.ctx = this.canvas.getContext("2d");
this.width = this.canvas.width;
this.height = this.canvas.height;
this.img = new Image();
this.img.src = "./images/bg.png";
}

Canvas.prototype.init = function(){

};

Canvas.prototype.drawBackground = function(){
    this.ctx.drawImage(this.img, 0,0,this.width,this.height)
};