"use client";
import Core from "@/shapes/core";
import { Vec, Id, W, H, C } from "@/types/shapes/common";
export default class Desicion extends Core {
  super(id: Id, w: W, h: H, p: Vec, c: C) {}
  drawShape(ctx: CanvasRenderingContext2D) {
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

    // 设置填充颜色
    ctx.fillStyle = "#3498db";

    // 填充菱形
    ctx.fill();
  }
}
