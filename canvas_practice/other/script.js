const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// default name
// w => width
// h => height
// p => position
// c => color

// colors
const colors = {
    white: 'white',
    black: 'black',
    red: 'red',
    blue: 'blue'
}

// classes
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

class Rectangle {
    constructor(w, h, p, c) {
        this.w = w ? w : 100
        this.h = h ? h : 50
        this.p = p ? p : new Vec2()
        this.c = c ? c : colors.black
    }

    draw() {
        ctx.save()
        ctx.translate(this.p.x, this.p.y)
        ctx.fillStyle = this.c
        ctx.fillRect(0, 0, this.w, this.h)
        ctx.restore()
    }

    click(p) {
        if (p.x >= this.p.x && p.x <= this.p.x + this.w && p.y >= this.p.y && p.y <= this.p.y + this.h) {
            console.log('A')
        }

    }
}

// ctx.translate(ww)


let mousePos = { x: undefined, y: undefined }
let rect_1 = undefined

function initCanvas() {
    // assign canvas size
    ww = canvas.width = window.innerWidth
    wh = canvas.height = window.innerHeight

    // transform coordinate system to Descartes
    // ctx.translate(0, wh)
    // ctx.scale(-1, 1);
    // ctx.rotate(Math.PI)

    draw()
}

// events
const draw = () => {
    const rect_1_vec = new Vec2(30, 90)
    rect_1 = new Rectangle(160, 100, rect_1_vec, colors.red);
    rect_1.draw()
}

// actions
const resize = () => {
    initCanvas()
    draw()
}

const mousemove = (e) => {
    mousePos = {
        x: e.x,
        y: e.y
    }
}

const click = (e) => {
    rect_1.click(new Vec2(e.x, e.y))
}

window.addEventListener('resize', resize)
window.addEventListener('mousemove', mousemove)
window.addEventListener('click', click)

initCanvas()



// ctx.beginPath()
// ctx.moveTo(0, 0)
// ctx.lineTo(0, 45)
// ctx.lineWidth = 15;
// ctx.strokeStyle = "red"
// ctx.stroke()



// ctx.beginPath()
// ctx.lineTo(0, 0)
// ctx.lineTo(45, 0)
// ctx.lineWidth = 15;
// ctx.strokeStyle = "blue"
// ctx.stroke()





