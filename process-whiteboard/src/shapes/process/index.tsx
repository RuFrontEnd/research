"use client";
import Curve from "@/shapes/curve";
import { Vec } from "@/types/vec";
import { Line, PressingP as CurvePressingP } from "@/types/shapes/curve";

type Box = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineWidth: number;
  color: string;
  editing: boolean;
};

enum PressingTarget {
  // anchor points
  m = "m",
  lt = "lt",
  rt = "rt",
  rb = "rb",
  lb = "lb",
  // l curve control points
  clp1 = "clp1",
  clcp1 = "clcp1",
  clcp2 = "clcp2",
  clp2 = "clp2",
  // t curve control points
  ctp1 = "ctp1",
  ctcp1 = "ctcp1",
  ctcp2 = "ctcp2",
  ctp2 = "ctp2",
}

export default class Process {
  private anchor = {
    size: {
      fill: 4,
      stroke: 2,
    },
  };
  private curveTrigger: {
    d: number;
    size: {
      fill: number;
      stroke: number;
    };
    cpline: Line;
    curve: Line;
  } = {
    d: 100, // 30
    size: {
      fill: 4,
      stroke: 2,
    },
    cpline: {
      w: 1,
      c: "#c00",
    },
    curve: {
      w: 6,
      c: "#333",
    },
  };
  private strokeSize = 2;
  private initPressing = {
    activate: false,
    target: null,
  };
  w: number;
  h: number;
  p: Vec;
  private p1: Vec;
  private p2: Vec;
  c: string;
  selecting: boolean;
  pressing: {
    activate: boolean;
    target: PressingTarget | null;
  };
  center: {
    m: {
      x: number | null;
      y: number | null;
    };
    lt: {
      x: number | null;
      y: number | null;
    };
    rt: {
      x: number | null;
      y: number | null;
    };
    rb: {
      x: number | null;
      y: number | null;
    };
    lb: {
      x: number | null;
      y: number | null;
    };
  } = {
    m: {
      x: null,
      y: null,
    },
    lt: {
      x: null,
      y: null,
    },
    rt: {
      x: null,
      y: null,
    },
    rb: {
      x: null,
      y: null,
    },
    lb: {
      x: null,
      y: null,
    },
  };
  dragP:
    | Vec
    | {
        x: null;
        y: null;
      };
  curves: {
    l: null | Curve;
    t: null | Curve;
    r: null | Curve;
    b: null | Curve;
  };

  constructor(w: number, h: number, p: Vec, c: string) {
    this.w = w;
    this.h = h;
    this.p = p;
    this.p1 = { x: this.p.x - this.w / 2, y: this.p.y - this.h / 2 };
    this.p2 = { x: this.p.x + this.w / 2, y: this.p.y + this.h / 2 };
    this.c = c;
    this.selecting = false;
    this.pressing = this.initPressing;
    this.dragP = {
      x: null,
      y: null,
    };
    this.curves = {
      l: null,
      t: null,
      r: null,
      b: null,
    };
  }

  private getEdge = () => {
    return {
      l: this.p.x - this.w / 2,
      t: this.p.y - this.h / 2,
      r: this.p.x + this.w / 2,
      b: this.p.y + this.h / 2,
    };
  };

  private getCenter = () => {
    const edge = this.getEdge();
    const pivot = {
      x: this.p.x,
      y: this.p.y,
    };

    return {
      m: pivot,
      lt: {
        x: edge.l,
        y: edge.t,
      },
      rt: {
        x: edge.r,
        y: edge.t,
      },
      rb: {
        x: edge.r,
        y: edge.b,
      },
      lb: {
        x: edge.l,
        y: edge.b,
      },
      curveTrigger: {
        l: {
          x: edge.l - this.curveTrigger.d,
          y: pivot.y,
        },
        t: {
          x: pivot.x,
          y: edge.t - this.curveTrigger.d,
        },
      },
    };
  };

  checkBoundry($canvas: HTMLCanvasElement, p: Vec) {
    if (!$canvas) return false;

    const edge = this.getEdge();

    return (
      p.x > edge.l - this.anchor.size.fill &&
      p.y > edge.t - this.anchor.size.fill &&
      p.x < edge.r + this.anchor.size.fill &&
      p.y < edge.b + this.anchor.size.fill
    );
  }

  onMouseDown($canvas: HTMLCanvasElement, p: Vec) {
    let pressingCurve = {
      l: this.curves.l?.checkBoundry($canvas, {
        x: p.x - this.p.x,
        y: p.y - this.p.y,
      }),
      t: this.curves.t?.checkBoundry($canvas, {
        x: p.x - this.p.x,
        y: p.y - this.p.y,
      }),
    };

    if (
      this.checkBoundry($canvas, p) ||
      pressingCurve.l?.activate ||
      pressingCurve.t?.activate
    ) {
      this.selecting = true;
    }

    const edge = this.getEdge(),
      center = this.getCenter();

    if (this.selecting) {
      if (
        // lt anchors
        (p.x - center.lt.x) * (p.x - center.lt.x) +
          (p.y - center.lt.y) * (p.y - center.lt.y) <
        this.anchor.size.fill * this.anchor.size.fill
      ) {
        this.pressing = {
          activate: true,
          target: PressingTarget.lt,
        };
      } else if (
        // rt anchors
        (p.x - center.rt.x) * (p.x - center.rt.x) +
          (p.y - center.rt.y) * (p.y - center.rt.y) <
        this.anchor.size.fill * this.anchor.size.fill
      ) {
        this.pressing = {
          activate: true,
          target: PressingTarget.rt,
        };
      } else if (
        // rb anchors
        (p.x - center.rb.x) * (p.x - center.rb.x) +
          (p.y - center.rb.y) * (p.y - center.rb.y) <
        this.anchor.size.fill * this.anchor.size.fill
      ) {
        this.pressing = {
          activate: true,
          target: PressingTarget.rb,
        };
      } else if (
        // lb anchors
        (p.x - center.lb.x) * (p.x - center.lb.x) +
          (p.y - center.lb.y) * (p.y - center.lb.y) <
        this.anchor.size.fill * this.anchor.size.fill
      ) {
        this.pressing = {
          activate: true,
          target: PressingTarget.lb,
        };
      } else if (
        // l curve trigger
        (p.x - center.curveTrigger.l.x) * (p.x - center.curveTrigger.l.x) +
          (p.y - center.curveTrigger.l.y) * (p.y - center.curveTrigger.l.y) <
        this.curveTrigger.size.fill * this.curveTrigger.size.fill
      ) {
        this.curves.l = new Curve(
          this.curveTrigger.cpline,
          this.curveTrigger.curve
        );
        this.pressing = {
          activate: true,
          target: PressingTarget.clp2,
        };

        // init offset this.curveTrigger.d
        this.curves.l.init(
          {
            x: -this.w / 2,
            y: 0,
          },
          {
            x: -this.w / 2 + (-this.curveTrigger.d * 1) / 3,
            y: 0,
          },
          {
            x: -this.w / 2 + (-this.curveTrigger.d * 2) / 3,
            y: 0,
          },
          { x: -this.w / 2 - this.curveTrigger.d, y: 0 }
        );
      } else if (
        // t curve trigger
        (p.x - center.curveTrigger.t.x) * (p.x - center.curveTrigger.t.x) +
          (p.y - center.curveTrigger.t.y) * (p.y - center.curveTrigger.t.y) <
        this.curveTrigger.size.fill * this.curveTrigger.size.fill
      ) {
        this.curves.t = new Curve(
          this.curveTrigger.cpline,
          this.curveTrigger.curve
        );
        this.pressing = {
          activate: true,
          target: PressingTarget.ctp2,
        };

        // init offset this.curveTrigger.d
        this.curves.t.init(
          {
            x: 0,
            y: -this.h / 2,
          },
          {
            x: 0,
            y: -this.h / 2 + (-this.curveTrigger.d * 1) / 3,
          },
          {
            x: 0,
            y: -this.h / 2 + (-this.curveTrigger.d * 2) / 3,
          },
          { x: 0, y: -this.h / 2 - this.curveTrigger.d }
        );
      } else if (p.x > edge.l && p.y > edge.t && p.x < edge.r && p.y < edge.b) {
        // inside the shape
        this.pressing = {
          activate: true,
          target: PressingTarget.m,
        };
      } else if (pressingCurve.l?.p === CurvePressingP.cp1) {
        // l curve cp1
        this.pressing = {
          activate: true,
          target: PressingTarget.clcp1,
        };
      } else if (pressingCurve.l?.p === CurvePressingP.cp2) {
        // l curve cp2
        this.pressing = {
          activate: true,
          target: PressingTarget.clcp2,
        };
      } else if (pressingCurve.l?.p === CurvePressingP.p2) {
        // l curve p2
        this.pressing = {
          activate: true,
          target: PressingTarget.clp2,
        };
      } else if (pressingCurve.t?.p === CurvePressingP.cp1) {
        // t curve cp1
        this.pressing = {
          activate: true,
          target: PressingTarget.ctcp1,
        };
      } else if (pressingCurve.t?.p === CurvePressingP.cp2) {
        // t curve cp2
        this.pressing = {
          activate: true,
          target: PressingTarget.ctcp2,
        };
      } else if (pressingCurve.t?.p === CurvePressingP.p2) {
        // t curve p2
        this.pressing = {
          activate: true,
          target: PressingTarget.ctp2,
        };
      } else {
        this.selecting = false;
        this.pressing = this.initPressing;
        return;
      }

      this.dragP = p;
    }
  }

  onMouseMove(ctx: CanvasRenderingContext2D, p: Vec) {
    if (this.selecting && this.pressing.activate) {
      if (!this.dragP.x || !this.dragP.y) return;
      let xOffset = p.x - this.dragP.x,
        yOffset = p.y - this.dragP.y;

      this.dragP.x = p.x;
      this.dragP.y = p.y;

      const recalculate = () => {
        this.p = {
          x: (this.p1.x + this.p2.x) / 2,
          y: (this.p1.y + this.p2.y) / 2,
        };
        this.w = Math.abs(this.p1.x - this.p2.x);
        this.h = Math.abs(this.p1.y - this.p2.y);
      };

      if (this.pressing.target === PressingTarget.m) {
        this.p.x += xOffset;
        this.p.y += yOffset;
        this.p1 = { x: this.p.x - this.w / 2, y: this.p.y - this.h / 2 };
        this.p2 = { x: this.p.x + this.w / 2, y: this.p.y + this.h / 2 };
      } else if (this.pressing.target === PressingTarget.lt) {
        this.p1.x += xOffset;
        this.p1.y += yOffset;
        recalculate();
        const leftCurve = this.curves.l;
        if (
          leftCurve?.p1 &&
          leftCurve?.cp1 &&
          leftCurve?.cp2 &&
          leftCurve?.p2
        ) {
          leftCurve.p1.x += xOffset / 2;
          leftCurve.cp1.x += xOffset / 2;
          leftCurve.cp2.x += xOffset / 2;
          leftCurve.p2.x += xOffset / 2;
        }
      } else if (this.pressing.target === PressingTarget.rt) {
        this.p2.x += xOffset;
        this.p1.y += yOffset;
        recalculate();
        const leftCurve = this.curves.l;
        if (
          leftCurve?.p1 &&
          leftCurve?.cp1 &&
          leftCurve?.cp2 &&
          leftCurve?.p2
        ) {
          leftCurve.p1.x -= xOffset / 2;
          leftCurve.cp1.x -= xOffset / 2;
          leftCurve.cp2.x -= xOffset / 2;
          leftCurve.p2.x -= xOffset / 2;
        }
      } else if (this.pressing.target === PressingTarget.rb) {
        this.p2.x += xOffset;
        this.p2.y += yOffset;
        const leftCurve = this.curves.l;
        recalculate();
        if (
          leftCurve?.p1 &&
          leftCurve?.cp1 &&
          leftCurve?.cp2 &&
          leftCurve?.p2
        ) {
          leftCurve.p1.x -= xOffset / 2;
          leftCurve.cp1.x -= xOffset / 2;
          leftCurve.cp2.x -= xOffset / 2;
          leftCurve.p2.x -= xOffset / 2;
        }
      } else if (this.pressing.target === PressingTarget.lb) {
        this.p1.x += xOffset;
        this.p2.y += yOffset;
        recalculate();
        const leftCurve = this.curves.l;
        if (
          leftCurve?.p1 &&
          leftCurve?.cp1 &&
          leftCurve?.cp2 &&
          leftCurve?.p2
        ) {
          leftCurve.p1.x += xOffset / 2;
          leftCurve.cp1.x += xOffset / 2;
          leftCurve.cp2.x += xOffset / 2;
          leftCurve.p2.x += xOffset / 2;
        }
      } else if (
        // l curve
        (this.pressing.target === PressingTarget.clcp1 ||
          this.pressing.target === PressingTarget.clcp2 ||
          this.pressing.target === PressingTarget.clp2) &&
        this.curves.l
      ) {
        this.curves.l?.onMouseMove({ x: p.x - this.p.x, y: p.y - this.p.y });
      } else if (
        // t curve
        (this.pressing.target === PressingTarget.ctcp1 ||
          this.pressing.target === PressingTarget.ctcp2 ||
          this.pressing.target === PressingTarget.ctp2) &&
        this.curves.t
      ) {
        this.curves.t?.onMouseMove({ x: p.x - this.p.x, y: p.y - this.p.y });
      }
    }
  }

  onMouseUp() {
    if (this.pressing.activate) {
      this.pressing = this.initPressing;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.p.x, this.p.y);
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(
      this.p1.x - this.p.x,
      this.p1.y - this.p.y,
      this.p2.x - this.p1.x,
      this.p2.y - this.p1.y
    );
    ctx.closePath();

    if (this.selecting) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "DeepSkyBlue";
      ctx.lineWidth = this.strokeSize;

      // draw frame
      ctx.beginPath();
      ctx.strokeRect(
        this.p1.x - this.p.x,
        this.p1.y - this.p.y,
        this.p2.x - this.p1.x,
        this.p2.y - this.p1.y
      );
      ctx.closePath();

      // draw anchors
      ctx.lineWidth = this.anchor.size.stroke;

      ctx.beginPath();
      ctx.arc(
        this.p1.x - this.p.x,
        this.p1.y - this.p.y,
        this.anchor.size.fill,
        0,
        2 * Math.PI,
        false
      ); // left, top
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(
        this.p2.x - this.p.x,
        this.p1.y - this.p.y,
        this.anchor.size.fill,
        0,
        2 * Math.PI,
        false
      ); // right, top
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(
        this.p1.x - this.p.x,
        this.p2.y - this.p.y,
        this.anchor.size.fill,
        0,
        2 * Math.PI,
        false
      ); // left, bottom
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(
        this.p2.x - this.p.x,
        this.p2.y - this.p.y,
        this.anchor.size.fill,
        0,
        2 * Math.PI,
        false
      ); // right, bottom
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      // draw curve triggers
      ctx.lineWidth = this.curveTrigger.size.stroke;

      if (!this.curves.l) {
        // left
        ctx.beginPath();
        ctx.arc(
          -this.w / 2 - this.curveTrigger.d,
          0,
          this.anchor.size.fill,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }

      ctx.beginPath();
      ctx.arc(
        0,
        -this.h / 2 - this.curveTrigger.d,
        this.anchor.size.fill,
        0,
        2 * Math.PI,
        false
      ); // top
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(
        this.w / 2 + this.curveTrigger.d,
        0,
        this.anchor.size.fill,
        0,
        2 * Math.PI,
        false
      ); // right
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(
        0,
        this.h / 2 + this.curveTrigger.d,
        this.curveTrigger.size.fill,
        0,
        2 * Math.PI,
        false
      ); // bottom
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    //  draw curves
    if (this.curves.l) {
      this.curves.l.draw(ctx);
    }
    if (this.curves.t) {
      this.curves.t.draw(ctx);
    }
    // if (this.curves.t) {
    //   this.curves.t.init({ x: 0, y: -this.h / 2 });
    //   this.curves.t.draw(ctx);
    // }

    ctx.restore();
  }
}
