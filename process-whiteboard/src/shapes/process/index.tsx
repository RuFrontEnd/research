"use client";
import Core from "@/shapes/core";
import { Vec, Id, W, H, C, Title, Data as DataType } from "@/types/shapes/common";

export default class Process extends Core {
  isFrameOpen: boolean;
  title: Title;
  data: DataType;
  frameOffset: number

  constructor(id: Id, w: W, h: H, p: Vec, c: C) {
    super(id, w, h, p, c)
    this.isFrameOpen = false
    this.title = ""
    this.data = []
    this.frameOffset = 20
  }

  drawShape(ctx: CanvasRenderingContext2D) {
    const edge = this.getEdge();

    ctx.beginPath();
    ctx.fillRect(edge.l - this.p.x, edge.t - this.p.y, this.w, this.h);
    ctx.closePath();
  }
}
