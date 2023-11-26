"use client";
import { useRef, useEffect, useCallback } from "react";

let ctx: CanvasRenderingContext2D | null | undefined = null;
// point: {
//   p1: {
//     x: number;
//     y: number;
//   };
//   p2: {
//     x: number;
//     y: number;
//   };
//   cp1: {
//     x: number;
//     y: number;
//   };
//   cp2: {
//     x: number;
//     y: number;
//   };
// } = {
//   "p1": {
//     x: 0,
//     y: 0
//   },
//   "p2": {
//     x: 0,
//     y: 0
//   },
//   "cp1": {
//     x: 0,
//     y: 0
//   },
//   "cp2": {
//     x: 0,
//     y: 0
//   },
// },
// style = {
//   curve: {
//     width: 6,
//     color: '#333'
//   },
//   cpline: {
//     width: 1,
//     color: '#c00'
//   },
//   point: {
//     radius: 10,
//     width: 2,
//     color: '#900',
//     fill: 'rgba(200, 200, 200, .5)',
//     arc1: 0,
//     arc2: 2 * Math.PI
//   }
// },
// drag: keyof typeof point | null = null,
// dPoint: React.MouseEvent<HTMLCanvasElement> | null = null;

type Vec = { x: number, y: number }
type Line = {
  w: number;
  c: string
}
enum PressingP {
  p1 = "p1", cp1 = 'cp1', p2 = 'p2', cp2 = 'cp2'
}

class Curve {
  private initPressing = {
    activate: false,
    p: null,
  };
  cpline: Line;
  curve: Line;
  radius: number;
  p1: Vec | null;
  p2: Vec | null;
  cp1: Vec | null;
  cp2: Vec | null;
  initOffset: number;
  pressing: {
    activate: boolean;
    p: PressingP | null;
  };
  created: boolean;

  constructor(cpline: Line, curve: Line, initOffset: number) {
    this.cpline = cpline;
    this.curve = curve;
    this.radius = 10;
    this.p1 = null;
    this.p2 = null;
    this.cp1 = null;
    this.cp2 = null;
    this.initOffset = initOffset;
    this.pressing = this.initPressing
    this.created = false
  }

  checkBoundry($canvas: HTMLCanvasElement, p: Vec) {

    if (!$canvas || !this.p1 || !this.p2 || !this.cp1 || !this.cp2) return this.initPressing

    let dx, dy;

    dx = this.p1.x - p.x;
    dy = this.p1.y - p.y;

    if ((dx * dx) + (dy * dy) < this.radius * this.radius) {
      return {
        activate: true,
        p: PressingP.p1,
      };
    }

    dx = this.cp1.x - p.x;
    dy = this.cp1.y - p.y;

    if ((dx * dx) + (dy * dy) < this.radius * this.radius) {
      return {
        activate: true,
        p: PressingP.cp1,
      };
    }

    dx = this.p2.x - p.x;
    dy = this.p2.y - p.y;

    if ((dx * dx) + (dy * dy) < this.radius * this.radius) {
      return {
        activate: true,
        p: PressingP.p2,
      };
    }

    dx = this.cp2.x - p.x;
    dy = this.cp2.y - p.y;

    if ((dx * dx) + (dy * dy) < this.radius * this.radius) {
      return {
        activate: true,
        p: PressingP.cp2,
      };
    }

    return this.initPressing
  }

  onMouseDown(initP: Vec) {
    if (!this.created) {
      this.p1 = { x: initP.x - this.initOffset, y: initP.y };
      this.p2 = initP;
      this.cp1 = {
        x: this.p1.x + this.initOffset / 3,
        y: this.p1.y
      };
      this.cp2 = {
        x: this.p2.x - this.initOffset / 3,
        y: this.p2.y

      };
      this.pressing = {
        activate: true,
        p: PressingP.p2,
      }
    }
    // else if(){

    // }
  }

  onMouseMove(_x: number, _y: number) {
    if (!this.created) {
      if (this.pressing) {
        this.p2 = {
          x: _x,
          y: _y
        }
      }
    }
  }

  onMouseUp() {
    this.pressing = this.initPressing
    if (this.created === false) {
      this.created = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.p1 || !this.p2 || !this.cp1 || !this.cp2) return

    // control lines
    ctx.lineWidth = this.cpline.w;
    ctx.strokeStyle = this.cpline.c;
    ctx.fillStyle = this.cpline.c;

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.fillText(`(this.p1.x:${this.p1.x}, this.p1.y:${this.p1.y})`, this.p1.x + 14, this.p1.y)
    ctx.lineTo(this.cp1.x, this.cp1.y);
    ctx.fillText(`(this.cp1.x:${this.cp1.x}, this.cp1.y:${this.cp1.y})`, this.cp1.x + 14, this.cp1.y)

    if (this.cp2) {
      ctx.moveTo(this.p2.x, this.p2.y);
      ctx.fillText(`(this.p2.x:${this.p2.x}, this.p2.y:${this.p2.y})`, this.p2.x + 14, this.p2.y)
      ctx.lineTo(this.cp2.x, this.cp2.y);
      ctx.fillText(`(this.cp2.x:${this.cp2.x}, this.cp2.y:${this.cp2.y})`, this.cp2.x + 14, this.cp2.y)
    } else {
      ctx.lineTo(this.p2.x, this.p2.y);
    }
    ctx.stroke();

    // curve
    ctx.lineWidth = this.curve.w;
    ctx.strokeStyle = this.curve.c;

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    if (this.cp2) {
      ctx.bezierCurveTo(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.p2.x, this.p2.y);
    } else {
      ctx.quadraticCurveTo(this.cp1.x, this.cp1.y, this.p2.x, this.p2.y);
    }
    ctx.stroke();

    // control points
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#900';
    ctx.fillStyle = 'rgba(200, 200, 200, .5)';

    ctx.beginPath();
    ctx.arc(this.p1.x, this.p1.y, 10, 0, 2 * Math.PI, true); // p1 control point
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.cp1.x, this.cp1.y, 10, 0, 2 * Math.PI, true); // cp1 control point
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.p2.x, this.p2.y, 10, 0, 2 * Math.PI, true); // p2 control point
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.cp2.x, this.cp2.y, 10, 0, 2 * Math.PI, true); // cp2 control point
    ctx.fill();
    ctx.stroke();

  }
}

let shapes: any[] = []

export default function BezierCurve() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  function init(isQuadratic: boolean) {
    // if (!ctx) return
    // point = {
    //   p1: {
    //     x: 100,
    //     y: 250
    //   },
    //   p2: {
    //     x: 400,
    //     y: 250
    //   },
    //   cp1: {
    //     x: 150,
    //     y: 100
    //   },
    //   cp2: {
    //     x: 150,
    //     y: 100
    //   }
    // };

    // if (isQuadratic) {
    //   point.cp1 = {
    //     x: 250,
    //     y: 100
    //   }
    // } else {
    //   point.cp1 = {
    //     x: 150,
    //     y: 100
    //   }
    //   point.cp2 = {
    //     x: 350,
    //     y: 100
    //   }
    // };

    // // default styles
    // style = {
    //   curve: {
    //     width: 6,
    //     color: '#333'
    //   },
    //   cpline: {
    //     width: 1,
    //     color: '#c00'
    //   },
    //   point: {
    //     radius: 10,
    //     width: 2,
    //     color: '#900',
    //     fill: 'rgba(200, 200, 200, .5)',
    //     arc1: 0,
    //     arc2: 2 * Math.PI
    //   }
    // };

    // // line style defaults
    // ctx.lineCap = 'round';
    // ctx.lineJoin = 'round';

    // drawScreen();
  }

  function drawScreen() {

  }

  // const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
  //   let $canvas = document.querySelector('canvas')
  //   if (!ctx || !$canvas) return

  //   let dx, dy;
  //   for (let pKey in point) {
  //     let p = pKey as keyof typeof point
  //     dx = point[p].x - e.nativeEvent.offsetX;
  //     dy = point[p].y - e.nativeEvent.offsetY;

  //     if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) { // Pythagorean theorem
  //       drag = p;
  //       dPoint = e;
  //       $canvas.style.cursor = 'move';
  //     }
  //   }
  // }, [])

  // const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (drag && dPoint) {
  //     point[drag].x = e.nativeEvent.offsetX;
  //     point[drag].y = e.nativeEvent.offsetY;
  //     dPoint = e; // TODO: is required?
  //     drawScreen();
  //   }
  // }, [])

  // const onMouseUp = useCallback(() => {
  //   let $canvas = document.querySelector('canvas')
  //   if (!$canvas) return
  //   drag = null;
  //   $canvas.style.cursor = 'default';
  //   drawScreen();
  // }, [])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    let $canvas = document.querySelector('canvas')
    if (!ctx || !$canvas) return
    let cpline = {
      w: 1,
      c: '#c00'
    }

    let curve = {
      w: 6,
      c: '#333'
    };

    let point = {
      p1: {
        x: 100,
        y: 250
      },
      p2: {
        x: 400,
        y: 250
      },
      // cp1: {
      //   x: 150,
      //   y: 100
      // },
      // cp2: {
      //   x: 350,
      //   y: 100
      // }
    };

    let initPoint = {
      x: e.nativeEvent.x,
      y: e.nativeEvent.y
    }

    let pressingShape = false

    shapes.forEach(shape => {
      if (shape.checkBoundry($canvas, initPoint).activate) {
        pressingShape = true
      }
    })

    if (pressingShape) return console.log('A')

    // if(type === 'curve'){ // TODO: 待之後有不同工具時做判斷
    let newCurve = new Curve(cpline, curve, 300)
    shapes.push(newCurve)
    newCurve.onMouseDown(initPoint)

    // }

    console.log('shapes', shapes)
  }, [])


  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    shapes.forEach(shape => {
      if (shape instanceof Curve) {
        shape.onMouseMove(e.nativeEvent.x, e.nativeEvent.y)
      }
    })
  }, [])

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    shapes.forEach(shape => {
      if (shape instanceof Curve) {
        shape.onMouseUp()
      }
    })
  }, [])

  const draw = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    shapes.forEach(shape => {
      if (!ctx) return
      if (shape instanceof Curve) {
        shape.draw(ctx)
      }
    })
    window.requestAnimationFrame(draw)
  }

  useEffect(() => {
    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      init(false);

      window.requestAnimationFrame(draw)
    }
  }, []);


  return (
    <canvas
      ref={(el) => {
        $canvas = el;
        ctx = $canvas?.getContext("2d");
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
}
