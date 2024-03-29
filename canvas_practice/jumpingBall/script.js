const canvas = document.getElementById('mycanvas')
const ctx = canvas.getContext('2d')

ww = canvas.width = window.innerWidth
wh = canvas.height = window.innerHeight

window.addEventListener('resize', function () {
  ww = canvas.width = window.innerWidth
  wh = canvas.height = window.innerHeight
})

const Ball = function () {
  this.p = {
    x: ww / 2, // size of window divided by 2
    y: wh / 2
  }
  this.v = {
    x: 3,
    y: 3
  }
  this.a = {
    x: 0,
    y: 1
  }
  this.r = 50
  this.dragging = false
} // create Ball constructor

Ball.prototype.draw = function () {
  ctx.beginPath()
  ctx.save()
  ctx.translate(this.p.x, this.p.y)
  ctx.arc(0, 0, this.r, 0, Math.PI * 2)
  ctx.fillStyle = controls.color
  ctx.fill()
  ctx.restore()

  this.drawV()
}
Ball.prototype.drawV = function () {
  ctx.beginPath()
  ctx.save()
  ctx.translate(this.p.x, this.p.y)
  ctx.scale(3, 3)
  ctx.moveTo(0, 0)
  ctx.lineTo(this.v.x, this.v.y)
  ctx.strokeStyle = 'blue'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(this.v.x, 0)
  ctx.strokeStyle = 'red'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, this.v.y)
  ctx.strokeStyle = 'green'
  ctx.stroke()

  ctx.restore()
}
Ball.prototype.update = function () {
  if (this.dragging === false) {
    this.p.x += this.v.x
    this.p.y += this.v.y

    // velocity should be changed by adding acceleration
    this.v.x += this.a.x
    this.v.y += this.a.y

    this.v.x *= 0.99
    this.v.y *= 0.99

    this.v.x *= controls.fade
    this.v.y *= controls.fade

    controls.vx = this.v.x
    controls.vy = this.v.y
    controls.ay = this.a.y

    this.checkBoundary()
  }
}
Ball.prototype.checkBoundary = function () {
  // reverse move direction when contact to the edge of window
  if (this.p.x + this.r > ww) {
    this.v.x = -Math.abs(this.v.x)
  }
  if (this.p.x - this.r < 0) {
    this.v.x = Math.abs(this.v.x)
  }
  if (this.p.y + this.r > wh) {
    this.v.y = -Math.abs(this.v.y)
  }
  if (this.p.y - this.r < 0) {
    this.v.y = Math.abs(this.v.y)
  }
}

const controls = {
  vx: 0,
  vy: 0,
  ay: 0.6,
  fade: 0.99,
  update: true,
  color: '#fff',
  step: function () {
    ball.update()
  },
  FPS: 30
}
const gui = new dat.GUI()
gui
  .add(controls, 'vx', -50, 50)
  .listen()
  .onChange(function (value) {
    ball.v.x = value
  })
gui
  .add(controls, 'vy', -50, 50)
  .listen()
  .onChange(function (value) {
    ball.v.y = value
  })
gui
  .add(controls, 'ay', -1, 1)
  .step(0.001)
  .listen()
  .onChange(function (value) {
    ball.a.y = value
  })
gui.add(controls, 'fade', 0, 1).step(0.01).listen()
gui.add(controls, 'update')
gui.addColor(controls, 'color')
gui.add(controls, 'step')
gui.add(controls, 'FPS', 1, 120)

let ball
function init() {
  ball = new Ball() // create ball instance
}
init()

function update() {
  if (controls.update) {
    ball.update()
  }
}

setInterval(update, 1000 / 30) // excute 30 times per 1s

function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(0, 0, ww, wh)

  ball.draw()

  // requestAnimationFrame(draw)
  setTimeout(draw, 1000 / controls.FPS)
}

draw()

let mousePos = {
  x: 0,
  y: 0
}

function getDistance(p1, p2) {
  let temp1 = p1.x - p2.x,
    temp2 = p1.y - p2.y
  let dist = Math.pow(temp1, 2) + Math.pow(temp2, 2)
  return Math.sqrt(dist)
}

canvas.addEventListener('mousedown', function (evt) {
  mousePos = { x: evt.x, y: evt.y }
  console.log('mousePos', mousePos)
  let dist = getDistance(mousePos, ball.p)
  console.log('dist', dist)
  if (dist < ball.r) {
    // if ball is clicked
    console.log('ball clicked')
    ball.dragging = true
  }
})

canvas.addEventListener('mousemove', function (evt) {
  let nowPos = { x: evt.x, y: evt.y }
  if (ball.dragging) {
    let dx = nowPos.x - ball.p.x, // mousemove trigger once every steady time, so dx won't always be 1 or -1
      dy = nowPos.y - ball.p.y

    ball.p.x += dx
    ball.p.y += dy

    ball.v.x = dx
    ball.v.y = dy
  }
  mousePos = nowPos

  let dist = getDistance(mousePos, ball.p)
  if (dist < ball.r) {
    canvas.style.cursor = 'move'
  } else {
    canvas.style.cursor = 'initial'
  }
})

canvas.addEventListener('mouseup', function (evt) {
  ball.dragging = false
})

// requestAnimationFrame(draw) // using fastest speed to re-render browser view
