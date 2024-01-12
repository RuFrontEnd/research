"use client";
import Core from "@/shapes/core";
import ReactDom from "react-dom";
import ImportFrame from "@/components/importFrame";
import { Vec, Id, W, H, C } from "@/types/shapes/common";

export default class Data extends Core {
  super(id: Id, w: W, h: H, p: Vec, c: C) {}

  onDoubleClick(p: Vec) {
    const $body = document.querySelector("body");
    if (this.checkBoundry(p) && $body) {
      return ReactDom.createPortal(
        <ImportFrame
          coordinate={{
            x: this.p.x,
            y: this.p.y,
          }}
        />,
        $body
      );
    }
  }

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
