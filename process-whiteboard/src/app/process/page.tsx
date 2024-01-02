"use client";
import Process from "@/shapes/process";
import Curve from "@/shapes/curve";
import { useRef, useEffect, useCallback } from "react";
import { PressingTarget, ReceivingTarget } from "@/types/shapes/process";

let useEffected = false,
  ctx: CanvasRenderingContext2D | null | undefined = null,
  shapes: Process[] = [],
  concatenatingShape: null | ReceivingTarget = null;

export default function ProcessPage() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    let $canvas = document.querySelector("canvas");
    const p = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    shapes.forEach((shape, shapeI) => {
      if (!$canvas) return;
      if (shape instanceof Process) {
        let currentShape = shapes[shapeI] as Process;
        currentShape.onMouseDown($canvas, p);

        if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.clp2
        ) {
          if (!shape.curves.l) return;
          concatenatingShape = {
            shape: shape,
            curve: shape.curves.l,
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.ctp2
        ) {
          if (!shape.curves.t) return;
          concatenatingShape = {
            shape: shape,
            curve: shape.curves.t,
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.crp2
        ) {
          if (!shape.curves.r) return;
          concatenatingShape = {
            shape: shape,
            curve: shape.curves.r,
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.cbp2
        ) {
          if (!shape.curves.b) return;
          concatenatingShape = {
            shape: shape,
            curve: shape.curves.b,
          };
        }
      }
    });
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const p = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    shapes.forEach((shape) => {
      shape.onMouseMove(p, concatenatingShape ? true : false);
    });
  };

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const p = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    if (concatenatingShape) {
      shapes.forEach((shape) => {
        if (shape.id === concatenatingShape?.shape?.id) {
          shape.onMouseUp(p);
        } else {
          if (!concatenatingShape) return;
          shape.onMouseUp(p, concatenatingShape);
        }
      });
    } else {
      shapes.forEach((shape) => {
        shape.onMouseUp(p);
      });
    }

    concatenatingShape = null;
  }, []);

  const draw = useCallback(() => {
    ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    shapes.forEach((shape) => {
      if (!ctx) return;
      shape.draw(ctx);
    });
    requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (useEffected) return;

    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      if (!ctx) return;
      let process = new Process(
        "process1",
        200,
        100,
        { x: 300, y: 300 },
        "red"
      );
      let process_2 = new Process(
        "process2",
        200,
        100,
        { x: 1200, y: 300 },
        "blue"
      );

      shapes.push(process);
      shapes.push(process_2);

      requestAnimationFrame(draw);
    }

    useEffected = true;
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
