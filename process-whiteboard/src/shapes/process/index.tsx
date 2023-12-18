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
  m = "m",
  lt = "lt",
  rt = "rt",
  rb = "rb",
  lb = "lb",
  ctl = "ctl",
  ctt = "ctt",
  ctr = "ctr",
  ctb = "ctb",

  ctlp1 = "ctlp1",
  ctlcp1 = "ctlcp1",
  ctlcp2 = "ctlcp2",
  ctlp2 = "ctlp2",
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
    const pressingCurve = this.curves.l?.checkBoundry($canvas, {
      x: p.x - this.p.x,
      y: p.y - this.p.y,
    })

    if (this.checkBoundry($canvas, p) || pressingCurve) {
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
        this.pressing = {
          activate: true,
          target: PressingTarget.ctl,
        };
      } else if (
        // t curve trigger
        (p.x - center.curveTrigger.t.x) * (p.x - center.curveTrigger.t.x) +
          (p.y - center.curveTrigger.t.y) * (p.y - center.curveTrigger.t.y) <
        this.curveTrigger.size.fill * this.curveTrigger.size.fill
      ) {
        this.pressing = {
          activate: true,
          target: PressingTarget.ctt,
        };
      } else if (p.x > edge.l && p.y > edge.t && p.x < edge.r && p.y < edge.b) {
        // center
        this.pressing = {
          activate: true,
          target: PressingTarget.m,
        };
      } else if (pressingCurve?.p === CurvePressingP.p1) {
        this.pressing = {
          activate: true,
          target: PressingTarget.ctlp1,
        };
      } else if (pressingCurve?.p === CurvePressingP.cp1) {
        this.pressing = {
          activate: true,
          target: PressingTarget.ctlcp1,
        };
      } else if (pressingCurve?.p === CurvePressingP.cp2) {
        this.pressing = {
          activate: true,
          target: PressingTarget.ctlcp2,
        };
      } else if (pressingCurve?.p === CurvePressingP.p2) {
        this.pressing = {
          activate: true,
          target: PressingTarget.ctlp2,
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
      } else if (this.pressing.target === PressingTarget.rt) {
        this.p2.x += xOffset;
        this.p1.y += yOffset;
        recalculate();
      } else if (this.pressing.target === PressingTarget.rb) {
        this.p2.x += xOffset;
        this.p2.y += yOffset;
        recalculate();
      } else if (this.pressing.target === PressingTarget.lb) {
        this.p1.x += xOffset;
        this.p2.y += yOffset;
        recalculate();
      } else if (this.pressing.target === PressingTarget.ctl) {
      } else if (this.pressing.target === PressingTarget.ctlp2) {
        this.curves.l?.onMouseMove({ x: p.x - this.p.x, y: p.y - this.p.y });
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

      ctx.beginPath();
      ctx.arc(
        -this.w / 2 - this.curveTrigger.d,
        0,
        this.anchor.size.fill,
        0,
        2 * Math.PI,
        false
      ); // left
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

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

    if (this.pressing.target === PressingTarget.ctl) {
      this.curves.l = new Curve(
        this.curveTrigger.cpline,
        this.curveTrigger.curve,
        this.curveTrigger.d
      );
      this.curves.l.init(
        {
          x: 0,
          y: 0,
        },
        { x: -this.curveTrigger.d, y: 0 }
      );
    } else if (this.pressing.target === PressingTarget.ctt) {
      this.curves.t = new Curve(
        this.curveTrigger.cpline,
        this.curveTrigger.curve,
        this.curveTrigger.d
      );
    }

    //  draw curves
    if (this.curves.l) {
      this.curves.l.draw(ctx);
    }
    // if (this.curves.t) {
    //   this.curves.t.init({ x: 0, y: -this.h / 2 });
    //   this.curves.t.draw(ctx);
    // }

    ctx.restore();
  }
}
