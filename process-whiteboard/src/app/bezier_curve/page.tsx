"use client";
import { useRef, useEffect, useCallback } from "react";

let ctx: CanvasRenderingContext2D | null | undefined = null;

type Vec = { x: number; y: number };
type Line = {
  w: number;
  c: string;
};
enum PressingP {
  p1 = "p1",
  cp1 = "cp1",
  p2 = "p2",
  cp2 = "cp2",
}
enum ShapeType {
  curve = "curve",
}

const initPressingShape = {
  type: null,
  index: -1,
};

let pressingShape: {
  type: ShapeType | null;
  index: number;
} = initPressingShape;

class Curve {
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
  initOffset: number;
  pressing: {
    activate: boolean;
    p: PressingP | null;
  };
  created: boolean;

  constructor(cpline: Line, curve: Line, initOffset: number) {
    this.cpline = cpline;
    this.curve = curve;
    this.radius = 10;
    this.p1 = null;
    this.p2 = null;
    this.cp1 = null;
    this.cp2 = null;
    this.initOffset = initOffset;
    this.pressing = this.initPressing;
    this.created = false;
  }

  checkBoundry($canvas: HTMLCanvasElement, p: Vec) {
    if (!$canvas || !this.p1 || !this.p2 || !this.cp1 || !this.cp2) {
      this.pressing = this.initPressing;
      return false;
    }

    let dx, dy;

    dx = this.p2.x - p.x;
    dy = this.p2.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.p2,
      };
      return true;
    }

    dx = this.cp2.x - p.x;
    dy = this.cp2.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.cp2,
      };
      return true;
    }

    dx = this.cp1.x - p.x;
    dy = this.cp1.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.cp1,
      };
      return true;
    }

    dx = this.p1.x - p.x;
    dy = this.p1.y - p.y;

    if (dx * dx + dy * dy < this.radius * this.radius) {
      this.pressing = {
        activate: true,
        p: PressingP.p1,
      };
      return true;
    }

    this.pressing = this.initPressing;
    return false;
  }

  init(initP: Vec) {
    if (!this.created) {
      this.p1 = { x: initP.x - this.initOffset, y: initP.y };
      this.p2 = initP;
      this.cp1 = {
        x: this.p1.x + this.initOffset / 3,
        y: this.p1.y,
      };
      this.cp2 = {
        x: this.p2.x - this.initOffset / 3,
        y: this.p2.y,
      };
      this.pressing = {
        activate: true,
        p: PressingP.p2,
      };
    }
  }

  onMouseDown($canvas: HTMLCanvasElement) {
    if (this.pressing.activate) {
      $canvas.style.cursor = "move";
    }
  }

  onMouseMove(p: Vec) {
    if (this.pressing.activate) {
      if (this.pressing.p === PressingP.p1 && this.p1?.x && this.p1?.y) {
        this.p1 = {
          x: p.x,
          y: p.y,
        };
      } else if (
        this.pressing.p === PressingP.cp1 &&
        this.cp1?.x &&
        this.cp1?.y
      ) {
        this.cp1 = {
          x: p.x,
          y: p.y,
        };
      } else if (this.pressing.p === PressingP.p2 && this.p2?.x && this.p2?.y) {
        this.p2 = {
          x: p.x,
          y: p.y,
        };
      } else if (
        this.pressing.p === PressingP.cp2 &&
        this.cp2?.x &&
        this.cp2?.y
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
    ctx.fillText(
      `(this.p1.x:${this.p1.x}, this.p1.y:${this.p1.y})`,
      this.p1.x + 14,
      this.p1.y
    );
    ctx.lineTo(this.cp1.x, this.cp1.y);
    ctx.fillText(
      `(this.cp1.x:${this.cp1.x}, this.cp1.y:${this.cp1.y})`,
      this.cp1.x + 14,
      this.cp1.y
    );

    if (this.cp2) {
      ctx.moveTo(this.p2.x, this.p2.y);
      ctx.fillText(
        `(this.p2.x:${this.p2.x}, this.p2.y:${this.p2.y})`,
        this.p2.x + 14,
        this.p2.y
      );
      ctx.lineTo(this.cp2.x, this.cp2.y);
      ctx.fillText(
        `(this.cp2.x:${this.cp2.x}, this.cp2.y:${this.cp2.y})`,
        this.cp2.x + 14,
        this.cp2.y
      );
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

let shapes: any[] = [];

export default function BezierCurve() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    let $canvas = document.querySelector("canvas");
    if (!ctx || !$canvas) return;
    let cpline = {
        w: 1,
        c: "#c00",
      },
      curve = {
        w: 6,
        c: "#333",
      },
      pressingP = {
        x: e.nativeEvent.x,
        y: e.nativeEvent.y,
      };

    shapes.forEach((shape, shapeI) => {
      if (shape.checkBoundry($canvas, pressingP)) {
        pressingShape = {
          type: ShapeType.curve,
          index: shapeI,
        };
      }
    });

    if (pressingShape.index > -1) {
      shapes[pressingShape.index].onMouseDown($canvas);
      return;
    }

    // if(type === 'curve'){ // TODO: 待之後有不同工具時做判斷
    let newCurve = new Curve(cpline, curve, 300);
    shapes.push(newCurve);
    newCurve.init(pressingP);
    // }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    shapes.forEach((shape) => {
      if (shape instanceof Curve) {
        shape.onMouseMove({
          x: e.nativeEvent.x,
          y: e.nativeEvent.y,
        });
      }
    });
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    let $canvas = document.querySelector("canvas");
    if (!$canvas) return;

    shapes.forEach((shape) => {
      if (!$canvas) return;
      if (shape instanceof Curve) {
        shape.onMouseUp($canvas);
      }
    });
    pressingShape = initPressingShape;
  }, []);

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    shapes.forEach((shape) => {
      if (!ctx) return;
      if (shape instanceof Curve) {
        shape.draw(ctx);
      }
    });
    window.requestAnimationFrame(draw);
  };

  useEffect(() => {
    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      window.requestAnimationFrame(draw);
    }
  }, []);

  return (
    <canvas
      ref={(el) => {
        $canvas = el;
        ctx = $canvas?.getContext("2d");
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
}
