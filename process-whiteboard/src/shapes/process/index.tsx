// TODO: 整理 Process 並拆出共用邏輯

"use client";
import Core from "@/shapes/core";
export default class Process extends Core {
  drawShape(ctx: CanvasRenderingContext2D) {
    const edge = this.getEdge();

    ctx.save();
    ctx.translate(this.p.x, this.p.y);
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(edge.l - this.p.x, edge.t - this.p.y, this.w, this.h);
    ctx.closePath();
  }
}
