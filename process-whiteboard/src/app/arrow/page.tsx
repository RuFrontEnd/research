"use client";
import { useRef, useEffect } from "react";

let ctx: CanvasRenderingContext2D | null | undefined = null;


export class Arrow {
  w: number;
  h: number

  constructor(w: number, h: number) {
    this.w = w
    this.h = h
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, degree?: number, color?: string) {
    ctx.beginPath()
    ctx.fillStyle = color ? color : 'black'
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(degree ? degree : 0)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, this.h / 2)
    ctx.lineTo(this.w / 2, this.h / 2)
    ctx.lineTo(0, -this.h / 2)
    ctx.lineTo(-this.w / 2, this.h / 2)
    ctx.lineTo(0, this.h / 2)
    ctx.fill()
    ctx.restore()
    ctx.closePath()
  }
}

export default function ArrowPage() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  function init(isQuadratic: boolean) {
    if (!ctx) return

    drawScreen();
  }

  function drawScreen() {
    if (!ctx) return
    let arrow1 = new Arrow(100, 100)
    let arrow2 = new Arrow(100, 100)
    let arrow3 = new Arrow(100, 100)
    arrow1.draw(ctx, 100, 50)
    arrow2.draw(ctx, 100, 150, Math.PI / 2)
    arrow3.draw(ctx, 100, 250, Math.PI / 6)

  }

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
    />
  );
}
