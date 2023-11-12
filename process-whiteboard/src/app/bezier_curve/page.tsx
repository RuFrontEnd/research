"use client";
import { useState, useRef, useEffect, useCallback, EventHandler } from "react";
import Image from "next/image";

let lineOffset = 4, // increase operation area
  anchrSize = 2;

type Box = {
  x1: 0;
  y1: number;
  x2: number;
  y2: number;
  lineWidth: number;
  color: string;
};

let ctx: CanvasRenderingContext2D | null | undefined = null,
  point: {
    p1: {
      x: number;
      y: number;
    };
    p2: {
      x: number;
      y: number;
    };
    cp1: {
      x: number;
      y: number;
    };
    cp2: {
      x: number;
      y: number;
    };
  } = {
    "p1": {
      x: 0,
      y: 0
    },
    "p2": {
      x: 0,
      y: 0
    },
    "cp1": {
      x: 0,
      y: 0
    },
    "cp2": {
      x: 0,
      y: 0
    },
  },
  style = {
    curve: {
      width: 6,
      color: '#333'
    },
    cpline: {
      width: 1,
      color: '#c00'
    },
    point: {
      radius: 10,
      width: 2,
      color: '#900',
      fill: 'rgba(200, 200, 200, .5)',
      arc1: 0,
      arc2: 2 * Math.PI
    }
  },
  drag: keyof typeof point | null = null,
  dPoint: React.MouseEvent<HTMLCanvasElement> | null = null;

export default function BezierCurve() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  function init(isQuadratic: boolean) {
    if (!ctx) return
    point = {
      p1: {
        x: 100,
        y: 250
      },
      p2: {
        x: 400,
        y: 250
      },
      cp1: {
        x: 150,
        y: 100
      },
      cp2: {
        x: 150,
        y: 100
      }
    };

    if (isQuadratic) {
      point.cp1 = {
        x: 250,
        y: 100
      }
    } else {
      point.cp1 = {
        x: 150,
        y: 100
      }
      point.cp2 = {
        x: 350,
        y: 100
      }
    };

    // default styles
    style = {
      curve: {
        width: 6,
        color: '#333'
      },
      cpline: {
        width: 1,
        color: '#c00'
      },
      point: {
        radius: 10,
        width: 2,
        color: '#900',
        fill: 'rgba(200, 200, 200, .5)',
        arc1: 0,
        arc2: 2 * Math.PI
      }
    };

    // // line style defaults
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    drawScreen();
  }

  function drawScreen() {
    if (!ctx) return
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // control lines
    ctx.lineWidth = style.cpline.width;
    ctx.strokeStyle = style.cpline.color;
    ctx.fillStyle = style.cpline.color;

    ctx.beginPath();
    ctx.moveTo(point.p1.x, point.p1.y);
    ctx.fillText(`(point.p1.x:${point.p1.x}, point.p1.y:${point.p1.y})`, point.p1.x + 14, point.p1.y)
    ctx.lineTo(point.cp1.x, point.cp1.y);
    ctx.fillText(`(point.cp1.x:${point.cp1.x}, point.cp1.y:${point.cp1.y})`, point.cp1.x + 14, point.cp1.y)

    if (point.cp2) {
      ctx.moveTo(point.p2.x, point.p2.y);
      ctx.fillText(`(point.p2.x:${point.p2.x}, point.p2.y:${point.p2.y})`, point.p2.x + 14, point.p2.y)
      ctx.lineTo(point.cp2.x, point.cp2.y);
      ctx.fillText(`(point.cp2.x:${point.cp2.x}, point.cp2.y:${point.cp2.y})`, point.cp2.x + 14, point.cp2.y)
    } else {
      ctx.lineTo(point.p2.x, point.p2.y);
    }
    ctx.stroke();

    // curve
    ctx.lineWidth = style.curve.width;
    ctx.strokeStyle = style.curve.color;

    ctx.beginPath();
    ctx.moveTo(point.p1.x, point.p1.y);
    if (point.cp2) {
      ctx.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y);
    } else {
      ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
    }
    ctx.stroke();

    // control points
    for (let p in point) {
      ctx.lineWidth = style.point.width;
      ctx.strokeStyle = style.point.color;
      ctx.fillStyle = style.point.fill;
      ctx.beginPath();
      ctx.arc(point[p as keyof typeof point].x, point[p as keyof typeof point].y, style.point.radius, style.point.arc1, style.point.arc2, true);
      ctx.fill();
      ctx.stroke();
    }
  }

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    let $canvas = document.querySelector('canvas')
    if (!ctx || !$canvas) return

    let dx, dy;
    for (let pKey in point) {
      let p = pKey as keyof typeof point
      dx = point[p].x - e.nativeEvent.offsetX;
      dy = point[p].y - e.nativeEvent.offsetY;

      if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) { // Pythagorean theorem
        drag = p;
        dPoint = e;
        $canvas.style.cursor = 'move';
      }
    }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (drag && dPoint) {
      point[drag].x = e.nativeEvent.offsetX;
      point[drag].y = e.nativeEvent.offsetY;
      dPoint = e; // TODO: is required?
      drawScreen();
    }
  }, [])

  const onMouseUp = useCallback(() => {
    let $canvas = document.querySelector('canvas')
    if (!$canvas) return
    drag = null;
    $canvas.style.cursor = 'default';
    drawScreen();
  }, [])

  useEffect(() => {
    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      init(false);
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
