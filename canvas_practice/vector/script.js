let Vector = function (x, y) {
    this.x = x
    this.y = y
}

Vector.prototype.move = function (x, y) {
    this.x += y
    this.y += y
    return this
}

Vector.prototype.add = function (v) {
    return new Vector(this.x + v.x, this.y + v.y)
}

Vector.prototype.toString = function (v) {
    return `(${this.x}, ${this.y})`
}

Vector.prototype.sub = function (v) {
    return new Vector(this.x - v.x, this.y - v.y)
}

Vector.prototype.mul = function (s) {
    return new Vector(this.x * s, this.y * s)
}

Vector.prototype.length = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
}

Vector.prototype.angle = function () {
    return Math.atan2(this.y, this.x)
}

Vector.prototype.set = function (x) {
    this.x = x
    this.y = y
    return this
}

Vector.prototype.equal = function (v) {
    return (this.x === v.x) && (this.y === v.y)
}

Vector.prototype.clone = function (v) {
    return new Vector(this.x, this.y)
}

const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// variables
const blockWidth = 200;
const PI = Math.PI,
    PI2 = Math.PI * 2


// assign canvas size
ww = canvas.width = window.innerWidth
wh = canvas.height = window.innerHeight

function drawVector(v, trans) {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.save()
    ctx.rotate(v.angle())
    ctx.fillText(v, v.length() / 2, 10)
    ctx.lineTo(v.length(), 0)

    // draw arrow
    ctx.lineTo(v.length() - 5, -4)
    ctx.lineTo(v.length() - 5, 4)
    ctx.lineTo(v.length(), 0)

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()
    if (trans) {
        // sould the line start from last end coordinate of line
        ctx.translate(v.x, v.y)
    }
}

let mousePos

canvas.addEventListener('mousemove', function (evt) {
    mousePos = new Vector(evt.x, evt.y)

})

function draw(v, trans) {
    ctx.clearRect(0, 0, ww, wh)
    let v1 = new Vector(250, 0)
    let v2 = new Vector(0, 200)
    let v3 = v1.add(v2).mul(-1) // mul(-1) means point forward to the oppsite direction
    // draw triangle
    // ctx.translate(ww / 2, wh / 2)
    // drawVector(v1, true)
    // drawVector(v2, true)
    // drawVector(v3, true)

    // draw arrow line direct to the cursor
    if (mousePos) {
        let c = new Vector(ww / 2, wh / 2)
        ctx.restore()
        ctx.save()
        ctx.translate(c.x, c.y)
        let md = mousePos.sub(c)

        // drawVector(mousePos.sub(c), false)
        drawVector(md.mul(1 / md.length()).mul(100), false) // steady length
        ctx.restore()
    }
}

setInterval(draw, 30)




