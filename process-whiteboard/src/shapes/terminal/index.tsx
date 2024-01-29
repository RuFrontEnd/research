"use client";
import Core from "@/shapes/core";
import Process from "@/shapes/process";
import Data from "@/shapes/data";
import Decision from "@/shapes/decision";
import { ConnectTarget } from "@/types/shapes/core";
import {
  Vec,
  Id,
  W,
  H,
  C,
  Direction,
  Data as DataType,
} from "@/types/shapes/common";
import { cloneDeep } from "lodash";

export default class Terminal extends Core {
  isStart: boolean;

  constructor(id: Id, w: W, h: H, p: Vec, c: C, isStart: boolean) {
    super(id, w, h, p, c);
    this.isStart = isStart;
  }

  onTraversal() {
    // traversal all relational steps
    const queue: (Core | Process | Data | Decision)[] = [this],
      hash = { [this.id]: true },
      options: DataType = [];

    let ds = [Direction.l, Direction.t, Direction.r, Direction.b];

    while (queue.length !== 0) {
      const shape = queue[0];

      shape.options = cloneDeep(options); // give options to the shape

      if (shape instanceof Data) {
        shape.data.forEach((dataItem) => {
          options.push(dataItem);
        });
      }

      ds.forEach((d) => {
        const connectTarget: ConnectTarget = shape.sendTo[d];

        // prevent from graph cycle
        if (connectTarget && !hash[connectTarget.shape.id]) {
          queue.push(connectTarget.shape);
          hash[connectTarget.shape.id] = true;
        }
      });

      queue.shift();
    }
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
