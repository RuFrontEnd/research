// TODO: 修正 curve 碰到本身時會出現 receive points

"use client";
import Curve from "@/shapes/curve";
import { Vec } from "@/types/vec";
import { Line, PressingP as CurvePressingP } from "@/types/shapes/curve";
import {
  PressingTarget,
  ConnectTarget,
  Direction
} from "@/types/shapes/process";

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
  id: string;
  c: string;
  selecting: boolean;
  receiving: boolean;
  receiveFrom: {
    l: ConnectTarget
    t: ConnectTarget
    r: ConnectTarget
    b: ConnectTarget
  };
  sendTo: {
    l: ConnectTarget
    t: ConnectTarget
    r: ConnectTarget
    b: ConnectTarget
  };
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

  constructor(id: string, w: number, h: number, p: Vec, c: string) {
    this.id = id;
    this.w = w;
    this.h = h;
    this.p = p;
    this.p1 = { x: this.p.x - this.w / 2, y: this.p.y - this.h / 2 };
    this.p2 = { x: this.p.x + this.w / 2, y: this.p.y + this.h / 2 };
    this.c = c;
    this.selecting = false;
    this.pressing = this.initPressing;
    this.receiving = false;
    this.receiveFrom = {
      l: null,
      t: null,
      r: null,
      b: null
    }
    this.sendTo = {
      l: null,
      t: null,
      r: null,
      b: null
    }
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
        r: {
          x: edge.r + this.curveTrigger.d,
          y: pivot.y,
        },
        b: {
          x: pivot.x,
          y: edge.b + this.curveTrigger.d,
        },
      },
      receivingPoints: {
        l: {
          x: pivot.x - this.w / 2,
          y: pivot.y,
        },
        t: {
          x: pivot.x,
          y: pivot.y - this.h / 2,
        },
        r: {
          x: pivot.x + this.w / 2,
          y: pivot.y,
        },
        b: {
          x: pivot.x,
          y: pivot.y + this.h / 2,
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

  checkReceivingBoundry = (p: Vec) => {
    const edge = this.getEdge();

    const receivingBoundryOffset = 75;

    return (
      p.x > edge.l - receivingBoundryOffset &&
      p.y > edge.t - receivingBoundryOffset &&
      p.x < edge.r + receivingBoundryOffset &&
      p.y < edge.b + receivingBoundryOffset
    );
  };

  checkReceivingPointsBoundry = (p: Vec) => {
    const edge = this.getEdge();

    let dx, dy;

    dx = edge.l - p.x;
    dy = 0;

    if (dx * dx + dy * dy < this.anchor.size.fill * this.anchor.size.fill) {
      return {
        activate: true,
        direction: "l",
      };
    }

    dx = 0;
    dy = edge.t - p.y;

    if (dx * dx + dy * dy < this.anchor.size.fill * this.anchor.size.fill) {
      return {
        activate: true,
        direction: "t",
      };
    }

    dx = p.x - edge.r;
    dy = 0;

    if (dx * dx + dy * dy < this.anchor.size.fill * this.anchor.size.fill) {
      return {
        activate: true,
        direction: "r",
      };
    }

    dx = 0;
    dy = p.y - edge.b;

    if (dx * dx + dy * dy < this.anchor.size.fill * this.anchor.size.fill) {
      return {
        activate: true,
        direction: "b",
      };
    }

    return {
      activate: false,
      direction: null,
    };
  };

  resetConnection = (direction: Direction) => {
    const receiverShape = this.sendTo[direction]?.shape,
      receiverDirection = this.sendTo[direction]?.direction

    if (receiverShape && receiverDirection) {
      receiverShape.receiveFrom[receiverDirection] = null
      this.sendTo[direction] = null
    }
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
      r: this.curves.r?.checkBoundry($canvas, {
        x: p.x - this.p.x,
        y: p.y - this.p.y,
      }),
      b: this.curves.b?.checkBoundry($canvas, {
        x: p.x - this.p.x,
        y: p.y - this.p.y,
      }),
    };

    if (
      this.checkBoundry($canvas, p) ||
      pressingCurve.l?.activate ||
      pressingCurve.t?.activate ||
      pressingCurve.r?.activate ||
      pressingCurve.b?.activate
    ) {
      this.selecting = true;
    }

    const edge = this.getEdge(),
      center = this.getCenter();

    if (this.selecting && !this.receiving) {
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
      } else if (
        // r curve trigger
        (p.x - center.curveTrigger.r.x) * (p.x - center.curveTrigger.r.x) +
        (p.y - center.curveTrigger.r.y) * (p.y - center.curveTrigger.r.y) <
        this.curveTrigger.size.fill * this.curveTrigger.size.fill
      ) {
        this.curves.r = new Curve(
          this.curveTrigger.cpline,
          this.curveTrigger.curve
        );
        this.pressing = {
          activate: true,
          target: PressingTarget.crp2,
        };

        this.curves.r.init(
          {
            x: this.w / 2,
            y: 0,
          },
          {
            x: this.w / 2 + (this.curveTrigger.d * 1) / 3,
            y: 0,
          },
          {
            x: this.w / 2 + (this.curveTrigger.d * 2) / 3,
            y: 0,
          },
          { x: this.w / 2 + this.curveTrigger.d, y: 0 }
        );
      } else if (
        // b curve trigger
        (p.x - center.curveTrigger.b.x) * (p.x - center.curveTrigger.b.x) +
        (p.y - center.curveTrigger.b.y) * (p.y - center.curveTrigger.b.y) <
        this.curveTrigger.size.fill * this.curveTrigger.size.fill
      ) {
        this.curves.b = new Curve(
          this.curveTrigger.cpline,
          this.curveTrigger.curve
        );
        this.pressing = {
          activate: true,
          target: PressingTarget.cbp2,
        };

        this.curves.b.init(
          {
            x: 0,
            y: this.h / 2,
          },
          {
            x: 0,
            y: this.h / 2 + (this.curveTrigger.d * 1) / 3,
          },
          {
            x: 0,
            y: this.h / 2 + (this.curveTrigger.d * 2) / 3,
          },
          { x: 0, y: this.h / 2 + this.curveTrigger.d }
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

        this.resetConnection('l')
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

        this.resetConnection('t')
      } else if (pressingCurve.r?.p === CurvePressingP.cp1) {
        // r curve cp1
        this.pressing = {
          activate: true,
          target: PressingTarget.crcp1,
        };
      } else if (pressingCurve.r?.p === CurvePressingP.cp2) {
        // r curve cp2
        this.pressing = {
          activate: true,
          target: PressingTarget.crcp2,
        };

      } else if (pressingCurve.r?.p === CurvePressingP.p2) {
        // r curve p2
        this.pressing = {
          activate: true,
          target: PressingTarget.crp2,
        };

        this.resetConnection('r')
      } else if (pressingCurve.b?.p === CurvePressingP.cp1) {
        // b curve cp1
        this.pressing = {
          activate: true,
          target: PressingTarget.cbcp1,
        };
      } else if (pressingCurve.b?.p === CurvePressingP.cp2) {
        // b curve cp2
        this.pressing = {
          activate: true,
          target: PressingTarget.cbcp2,
        };
      } else if (pressingCurve.b?.p === CurvePressingP.p2) {
        // b curve p2
        this.pressing = {
          activate: true,
          target: PressingTarget.cbp2,
        };

        this.resetConnection('b')
      } else {
        this.selecting = false;
        this.pressing = this.initPressing;
        return;
      }

      this.dragP = p;
    }
  }

  onMouseMove(p: Vec, receiving?: boolean) {
    if (
      this.selecting &&
      this.pressing.activate &&
      this.dragP.x &&
      this.dragP.y &&
      !this.receiving
    ) {
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

        // sender curves follows
        const receiveFromCurve_l = this.receiveFrom.l?.shape.curves[this.receiveFrom.l.direction],
          receiveFromCurve_t = this.receiveFrom.t?.shape.curves[this.receiveFrom.t.direction],
          receiveFromCurve_r = this.receiveFrom.r?.shape.curves[this.receiveFrom.r.direction],
          receiveFromCurve_b = this.receiveFrom.b?.shape.curves[this.receiveFrom.b.direction]
        if (
          receiveFromCurve_l?.p2 && receiveFromCurve_l?.cp2
        ) {
          // left
          receiveFromCurve_l.p2.x += xOffset;
          receiveFromCurve_l.p2.y += yOffset;
          receiveFromCurve_l.cp2.x += xOffset;
          receiveFromCurve_l.cp2.y += yOffset;
        }
        if (
          receiveFromCurve_t?.p2 && receiveFromCurve_t?.cp2
        ) {
          // top
          receiveFromCurve_t.p2.x += xOffset;
          receiveFromCurve_t.p2.y += yOffset;
          receiveFromCurve_t.cp2.x += xOffset;
          receiveFromCurve_t.cp2.y += yOffset;
        }
        if (
          receiveFromCurve_r?.p2 && receiveFromCurve_r?.cp2
        ) {
          // right
          receiveFromCurve_r.p2.x += xOffset;
          receiveFromCurve_r.p2.y += yOffset;
          receiveFromCurve_r.cp2.x += xOffset;
          receiveFromCurve_r.cp2.y += yOffset;
        }
        if (
          receiveFromCurve_b?.p2 && receiveFromCurve_b?.cp2

        ) {
          // bottom
          receiveFromCurve_b.p2.x += xOffset;
          receiveFromCurve_b.p2.y += yOffset;
          receiveFromCurve_b.cp2.x += xOffset;
          receiveFromCurve_b.cp2.y += yOffset;
        }

        // reciever curves follows
        const sendToCurve_l = this.sendTo.l,
          sendToCurve_t = this.sendTo.t,
          sendToCurve_r = this.sendTo.r,
          sendToCurve_b = this.sendTo.b
        if (
          sendToCurve_l && this.curves.l?.p2 && this.curves.l?.cp2
        ) {
          this.curves.l.p2.x -= xOffset;
          this.curves.l.p2.y -= yOffset;
          this.curves.l.cp2.x -= xOffset;
          this.curves.l.cp2.y -= yOffset;
        }
        if (
          sendToCurve_t && this.curves.t?.p2 && this.curves.t?.cp2
        ) {
          this.curves.t.p2.x -= xOffset;
          this.curves.t.p2.y -= yOffset;
          this.curves.t.cp2.x -= xOffset;
          this.curves.t.cp2.y -= yOffset;
        }
        if (
          sendToCurve_r && this.curves.r?.p2 && this.curves.r?.cp2
        ) {
          this.curves.r.p2.x -= xOffset;
          this.curves.r.p2.y -= yOffset;
          this.curves.r.cp2.x -= xOffset;
          this.curves.r.cp2.y -= yOffset;
        }
        if (
          sendToCurve_b && this.curves.b?.p2 && this.curves.b?.cp2
        ) {
          this.curves.b.p2.x -= xOffset;
          this.curves.b.p2.y -= yOffset;
          this.curves.b.cp2.x -= xOffset;
          this.curves.b.cp2.y -= yOffset;
        }
      } else if (this.pressing.target === PressingTarget.lt) {
        this.p1.x += xOffset;
        this.p1.y += yOffset;
        recalculate();
        if (
          this.curves.l?.p1 &&
          this.curves.l?.cp1 &&
          this.curves.l?.cp2 &&
          this.curves.l?.p2
        ) {
          this.curves.l.p1.x += xOffset / 2;
          this.curves.l.cp1.x += xOffset / 2;
          this.curves.l.cp2.x += xOffset / 2;
          this.curves.l.p2.x += xOffset / 2;
        }
        if (
          this.curves.t?.p1 &&
          this.curves.t?.cp1 &&
          this.curves.t?.cp2 &&
          this.curves.t?.p2
        ) {
          this.curves.t.p1.y += yOffset / 2;
          this.curves.t.cp1.y += yOffset / 2;
          this.curves.t.cp2.y += yOffset / 2;
          this.curves.t.p2.y += yOffset / 2;
        }
        if (
          this.curves.r?.p1 &&
          this.curves.r?.cp1 &&
          this.curves.r?.cp2 &&
          this.curves.r?.p2
        ) {
          this.curves.r.p1.x -= xOffset / 2;
          this.curves.r.cp1.x -= xOffset / 2;
          this.curves.r.cp2.x -= xOffset / 2;
          this.curves.r.p2.x -= xOffset / 2;
        }
        if (
          this.curves.b?.p1 &&
          this.curves.b?.cp1 &&
          this.curves.b?.cp2 &&
          this.curves.b?.p2
        ) {
          this.curves.b.p1.y -= yOffset / 2;
          this.curves.b.cp1.y -= yOffset / 2;
          this.curves.b.cp2.y -= yOffset / 2;
          this.curves.b.p2.y -= yOffset / 2;
        }
      } else if (this.pressing.target === PressingTarget.rt) {
        this.p2.x += xOffset;
        this.p1.y += yOffset;
        recalculate();
        if (
          this.curves.l?.p1 &&
          this.curves.l?.cp1 &&
          this.curves.l?.cp2 &&
          this.curves.l?.p2
        ) {
          this.curves.l.p1.x -= xOffset / 2;
          this.curves.l.cp1.x -= xOffset / 2;
          this.curves.l.cp2.x -= xOffset / 2;
          this.curves.l.p2.x -= xOffset / 2;
        }
        if (
          this.curves.t?.p1 &&
          this.curves.t?.cp1 &&
          this.curves.t?.cp2 &&
          this.curves.t?.p2
        ) {
          this.curves.t.p1.y += yOffset / 2;
          this.curves.t.cp1.y += yOffset / 2;
          this.curves.t.cp2.y += yOffset / 2;
          this.curves.t.p2.y += yOffset / 2;
        }
        if (
          this.curves.r?.p1 &&
          this.curves.r?.cp1 &&
          this.curves.r?.cp2 &&
          this.curves.r?.p2
        ) {
          this.curves.r.p1.x += xOffset / 2;
          this.curves.r.cp1.x += xOffset / 2;
          this.curves.r.cp2.x += xOffset / 2;
          this.curves.r.p2.x += xOffset / 2;
        }
        if (
          this.curves.b?.p1 &&
          this.curves.b?.cp1 &&
          this.curves.b?.cp2 &&
          this.curves.b?.p2
        ) {
          this.curves.b.p1.y -= yOffset / 2;
          this.curves.b.cp1.y -= yOffset / 2;
          this.curves.b.cp2.y -= yOffset / 2;
          this.curves.b.p2.y -= yOffset / 2;
        }
      } else if (this.pressing.target === PressingTarget.rb) {
        this.p2.x += xOffset;
        this.p2.y += yOffset;
        recalculate();
        if (
          this.curves.l?.p1 &&
          this.curves.l?.cp1 &&
          this.curves.l?.cp2 &&
          this.curves.l?.p2
        ) {
          this.curves.l.p1.x -= xOffset / 2;
          this.curves.l.cp1.x -= xOffset / 2;
          this.curves.l.cp2.x -= xOffset / 2;
          this.curves.l.p2.x -= xOffset / 2;
        }
        if (
          this.curves.t?.p1 &&
          this.curves.t?.cp1 &&
          this.curves.t?.cp2 &&
          this.curves.t?.p2
        ) {
          this.curves.t.p1.y -= yOffset / 2;
          this.curves.t.cp1.y -= yOffset / 2;
          this.curves.t.cp2.y -= yOffset / 2;
          this.curves.t.p2.y -= yOffset / 2;
        }
        if (
          this.curves.r?.p1 &&
          this.curves.r?.cp1 &&
          this.curves.r?.cp2 &&
          this.curves.r?.p2
        ) {
          this.curves.r.p1.x += xOffset / 2;
          this.curves.r.cp1.x += xOffset / 2;
          this.curves.r.cp2.x += xOffset / 2;
          this.curves.r.p2.x += xOffset / 2;
        }
        if (
          this.curves.b?.p1 &&
          this.curves.b?.cp1 &&
          this.curves.b?.cp2 &&
          this.curves.b?.p2
        ) {
          this.curves.b.p1.y += yOffset / 2;
          this.curves.b.cp1.y += yOffset / 2;
          this.curves.b.cp2.y += yOffset / 2;
          this.curves.b.p2.y += yOffset / 2;
        }
      } else if (this.pressing.target === PressingTarget.lb) {
        this.p1.x += xOffset;
        this.p2.y += yOffset;
        recalculate();
        if (
          this.curves.l?.p1 &&
          this.curves.l?.cp1 &&
          this.curves.l?.cp2 &&
          this.curves.l?.p2
        ) {
          this.curves.l.p1.x += xOffset / 2;
          this.curves.l.cp1.x += xOffset / 2;
          this.curves.l.cp2.x += xOffset / 2;
          this.curves.l.p2.x += xOffset / 2;
        }
        if (
          this.curves.t?.p1 &&
          this.curves.t?.cp1 &&
          this.curves.t?.cp2 &&
          this.curves.t?.p2
        ) {
          this.curves.t.p1.y -= yOffset / 2;
          this.curves.t.cp1.y -= yOffset / 2;
          this.curves.t.cp2.y -= yOffset / 2;
          this.curves.t.p2.y -= yOffset / 2;
        }
        if (
          this.curves.r?.p1 &&
          this.curves.r?.cp1 &&
          this.curves.r?.cp2 &&
          this.curves.r?.p2
        ) {
          this.curves.r.p1.x -= xOffset / 2;
          this.curves.r.cp1.x -= xOffset / 2;
          this.curves.r.cp2.x -= xOffset / 2;
          this.curves.r.p2.x -= xOffset / 2;
        }
        if (
          this.curves.b?.p1 &&
          this.curves.b?.cp1 &&
          this.curves.b?.cp2 &&
          this.curves.b?.p2
        ) {
          this.curves.b.p1.y += yOffset / 2;
          this.curves.b.cp1.y += yOffset / 2;
          this.curves.b.cp2.y += yOffset / 2;
          this.curves.b.p2.y += yOffset / 2;
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
      } else if (
        // r curve
        (this.pressing.target === PressingTarget.crcp1 ||
          this.pressing.target === PressingTarget.crcp2 ||
          this.pressing.target === PressingTarget.crp2) &&
        this.curves.r
      ) {
        this.curves.r?.onMouseMove({ x: p.x - this.p.x, y: p.y - this.p.y });
      } else if (
        // b curve
        (this.pressing.target === PressingTarget.cbcp1 ||
          this.pressing.target === PressingTarget.cbcp2 ||
          this.pressing.target === PressingTarget.cbp2) &&
        this.curves.b
      ) {
        this.curves.b?.onMouseMove({ x: p.x - this.p.x, y: p.y - this.p.y });
      }
    }

    if (receiving) {
      this.receiving = this.checkReceivingBoundry(p);
    }
  }

  onMouseUp(p: Vec, sender?: ConnectTarget) {
    if (this.pressing.activate) {
      this.pressing = this.initPressing;
    }

    if (sender && this.receiving) {
      const pressingReceivingPoint = this.checkReceivingPointsBoundry(p),
        senderCurve = sender.shape.curves[sender.direction];

      if (pressingReceivingPoint.activate && senderCurve) {
        switch (pressingReceivingPoint.direction) {
          case "l":
            {
              // receiver
              this.receiveFrom.l = sender
              // sender
              sender.shape.sendTo[sender.direction] = {
                shape: this,
                direction: pressingReceivingPoint.direction // l
              }


              senderCurve.p2 = {
                x:
                  this.p1.x -
                  sender.shape.p.x,
                y:
                  this.p.y -
                  sender.shape.p.y,
              }

            }
            break;
          case "t": {
            // receiver
            this.receiveFrom.t = sender
            // sender
            sender.shape.sendTo[sender.direction] = {
              shape: this,
              direction: pressingReceivingPoint.direction  // t
            }


            senderCurve.p2 = {
              x:
                this.p.x -
                sender.shape.p.x,
              y:
                this.p1.y -
                sender.shape.p.y,
            }

          }
            break
          case "r":
            // receiver
            this.receiveFrom.r = sender
            // sender
            sender.shape.sendTo[sender.direction] = {
              shape: this,
              direction: pressingReceivingPoint.direction  // r
            }

            senderCurve.p2 = {
              x:
                this.p2.x -
                sender.shape.p.x,
              y:
                this.p.y -
                sender.shape.p.y,
            }

            break;
          case "b":
            // receiver
            this.receiveFrom.b = sender
            // sender
            sender.shape.sendTo[sender.direction] = {
              shape: this,
              direction: pressingReceivingPoint.direction  // b
            }

            senderCurve.p2 = {
              x:
                this.p.x -
                sender.shape.p.x,
              y:
                this.p2.y -
                sender.shape.p.y,
            }
            break;
        }
      }
      this.receiving = false;
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

    if (this.selecting && !this.receiving) {
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

      if (!this.curves.t) {
        // top
        ctx.beginPath();
        ctx.arc(
          0,
          -this.h / 2 - this.curveTrigger.d,
          this.anchor.size.fill,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }

      if (!this.curves.r) {
        // right
        ctx.beginPath();
        ctx.arc(
          this.w / 2 + this.curveTrigger.d,
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

      if (!this.curves.b) {
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
    }

    //  draw curves
    if (this.curves.l && !this.receiving) {
      this.curves.l.draw(ctx);
    }
    if (this.curves.t && !this.receiving) {
      this.curves.t.draw(ctx);
    }
    if (this.curves.r && !this.receiving) {
      this.curves.r.draw(ctx);
    }
    if (this.curves.b && !this.receiving) {
      this.curves.b.draw(ctx);
    }

    // draw receiving points
    ctx.fillStyle = "white";
    ctx.strokeStyle = "DeepSkyBlue";
    ctx.lineWidth = this.anchor.size.stroke;

    if (this.receiving) {
      // left
      ctx.beginPath();
      ctx.arc(-this.w / 2, 0, this.anchor.size.fill, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    if (this.receiving) {
      // top
      ctx.beginPath();
      ctx.arc(0, -this.h / 2, this.anchor.size.fill, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    if (this.receiving) {
      // right
      ctx.beginPath();
      ctx.arc(this.w / 2, 0, this.anchor.size.fill, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    if (this.receiving) {
      // bottom
      ctx.beginPath();
      ctx.arc(0, this.h / 2, this.anchor.size.fill, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    ctx.restore();
  }
}
