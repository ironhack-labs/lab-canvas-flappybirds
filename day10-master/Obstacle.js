class Obstacle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.color = "blue"
        this.hasBeenTouched = false
    }

    draw(ctx) {
        var PI2 = 2 * Math.PI
        /** @type {CanvasRenderingContext2D} */
        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, 10, 100)
        ctx.fill()
        ctx.closePath()
    }

    getX() {
        return this.x
    }

    setAsTouched() {
        this.color = "red"
        this.hasBeenTouched = true
    }
}