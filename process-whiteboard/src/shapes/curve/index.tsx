"use client";
import Arrow from "@/shapes/arrow";
import { Vec } from "@/types/shapes/common";
import { Line, PressingP } from "@/types/shapes/curve";

export default class Curve {
  private initPressing = {
    activate: false,
    p: null,
  };
  cpline: Line;
  curve: Line;
  radius: number;
  p1: Vec | null;
  p2: Vec | null;
  cp1: Vec | null;
  cp2: Vec | null;
  pressing: {
    activate: boolean;
    p: PressingP | null;
  };
  arrow: Arrow;
  dragP: Vec | null;

  constructor(cpline: Line, curve: Line) {
    this.cpline = cpline;
    this.curve = curve;
    this.radius = 10;
    this.p1 = null;
    this.p2 = null;
    this.cp1 = null;
    this.cp2 = null;
    this.pressing = this.initPressing;
    this.arrow = new Arrow(20, 20);
    this.dragP = null;
  }

  checkBoundry(p: Vec) {
    if (!this.p1 || !this.p2 || !this.cp1 || !this.cp2) {
      this.pressing = this.initPressing;
      return this.pressing;
    }

    let dx, dy;

    dx = this.p2.x - p.x;
    dy = this.p2.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.p2,
      };
      return this.pressing;
    }

    dx = this.cp2.x - p.x;
    dy = this.cp2.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.cp2,
      };
      return this.pressing;
    }

    dx = this.cp1.x - p.x;
    dy = this.cp1.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.cp1,
      };
      return this.pressing;
    }

    dx = this.p1.x - p.x;
    dy = this.p1.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.p1,
      };
      return this.pressing;
    }

    this.pressing = this.initPressing;
    return this.pressing;
  }

  init(initP1: Vec, initCP1: Vec, initCP2: Vec, initP2: Vec) {
    this.p1 = initP1;
    this.cp1 = initCP1;
    this.cp2 = initCP2;
    this.p2 = initP2;
    this.pressing = {
      activate: true,
      p: PressingP.p2,
    };
  }

  onMouseDown($canvas: HTMLCanvasElement) {
    if (this.pressing.activate) {
      $canvas.style.cursor = "move";
    }
  }

  onMouseMove(p: Vec) {
    if (this.pressing.activate) {
      if (
        this.pressing.p === PressingP.p1 &&
        this.p1 !== null &&
        this.cp1 !== null
      ) {
        const offset = {
          x: p.x - this.p1.x,
          y: p.y - this.p1.y,
        };

        this.p1 = {
          x: p.x,
          y: p.y,
        };

        this.cp1.x += offset.x;
        this.cp1.y += offset.y;
      } else if (
        this.pressing.p === PressingP.cp1 &&
        this.cp1?.x !== null &&
        this.cp1?.y !== null
      ) {
        this.cp1 = {
          x: p.x,
          y: p.y,
        };
      } else if (
        this.pressing.p === PressingP.p2 &&
        this.p2 !== null &&
        this.cp2 !== null
      ) {
        const offset = {
          x: p.x - this.p2.x,
          y: p.y - this.p2.y,
        };

        this.p2 = {
          x: p.x,
          y: p.y,
        };

        this.cp2.x += offset.x;
        this.cp2.y += offset.y;
      } else if (
        this.pressing.p === PressingP.cp2 &&
        this.cp2?.x !== null &&
        this.cp2?.y !== null
      ) {
        this.cp2 = {
          x: p.x,
          y: p.y,
        };
      }
    }
  }

  onMouseUp($canvas: HTMLCanvasElement) {
    if (this.pressing.activate) {
      $canvas.style.cursor = "default";
      this.pressing = this.initPressing;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.p1 || !this.p2 || !this.cp1 || !this.cp2) return;

    // control lines
    ctx.lineWidth = this.cpline.w;
    ctx.strokeStyle = this.cpline.c;
    ctx.fillStyle = this.cpline.c;

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.fillText(`p1`, this.p1.x + 14, this.p1.y);
    // ctx.fillText(
    //   `(this.p1.x:${this.p1.x}, this.p1.y:${this.p1.y})`,
    //   this.p1.x + 14,
    //   this.p1.y
    // );
    ctx.lineTo(this.cp1.x, this.cp1.y);
    ctx.fillText(`cp1`, this.cp1.x + 14, this.cp1.y);
    // ctx.fillText(
    //   `(this.cp1.x:${this.cp1.x}, this.cp1.y:${this.cp1.y})`,
    //   this.cp1.x + 14,
    //   this.cp1.y
    // );

    if (this.cp2) {
      ctx.moveTo(this.p2.x, this.p2.y);
      ctx.fillText(`p2`, this.p2.x + 14, this.p2.y);
      // ctx.fillText(
      //   `(this.p2.x:${this.p2.x}, this.p2.y:${this.p2.y})`,
      //   this.p2.x + 14,
      //   this.p2.y
      // );
      ctx.lineTo(this.cp2.x, this.cp2.y);
      ctx.fillText(`cp2`, this.cp2.x + 14, this.cp2.y);
      // ctx.fillText(
      //   `(this.cp2.x:${this.cp2.x}, this.cp2.y:${this.cp2.y})`,
      //   this.cp2.x + 14,
      //   this.cp2.y
      // );
    } else {
      ctx.lineTo(this.p2.x, this.p2.y);
    }
    ctx.stroke();

    // curve
    ctx.lineWidth = this.curve.w;
    ctx.strokeStyle = this.curve.c;

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    if (this.cp2) {
      ctx.bezierCurveTo(
        this.cp1.x,
        this.cp1.y,
        this.cp2.x,
        this.cp2.y,
        this.p2.x,
        this.p2.y
      );
    } else {
      ctx.quadraticCurveTo(this.cp1.x, this.cp1.y, this.p2.x, this.p2.y);
    }
    ctx.stroke();

    // arrow
    this.arrow.draw(
      ctx,
      { x: this.p2.x, y: this.p2.y },
      Math.atan2(this.p2.y - this.cp2.y, this.p2.x - this.cp2.x) +
        90 * (Math.PI / 180)
    );

    // control points
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#900";
    ctx.fillStyle = "rgba(200, 200, 200, .5)";

    ctx.beginPath();
    ctx.arc(this.p1.x, this.p1.y, 10, 0, 2 * Math.PI, true); // p1 control point
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.cp1.x, this.cp1.y, 10, 0, 2 * Math.PI, true); // cp1 control point
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.p2.x, this.p2.y, 10, 0, 2 * Math.PI, true); // p2 control point
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.cp2.x, this.cp2.y, 10, 0, 2 * Math.PI, true); // cp2 control point
    ctx.fill();
    ctx.stroke();
  }
}
