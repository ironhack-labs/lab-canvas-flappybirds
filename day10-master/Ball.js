class Ball {
    constructor(x, y, rParam, myColor) {
        if (x < 0) {
            throw new RangeError("X is invalid")
        }

        this.x = x
        this.y = y
        this.radius = rParam
        this.color = myColor
        this.speed = 1
        this.accelerationFactor = 1
        this.sense = 1
    }

    setSense(s) {
        if (s === "right") {
            this.sense = 1
        }   else {
            this.sense = -1
        }
    }

    bounce() {
        ball1.setSpeed(-this.speed)
    }

    setAccelerationFactor(f) {
        this.accelerationFactor = f
    }

    accelerateX() {
        this.x += (this.speed *= this.accelerationFactor)
    }

    setSpeed(s) {
        this.speed = s
    }

    moveX() {
        this.x += this.speed
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getRadius() {
        return this.radius;
    }

    draw(ctx) {
        var PI2 = 2 * Math.PI

        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, PI2)
        ctx.fill()
        ctx.closePath()
    }
}

        // function Ball(x, y, rParam) {
        // if (x < 0) {
        //     throw new RangeError("X is invalid")
        // }

        // this.x = x
        // this.y = y
        // this.radius = rParam
        // }

        // Ball.prototype.moveX = function () {
        //     this.x++
        // }