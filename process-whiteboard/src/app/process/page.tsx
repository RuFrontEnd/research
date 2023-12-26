"use client";
import Process from "@/shapes/process";
import Curve from "@/shapes/curve";
import { useRef, useEffect, useCallback } from "react";
import { PressingTarget } from "@/types/shapes/process";

let useEffected = false,
  ctx: CanvasRenderingContext2D | null | undefined = null,
  shapes: any[] = [],
  concatenatingShape: null | Process = null;

export default function ProcessPage() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    let $canvas = document.querySelector("canvas");

    shapes.forEach((shape, shapeI) => {
      if (!$canvas) return;
      if (shape instanceof Process) {
        let currentShape = shapes[shapeI] as Process;
        currentShape.onMouseDown($canvas, {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
        });

        if (
          currentShape.pressing.activate &&
          (currentShape.pressing.target === PressingTarget.clp2 ||
            currentShape.pressing.target === PressingTarget.ctp2 ||
            currentShape.pressing.target === PressingTarget.crp2 ||
            currentShape.pressing.target === PressingTarget.cbp2)
        ) {
          concatenatingShape = currentShape;
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
      shape.onMouseMove(
        ctx,
        p,
        shape.id === concatenatingShape?.id ? null : concatenatingShape
      );
    });
  };

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    shapes.forEach((shape) => {
      shape.onMouseUp();
    });
    concatenatingShape = null;
  }, []);

  const draw = useCallback(() => {
    ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    shapes.forEach((shape) => {
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
