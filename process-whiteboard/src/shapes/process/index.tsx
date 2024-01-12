import { Vec, Id, W, H, C } from "@/types/shapes/common";

"use client";
import Core from "@/shapes/core";
export default class Process extends Core {
  super(id: Id, w: W, h: H, p: Vec, c: C) {}

  drawShape(ctx: CanvasRenderingContext2D) {
    const edge = this.getEdge();

    ctx.beginPath();
    ctx.fillRect(edge.l - this.p.x, edge.t - this.p.y, this.w, this.h);
    ctx.closePath();
  }
}
