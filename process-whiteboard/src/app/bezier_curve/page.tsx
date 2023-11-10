"use client";
import { useState, useRef, useEffect, useCallback, EventHandler } from "react";
import Image from "next/image";

let lineOffset = 4, // increase operation area
  anchrSize = 2;

type Box = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineWidth: number;
  color: string;
};

let ctx: CanvasRenderingContext2D | null | undefined = null;

export default function BezierCurve() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  const findCurrentArea = (x: number, y: number) => {};

  const newBox = useCallback(
    (x1: number, y1: number, x2: number, y2: number) => {},
    []
  );

  const drawBoxOn = useCallback((box: Box, ctx: CanvasRenderingContext2D) => {},
  []);

  const redraw = useCallback(() => {
    if (!ctx) return;


    // Cubic Bézier curve
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.quadraticCurveTo(110, 100, 200, 20);
    ctx.stroke();
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {},
    []
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {},
    []
  );

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {},
  []);

  useEffect(() => {
    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      redraw();
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
