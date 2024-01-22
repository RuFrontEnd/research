"use client";
import Core from "@/shapes/core";
import { Vec, Id, W, H, C } from "@/types/shapes/common";

export default class Terminal extends Core {
  constructor(id: Id, w: W, h: H, p: Vec, c: C) {
    super(id, w, h, p, c);
  }

  drawShape(ctx: CanvasRenderingContext2D) {
    if (this.w >= this.h) {
      let r = this.h / 2;
      ctx.beginPath();
      ctx.fillStyle = this.c;
      ctx.arc(-this.w / 2 + r, 0, r, 0, 2 * Math.PI);
      ctx.arc(this.w / 2 - r, 0, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillRect(-this.w / 2 + r, -r, this.w - 2 * r, this.h);
    } else if (this.w < this.h) {
      let r = this.w / 2;
      ctx.beginPath();
      ctx.fillStyle = this.c;
      ctx.arc(0, -this.h / 2 + r, r, 0, 2 * Math.PI);
      ctx.arc(0, this.h / 2 - r, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillRect(-r, -this.h / 2 + r, this.w, this.h - 2 * r);
    }
  }
}
