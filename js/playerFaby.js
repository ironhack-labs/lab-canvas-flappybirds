class Player {
  constructor(ctx) {
    this.ctx=ctx
        this.x=70;
        this.maxY=250
        this.y=this.maxY;

        this.vx=0
        this.vy=0
        this.ay=0.2

        this.speedX=0;
        this.speedY=3;

        this.width=46;
        this.height=32;

        this.img=new Image()
    this.img.src='/images/bird.png'
    this.img.isReady=false
    this.img.onload= () =>{
        this.img.isReady=true
    }

    this.horizontalFrames=3
    this.verticalFrames=1

    this.xFrame=0
    this.yFrame=0

    this.tick=0

    this.flapping=false
  }

    draw(){
    this.ctx.drawImage(
        this.img,
        (this.img.width*this.xFrame)/ this.horizontalFrames,
        (this.img.height*this.yFrame)/this.verticalFrames,
        this.img.width/this.horizontalFrames,
        this.img.height/ this.verticalFrames,
        this.x,
        this.y,
        this.width,
        this.height,
    )
     this.tick++
    }

    move(){
        this.x+=this.vx
        this.vy+=this.ay
        this.y+=this.vy
        if(this.x <=0){
            this.x =0
        }
        if(this.x + this.width>= this.ctx.canvas.width){
            this.x=this.ctx.canvas.width-this.width
        }
        if(this.y<=0){
            this.y=0
        }
         if(this.y + this.height>= this.ctx.canvas.height){
            this.y=this.ctx.canvas.height-this.height
        }

        if(this.y>=this.maxY){
            this.y=this.maxY
            this.flapping=false
        }
        if(!this.flapping){
            this.yFrame=0
            if(this.tick%10===0){
                this.xFrame+=1
                if(this.xFrame>1){
                    this.xFrame=0
                }
            }
        }
        
        if(!this.flapping){
            this.yFrame=0
            this.xFrame=0
        }

        if(this.flapping){
            this.yFrame=0
            this.xFrame=2
        }
    }
        onKeyDown(keyCode){
            if(keyCode===KEY_SPACE && !this.flapping){
                this.vy=-4
                this.flapping=true
            }
            if(keyCode===KEY_SPACE){
                this.vy=this.speedY
                this.flapping=true
            }
        }
        onKeyUp(keyCode){
            if(keyCode===KEY_SPACE){
                this.vx=0
                this.flapping=false
            }
        }
    }



