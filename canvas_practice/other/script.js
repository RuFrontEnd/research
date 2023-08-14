const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// default name
// w => width
// h => height
// p => position
// c => color
// r => radius

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

class Circle {
    constructor(r, p, c) {
        this.r = r ? r : 10
        this.p = p ? p : new Vec2()
        this.c = c ? c : colors.black
    }

    draw() {
        ctx.save()
        ctx.translate(this.p.x, this.p.y)
        ctx.beginPath()
        ctx.arc(0, 0, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.c
        ctx.fill()
        ctx.restore()
    }

    clear() {
        this.r = 0
        this.p = new Vec2()
        this.c = colors.black
        this.draw()
    }
}

class DragCircle extends Circle {
    constructor(r, p, c) {
        super(r, p, c)
        this.drag = false
        this.innerCircle = {
            r: this.r / 2,
            c: colors.white
        }
    }

    draw() {
        ctx.save()
        ctx.translate(this.p.x, this.p.y)
        ctx.beginPath()
        ctx.arc(0, 0, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.c
        ctx.fill()
        ctx.beginPath()
        ctx.arc(0, 0, this.r / 1.5, 0, Math.PI * 2)
        ctx.fillStyle = this.innerCircle.c
        ctx.fill()
        ctx.restore()
    }

    mouseDown(p) {
        if (p.x >= this.p.x - this.r && p.x <= this.p.x + this.r && p.y >= this.p.y - this.r && p.y <= this.p.y + this.r) {
            this.drag = true
        }
    }

    mouseMove(p) {
        if (this.drag) {
            this.p = p
        }
    }

    mouseUp() {
        this.drag = false
    }

}

class Rectangle {
    constructor(w, h, p, c, selected) {
        this.w = w ? w : 100;
        this.h = h ? h : 50;
        this.p = p ? p : new Vec2();
        this.c = c ? c : colors.black;
        this.selected = selected;
        this.dragCircles = {
            leftTop: new DragCircle(5, this.p, colors.black),
            rightTop: new DragCircle(5, this.p.add(new Vec2(this.w, 0)), colors.black),
            roghtBottom: new DragCircle(5, this.p.add(new Vec2(this.w, this.h)), colors.black),
            leftBottom: new DragCircle(5, this.p.add(new Vec2(0, this.h)), colors.black)
        }
    }

    draw() {
        ctx.save()
        ctx.translate(this.p.x, this.p.y)
        ctx.fillStyle = this.c
        ctx.fillRect(0, 0, this.w, this.h)
        ctx.restore()
        if (this.selected) {
            this.dragCircles.leftTop.draw()
            this.dragCircles.rightTop.draw()
            this.dragCircles.roghtBottom.draw()
            this.dragCircles.leftBottom.draw()
        }
    }

    click(p) {
        if (!this.selected) {
            this.selected = p.x >= this.p.x && p.x <= this.p.x + this.w && p.y >= this.p.y && p.y <= this.p.y + this.h
        } else {

        }
    }

    mouseDown(p) {
        if (this.selected) {
            console.log('p.x', p.x)
            console.log('p.y', p.y)
            this.dragCircles.leftTop.mouseDown(p)
            this.dragCircles.rightTop.mouseDown(p)
            this.dragCircles.roghtBottom.mouseDown(p)
            this.dragCircles.leftBottom.mouseDown(p)
        }
    }

    mouseMove(p) {
        if (this.selected) {
            this.dragCircles.leftTop.mouseMove(p)
            this.dragCircles.rightTop.mouseMove(p)
            this.dragCircles.roghtBottom.mouseMove(p)
            this.dragCircles.leftBottom.mouseMove(p)
            if (this.dragCircles.roghtBottom.drag) {
                this.w = Math.abs(this.p.x - p.x)
                this.h = Math.abs(this.p.y - p.y)
                console.log('this.p.x', this.p.x)
                console.log('this.p.y', this.p.y)
                console.log('this.w', this.w)
                console.log('this.h', this.h)
                this.dragCircles.rightTop.p = new Vec2(this.p.x + this.w, this.p.y)
            }
        }
    }

    mouseUp() {
        if (this.selected) {
            this.dragCircles.leftTop.mouseUp()
            this.dragCircles.rightTop.mouseUp()
            this.dragCircles.roghtBottom.mouseUp()
            this.dragCircles.leftBottom.mouseUp()
        }
    }
}

let mousePos = { x: undefined, y: undefined };
let time = 0;
const rect_1_vec = new Vec2(50, 100),
    rect_1 = new Rectangle(200, 100, rect_1_vec, colors.red),
    circle_1 = new Circle(5, this.p, colors.black)

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
    time++
    ctx.clearRect(0, 0, ww, wh)



    rect_1.draw()
    // circle_1.draw()

    requestAnimationFrame(draw)
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
    rect_1.mouseMove(new Vec2(e.x, e.y))
}

const mousedown = (e) => {
    rect_1.mouseDown(new Vec2(e.x, e.y))
}

const mouseup = (e) => {
    rect_1.mouseUp()
}

const click = (e) => {
    rect_1.click(new Vec2(e.x, e.y))
}

window.addEventListener('resize', resize)
window.addEventListener('mousemove', mousemove)
window.addEventListener('mousedown', mousedown)
window.addEventListener('mouseup', mouseup)
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





