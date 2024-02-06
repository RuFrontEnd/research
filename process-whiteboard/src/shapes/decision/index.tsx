"use client";
import Core from "@/shapes/core";
import {
  Vec,
  Id,
  W,
  H,
  C,
  Title,
  Data as DataType,
} from "@/types/shapes/common";
export default class Desicion extends Core {
  constructor(id: Id, w: W, h: H, p: Vec, c: C) {
    super(id, w, h, p, c);
  }

  onDataChange = (title: Title, data: DataType) => {
    this.title = title;
    this.selectedData = data;
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.p.x, this.p.y);
    ctx.fillStyle = this.c;
    // 定义四个顶点的坐标
    const x1 = -this.w / 2,
      y1 = 0;
    const x2 = 0,
      y2 = this.h / 2;
    const x3 = this.w / 2,
      y3 = 0;
    const x4 = 0,
      y4 = -this.h / 2;

    ctx.beginPath();
    // 移动到第一个顶点
    ctx.moveTo(x1, y1);

    // 连接四个顶点，绘制菱形
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();

    // 填充菱形
    ctx.fill();
    ctx.restore();

    super.draw(ctx);

    ctx.save();
    ctx.translate(this.p.x, this.p.y);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "14px Arial";

    if (
      this.curves.l &&
      this.curves.l.p1 &&
      this.curves.l.cp1 &&
      this.curves.l.cp2 &&
      this.curves.l.p2
    ) {
      const bezierPoint = this.curves.l.getBezierPoint(0.5, [
        this.curves.l.p1,
        this.curves.l.cp1,
        this.curves.l.cp2,
        this.curves.l.p2,
      ]);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(bezierPoint.x, bezierPoint.y, 10, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.fillText("Y", bezierPoint.x, bezierPoint.y + 2);
    }
    if (
      this.curves.t &&
      this.curves.t.p1 &&
      this.curves.t.cp1 &&
      this.curves.t.cp2 &&
      this.curves.t.p2
    ) {
      const bezierPoint = this.curves.t.getBezierPoint(0.5, [
        this.curves.t.p1,
        this.curves.t.cp1,
        this.curves.t.cp2,
        this.curves.t.p2,
      ]);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(bezierPoint.x, bezierPoint.y, 10, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.fillText("Y", bezierPoint.x, bezierPoint.y + 2);
    }
    if (
      this.curves.r &&
      this.curves.r.p1 &&
      this.curves.r.cp1 &&
      this.curves.r.cp2 &&
      this.curves.r.p2
    ) {
      const bezierPoint = this.curves.r.getBezierPoint(0.5, [
        this.curves.r.p1,
        this.curves.r.cp1,
        this.curves.r.cp2,
        this.curves.r.p2,
      ]);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(bezierPoint.x, bezierPoint.y, 10, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.fillText("Y", bezierPoint.x, bezierPoint.y + 2);
    }
    if (
      this.curves.b &&
      this.curves.b.p1 &&
      this.curves.b.cp1 &&
      this.curves.b.cp2 &&
      this.curves.b.p2
    ) {
      const bezierPoint = this.curves.b.getBezierPoint(0.5, [
        this.curves.b.p1,
        this.curves.b.cp1,
        this.curves.b.cp2,
        this.curves.b.p2,
      ]);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(bezierPoint.x, bezierPoint.y, 10, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.fillText("Y", bezierPoint.x, bezierPoint.y + 2);
    }

    ctx.restore();
  }
}
