const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d")

// assign canvas size
let ww = canvas.width = window.innerWidth,
    wh = canvas.height = window.innerHeight

let shapes = [];
let current_shape_index = null;
let is_dragging = false;
let startX;
let startY;
let offset_x;
let offset_y;
shapes.push({ x: 200, y: 50, width: 200, height: 200, color: 'red' })
shapes.push({ x: 0, y: 0, width: 100, height: 100, color: 'blue' })

const get_offset = function () {
    let canvas_offsets = canvas.getBoundingClientRect();
    offset_x = canvas_offsets.left
    offset_y = canvas_offsets.top

}

get_offset()
window.onscroll = function () {
    get_offset()
}
window.onresize = function () {
    get_offset()
    ww = canvas.width = window.innerWidth
    wh = canvas.height = window.innerHeight
    draw_shapes()
}
canvas.onscroll = function () {
    get_offset()
}

const is_mouse_in_shape = function (x, y, shape) {
    let shape_left = shape.x,
        shape_right = shape.x + shape.width,
        shape_top = shape.y,
        shape_bottom = shape.y + shape.height

    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
        return true
    }

    return false
}

let mouse_down = function (event) {
    event.preventDefault()
    console.log(event)

    startX = parseInt(event.clientX - offset_x)
    startY = parseInt(event.clientY - offset_y)

    let index = 0;

    for (let shape of shapes) {
        if (is_mouse_in_shape(startX, startY, shape)) {
            console.log('yes')
            current_shape_index = index
            is_dragging = true
            return
        } else {
            console.log('no')
        }
        index++
    }
}

let mouse_up = function (event) {
    if (!is_dragging) {
        return
    }

    event.preventDefault()
    is_dragging = false
}

let mouse_out = function (event) {
    if (!is_dragging) {
        return
    }

    event.preventDefault()
    is_dragging = false
}

let mouse_move = function (event) {
    if (!is_dragging) {
        return
    } else {
        event.preventDefault()

        let mouseX = parseInt(event.clientX),
            mouseY = parseInt(event.clientY)

        let dx = mouseX - startX, // x 軸位移距離
            dy = mouseY - startY // y 軸位移距離

        console.log(dx, dy)

        let current_shape = shapes[current_shape_index];
        console.log('current_shape', current_shape)
        current_shape.x += dx;
        current_shape.y += dy

        draw_shapes()

        startX = mouseX
        startY = mouseY
    }

}

function draw_shapes() {
    ctx.clearRect(0, 0, ww, wh)

    shapes.forEach(shape => {
        ctx.fillStyle = shape.color;
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
    })
}

canvas.onmousedown = mouse_down
canvas.onmouseup = mouse_up
canvas.onmouseout = mouse_out
canvas.onmousemove = mouse_move

draw_shapes()

