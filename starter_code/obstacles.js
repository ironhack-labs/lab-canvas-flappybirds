var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 

function Obstacles() {
    this.imgTop = new Image();
    this.imgTop.src = "images/obstacle_top.png";
    this.imgBot = new Image();
    this.imgBot.src = "images/obstacle_bottom.png";
    this.x = 900;
    this.y = 0;
    this.arrayTop = [-100,-50,-250];            //Create random obstacles top
    this.arrayBot = [400,450,300];              //Create random obstacles bot
    this.random = Math.floor(Math.random()*3);
    this.yTop = this.arrayTop[this.random];
    this.yBot = this.arrayBot[this.random];
    this.speed = -8;
    this.draw = function() {
        ctx.drawImage(this.imgTop, this.x, this.yTop, 80, 300);
        ctx.drawImage(this.imgBot, this.x, this.yBot, 80, 300);
        
        ctx.fillStyle = "white";
        ctx.fillRect(0,500,canvas.width, canvas.height);
    }
    
    this.move = function() {
        this.x += this.speed;
        if(this.x < -90) {                      //Disappear from left side
            this.x = 900;                       //Appear on the right side
            this.random = Math.floor(Math.random()*3);
            this.yTop = this.arrayTop[this.random];
            this.yBot = this.arrayBot[this.random];  
        }
    }
    
}

var obstacles = new Obstacles();
var obstacles2 = new Obstacles();
obstacles2.x = 1400;
