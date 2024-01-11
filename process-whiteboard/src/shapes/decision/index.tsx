"use client";
import Core from "@/shapes/core";
import { Vec } from "@/types/shapes/common";
export default class Desicion extends Core {
  super(id: string, w: number, h: number, p: Vec, c: string) {

  }
  drawShape(ctx: CanvasRenderingContext2D) {

    // 定义四个顶点的坐标
    const x1 = this.p.x, y1 = this.p.y - this.h / 2;
    const x2 = this.p.x + this.w, y2 = this.p.y;
    const x3 = this.p.x, y3 = this.p.y + this.h / 2;
    const x4 = this.p.x - this.w, y4 = this.p.y;

    ctx.beginPath()
    // 移动到第一个顶点
    ctx.moveTo(x1, y1);

    // 连接四个顶点，绘制菱形
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();

    // 设置填充颜色
    ctx.fillStyle = '#3498db';

    // 填充菱形
    ctx.fill();
  }
}
