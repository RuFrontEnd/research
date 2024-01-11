 "use client";
import Core from "@/shapes/core";
import { Vec } from "@/types/shapes/common";
export default class InOutput extends Core {
  super(id: string, w: number, h: number, p: Vec, c: string){

  }
  drawShape(ctx: CanvasRenderingContext2D) {



    // Define the vertices of the parallelogram
    const x1 = -this.w / 2 + 20,
      y1 = -this.h / 2,
      x2 = this.w / 2,
      y2 = -this.h / 2,
      x3 = this.w / 2 - 20,
      y3 = this.h / 2,
      x4 = -this.w / 2,
      y4 = this.h / 2;

    // Begin the path
    ctx.beginPath();

    // Move to the first vertex
    ctx.moveTo(x1, y1);

    // Draw lines to the other vertices
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);

    // Close the path (connect the last and first vertices)
    ctx.closePath();

    // Fill the parallelogram
    ctx.fill();
  }
}
