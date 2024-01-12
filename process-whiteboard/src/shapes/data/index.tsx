"use client";
import Core from "@/shapes/core";
import { Vec, Id, W, H, C } from "@/types/shapes/common";

export default class Data extends Core {
  super(id: Id, w: W, h: H, p: Vec, c: C) {}

  drawShape(ctx: CanvasRenderingContext2D) {
    const x1 = -this.w / 2 + 20,
      y1 = -this.h / 2,
      x2 = this.w / 2,
      y2 = -this.h / 2,
      x3 = this.w / 2 - 20,
      y3 = this.h / 2,
      x4 = -this.w / 2,
      y4 = this.h / 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  }
}
