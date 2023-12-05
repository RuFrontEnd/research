"use client";
import { useState, useRef, useEffect, useCallback, EventHandler } from "react";
import Image from "next/image";
import { Vec } from '@/types/vec'

let lineOffset = 4, // increase operation area
  anchrSize = 2;

type Box = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineWidth: number;
  color: string;
  editing: boolean
};

enum PressingTarget {
  m = "m",
  lt = "lt",
  rt = "rt",
  rb = "rb",
  lb = "lb"
}

let ctx: CanvasRenderingContext2D | null | undefined = null,
  editingShapeIndex = -1

export default class Process {
  private anchor = {
    size: {
      fill: 4,
      stroke: 2
    }
  };
  private strokeSize = 2
  private initPressing = {
    activate: false,
    target: null,
  }
  w: number;
  h: number
  p: Vec;
  private p1: Vec;
  private p2: Vec;
  c: string
  selecting: boolean;
  pressing: {
    activate: boolean,
    target: PressingTarget | null,
  };
  center: {
    m: {
      x: number | null,
      y: number | null
    },
    lt: {
      x: number | null,
      y: number | null
    },
    rt: {
      x: number | null,
      y: number | null
    },
    rb: {
      x: number | null,
      y: number | null
    },
    lb: {
      x: number | null,
      y: number | null
    }
  } = {
      m: {
        x: null,
        y: null
      },
      lt: {
        x: null,
        y: null
      },
      rt: {
        x: null,
        y: null
      },
      rb: {
        x: null,
        y: null
      },
      lb: {
        x: null,
        y: null
      }
    };
  dragP: Vec | {
    x: null,
    y: null
  }

  constructor(w: number, h: number, p: Vec, c: string) {
    this.w = w
    this.h = h
    this.p = p
    this.p1 = { x: this.p.x - this.w / 2, y: this.p.y - this.h / 2 }
    this.p2 = { x: this.p.x + this.w / 2, y: this.p.y + this.h / 2 }
    this.c = c
    this.selecting = false
    this.pressing = this.initPressing
    this.dragP = {
      x: null,
      y: null
    }
  }

  checkBoundry($canvas: HTMLCanvasElement, p: Vec) {
    if (!$canvas) return false

    const edge = {
      l: this.p.x - this.w / 2,
      t: this.p.y - this.h / 2,
      r: this.p.x + this.w / 2,
      b: this.p.y + this.w / 2
    }

    return p.x > edge.l - this.anchor.size.fill &&
      p.y > edge.t - this.anchor.size.fill &&
      p.x < edge.r + this.anchor.size.fill &&
      p.y < edge.b + this.anchor.size.fill
  }

  onMouseDown($canvas: HTMLCanvasElement, p: Vec) {
    if (this.checkBoundry($canvas, p)) {
      this.selecting = true
    } else {
      this.selecting = false
      this.pressing = this.initPressing
    }

    const edge = {
      l: this.p.x - this.w / 2,
      t: this.p.y - this.h / 2,
      r: this.p.x + this.w / 2,
      b: this.p.y + this.w / 2
    },
      center = {
        m: {
          x: this.p.x,
          y: this.p.y
        },
        lt: {
          x: edge.l,
          y: edge.t
        },
        rt: {
          x: edge.r,
          y: edge.t
        },
        rb: {
          x: edge.r,
          y: edge.b
        },
        lb: {
          x: edge.l,
          y: edge.b
        }
      }


    if (this.selecting) {
      if (p.x > edge.l && p.y > edge.t && p.x < edge.r && p.y < edge.b) {
        this.pressing = {
          activate: true,
          target: PressingTarget.m
        }
      }
      if ((p.x - center.lt.x) * (p.x - center.lt.x) + (p.y - center.lt.y) * (p.y - center.lt.y) < this.anchor.size.fill * this.anchor.size.fill) {
        this.pressing = {
          activate: true,
          target: PressingTarget.lt
        }
      }
      if ((p.x - center.rt.x) * (p.x - center.rt.x) + (p.y - center.rt.y) * (p.y - center.rt.y) < this.anchor.size.fill * this.anchor.size.fill) {
        this.pressing = {
          activate: true,
          target: PressingTarget.rt
        }
      }
      if ((p.x - center.rb.x) * (p.x - center.rb.x) + (p.y - center.rb.y) * (p.y - center.rb.y) < this.anchor.size.fill * this.anchor.size.fill) {
        this.pressing = {
          activate: true,
          target: PressingTarget.rb
        }
      }
      if ((p.x - center.lb.x) * (p.x - center.lb.x) + (p.y - center.lb.y) * (p.y - center.lb.y) < this.anchor.size.fill * this.anchor.size.fill) {
        this.pressing = {
          activate: true,
          target: PressingTarget.lb
        }
      }
      this.dragP = p
    }
  }

  onMouseMove(p: Vec) {
    if (this.selecting && this.pressing.activate) {
      if (!this.dragP.x || !this.dragP.y) return
      let xOffset = p.x - this.dragP.x,
        yOffset = p.y - this.dragP.y;

      this.dragP.x = p.x
      this.dragP.y = p.y

      if (this.pressing.target === PressingTarget.m) {
        this.p.x += xOffset
        this.p.y += yOffset
        this.p1 = { x: this.p.x - this.w / 2, y: this.p.y - this.h / 2 }
        this.p2 = { x: this.p.x + this.w / 2, y: this.p.y + this.h / 2 }
      } else if (this.pressing.target === PressingTarget.lt) {
        this.p1.x += xOffset
        this.p1.y += yOffset
        this.p = { x: (this.p1.x + this.p2.x) / 2, y: (this.p1.y + this.p2.y) / 2 }
        this.w = Math.abs(this.p1.x - this.p2.x)
        this.h = Math.abs(this.p1.y - this.p2.y)
      }
    }
  }

  onMouseUp() {

    if (this.pressing.activate) {
      this.pressing = this.initPressing
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.p.x, this.p.y)
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.p1.x - this.p.x,
      this.p1.y - this.p.y,
      this.p2.x - this.p1.x,
      this.p2.y - this.p1.y);
    ctx.closePath();

    if (this.selecting) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "DeepSkyBlue";
      ctx.lineWidth = this.strokeSize;

      // draw frame
      ctx.beginPath();
      ctx.strokeRect(this.p1.x - this.p.x,
        this.p1.y - this.p.y,
        this.p2.x - this.p1.x,
        this.p2.y - this.p1.y);
      ctx.closePath();


      ctx.lineWidth = this.anchor.size.stroke;

      // draw anchors
      ctx.beginPath();
      ctx.arc(this.p1.x - this.p.x, this.p1.y - this.p.y, this.anchor.size.fill, 0, 2 * Math.PI, false); // left, top
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(this.p2.x - this.p.x, this.p1.y - this.p.y, this.anchor.size.fill, 0, 2 * Math.PI, false); // right, top
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(this.p1.x - this.p.x, this.p2.y - this.p.y, this.anchor.size.fill, 0, 2 * Math.PI, false); // left, bottom
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(this.p2.x - this.p.x, this.p2.y - this.p.y, this.anchor.size.fill, 0, 2 * Math.PI, false); // right, bottom
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }

    ctx.restore()
  }
}

export function EditableBox() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null),
    { current: mousedown } = useRef(false),
    { current: clickedArea } = useRef({ box: -1, pos: "o" }),
    { current: tmpBox } = useRef<Box | null>(null);

  let x1 = -1;
  let y1 = -1;
  let x2 = -1;
  let y2 = -1;
  let boxes: Box[] = [];

  const getEditShapeIndex = useCallback((x: number, y: number) => {
    for (let i = boxes.length - 1; i >= 0; i--) {
      let box = boxes[i]

      if (x > box.x1 - lineOffset && x < box.x2 + lineOffset && y > box.y1 - lineOffset && y < box.y2 + lineOffset) {
        return i
      }
    }

    return -1
  }, [])

  const findCurrentArea = (x: number, y: number) => {
    // x, y means the coordinate of mouse clicked point

    for (let i = boxes.length - 1; i >= 0; i--) {
      let box = boxes[i];

      const xCenter = box.x1 + (box.x2 - box.x1) / 2,
        yCenter = box.y1 + (box.y2 - box.y1) / 2;

      if (box.x1 - lineOffset < x && x < box.x1 + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
          return { box: i, pos: "tl" };
        } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: "bl" };
        } else if (yCenter - lineOffset < y && y < yCenter + lineOffset) {
          return { box: i, pos: "l" };
        }
      } else if (box.x2 - lineOffset < x && x < box.x2 + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
          return { box: i, pos: "tr" };
        } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: "br" };
        } else if (yCenter - lineOffset < y && y < yCenter + lineOffset) {
          return { box: i, pos: "r" };
        }
      } else if (xCenter - lineOffset < x && x < xCenter + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
          return { box: i, pos: "t" };
        } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: "b" };
        } else if (box.y1 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: "i" };
        }
      } else if (box.x1 - lineOffset < x && x < box.x2 + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: "i" };
        }
      }
    }
    return { box: -1, pos: "o" };
  };

  const newBox = useCallback(
    (x1: number, y1: number, x2: number, y2: number) => {
      const _x1 = x1 < x2 ? x1 : x2,
        _y1 = y1 < y2 ? y1 : y2,
        _x2 = x1 > x2 ? x1 : x2,
        _y2 = y1 > y2 ? y1 : y2;

      // if (_x2 - _x1 > lineOffset * 2 && _y2 - _y1 > lineOffset * 2) {
      return {
        x1: _x1,
        y1: _y1,
        x2: _x2,
        y2: _y2,
        lineWidth: 1,
        // color: "DeepSkyBlue",
        color: "orange",
        editing: false
      };
      // } else {
      //   return null;
      // }
    },
    []
  );

  const drawBoxOn = useCallback((box: Box, ctx: CanvasRenderingContext2D) => {
    const xCenter = box.x1 + (box.x2 - box.x1) / 2,
      yCenter = box.y1 + (box.y2 - box.y1) / 2;

    ctx.beginPath();

    ctx.strokeStyle = box.color;
    ctx.fillStyle = box.color;
    ctx.lineWidth = box.lineWidth;

    ctx.rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
    ctx.fill();


    if (box.editing) {
      ctx.fillStyle = "DeepSkyBlue";
      ctx.strokeStyle = "DeepSkyBlue";
      ctx.stroke();
      // draw anchors
      ctx.fillRect(
        box.x1 - anchrSize,
        box.y1 - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      ); // x, y, width, height
      ctx.fillRect(
        box.x1 - anchrSize,
        yCenter - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
      ctx.fillRect(
        box.x1 - anchrSize,
        box.y2 - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
      ctx.fillRect(
        xCenter - anchrSize,
        box.y1 - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
      ctx.fillRect(
        xCenter - anchrSize,
        yCenter - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
      ctx.fillRect(
        xCenter - anchrSize,
        box.y2 - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
      ctx.fillRect(
        box.x2 - anchrSize,
        box.y1 - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
      ctx.fillRect(
        box.x2 - anchrSize,
        yCenter - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
      ctx.fillRect(
        box.x2 - anchrSize,
        box.y2 - anchrSize,
        2 * anchrSize,
        2 * anchrSize
      );
    }

    ctx.closePath();
  }, []);

  const redraw = useCallback(() => {
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < boxes.length; i++) {
      drawBoxOn(boxes[i], ctx);
    }
    if (clickedArea.box === -1) {
      tmpBox = newBox(x1, y1, x2, y2);
      if (tmpBox !== null) {
        drawBoxOn(tmpBox, ctx);
      }
    }
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    mousedown = true;
    x1 = e.nativeEvent.offsetX;
    y1 = e.nativeEvent.offsetY;
    x2 = e.nativeEvent.offsetX;
    y2 = e.nativeEvent.offsetY;
    clickedArea = findCurrentArea(x1, y1);

    const editShapeIndex = getEditShapeIndex(e.nativeEvent.x, e.nativeEvent.y)

    if (editShapeIndex !== -1 && editingShapeIndex === -1) {
      boxes[editShapeIndex].editing = true
      editingShapeIndex = editShapeIndex
    } else if (editShapeIndex !== -1 && editingShapeIndex !== -1) {
      boxes[editingShapeIndex].editing = false
      boxes[editShapeIndex].editing = true
      editingShapeIndex = editShapeIndex
    } else if (editingShapeIndex !== -1) {
      boxes[editingShapeIndex].editing = false
      editingShapeIndex = -1
    }

    redraw()
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mousedown && clickedArea.box === -1) { // clickedArea.box === -1 means not pressing on any boxes
      x2 = e.nativeEvent.offsetX;
      y2 = e.nativeEvent.offsetY;
      redraw();
    } else if (mousedown && clickedArea.box != -1) {
      x2 = e.nativeEvent.offsetX;
      y2 = e.nativeEvent.offsetY;

      let xOffset = x2 - x1,
        yOffset = y2 - y1;

      x1 = x2;
      y1 = y2;

      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'tl' ||
        clickedArea.pos === 'l' ||
        clickedArea.pos === 'bl') {
        boxes[clickedArea.box].x1 += xOffset;
      }
      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'tl' ||
        clickedArea.pos === 't' ||
        clickedArea.pos === 'tr') {
        boxes[clickedArea.box].y1 += yOffset;
      }
      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'tr' ||
        clickedArea.pos === 'r' ||
        clickedArea.pos === 'br') {
        boxes[clickedArea.box].x2 += xOffset;
      }
      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'bl' ||
        clickedArea.pos === 'b' ||
        clickedArea.pos === 'br') {
        boxes[clickedArea.box].y2 += yOffset;
      }

      redraw();
    }
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (clickedArea.box === -1 && tmpBox !== null) {
      boxes.push(tmpBox);
    }
    // else if (clickedArea.box != -1) {
    //   var selectedBox = boxes[clickedArea.box];
    //   if (selectedBox.x1 > selectedBox.x2) {
    //     var previousX1 = selectedBox.x1;
    //     selectedBox.x1 = selectedBox.x2;
    //     selectedBox.x2 = previousX1;
    //   }
    //   if (selectedBox.y1 > selectedBox.y2) {
    //     var previousY1 = selectedBox.y1;
    //     selectedBox.y1 = selectedBox.y2;
    //     selectedBox.y2 = previousY1;
    //   }
    // }
    tmpBox = null;
    mousedown = false;
  }, []);

  useEffect(() => {
    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
    }
  }, []);

  return (
    <canvas
      ref={(el) => {
        $canvas = el;
        ctx = $canvas?.getContext("2d");
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    />
  );
}