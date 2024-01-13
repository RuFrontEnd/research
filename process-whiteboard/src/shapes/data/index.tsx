"use client";
import Core from "@/shapes/core";
import ReactDom from "react-dom";
import ImportFrame from "@/components/importFrame";
import { Vec, Id, W, H, C } from "@/types/shapes/common";
import { Data as DataType } from "@/types/components/importFrame";
import { Title } from '@/types/shapes/common'


export default class Data extends Core {
  isFrameOpen: boolean;
  title: Title;
  data: DataType;

  constructor(id: Id, w: W, h: H, p: Vec, c: C) {
    super(id, w, h, p, c)
    this.isFrameOpen = false
    this.title = ""
    this.data = []
  }

  getCoordinate = () => {
    return {
      x: this.p.x + this.w / 2 + 10,
      y: this.p.y,
    }
  }

  onConfirm = (title: Title, data: DataType) => {
    this.title = title
    this.data = data
  }


  onMouseMove(p: Vec, receivable?: boolean) {
    super.onMouseMove(p, receivable)
    const $body = document.querySelector("body");

    if (!this.checkBoundry(p) || !$body || !this.isFrameOpen) return

    return ReactDom.createPortal(
      <ImportFrame
        coordinate={this.getCoordinate()}
        onConfirm={this.onConfirm}
        init={{ title: this.title, data: this.data.length === 0 ? [""] : this.data }}
      />,
      $body
    );
  }

  onDoubleClick(p: Vec) {
    const $body = document.querySelector("body");

    if (!this.checkBoundry(p) || !$body) return
    
    this.isFrameOpen = true

    return ReactDom.createPortal(
      <ImportFrame
        coordinate={this.getCoordinate()}
        onConfirm={this.onConfirm}
        init={{ title: this.title, data: this.data.length === 0 ? [""] : this.data }}

      />,
      $body
    );

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
