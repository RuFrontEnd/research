const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// assign canvas size
ww = canvas.width = window.innerWidth
wh = canvas.height = window.innerHeight

class Vec2 {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }

    set(x, y) {
        this.x = x
        this.y = y
    }

    move(x, y) {
        this.x += x
        this.y += y
    }

    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y)
    }

    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y)
    }

    mul(s) {
        return new Vec2(this.x * s, this.y * s)
    }

    clone() {
        return new Vec2(this.x, this.y)
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }

    equal(v) {
        return this.x === v.x && this.y === v.y
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    get angle() {
        return Math.atan2(this.y, this.x)
    }

    get unit() {
        return this.mul(1 / this.length)
    } // one unit length must be 1

    set length(nv) {
        let temp = this.unit.mul(nv)
        this.set(temp.x, temp.y)
    }
}

// ctx.translate(ww)

ctx.translate(0, wh)
ctx.scale(-1, 1);
ctx.rotate(Math.PI)


ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(0, 45)
ctx.lineWidth = 15;
ctx.strokeStyle = "red"
ctx.stroke()
ctx.beginPath()
ctx.lineTo(0, 0)
ctx.lineTo(45, 0)
ctx.lineWidth = 15;
ctx.strokeStyle = "blue"
ctx.stroke()
// ctx.arc(10, 10, 5, 0, Math.PI * 2)
// ctx.fillStyle = 'red'
// ctx.fill()





