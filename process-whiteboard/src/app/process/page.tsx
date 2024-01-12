// TODO:  data 儲存資料
"use client";
import Process from "@/shapes/process";
import Data from "@/shapes/data";
import Desicion from "@/shapes/decision";
import { useState, useRef, useEffect, useCallback, ReactPortal } from "react";
import { PressingTarget, ConnectTarget } from "@/types/shapes/core";

let useEffected = false,
  ctx: CanvasRenderingContext2D | null | undefined = null,
  shapes: Process[] = [],
  sender: null | ConnectTarget = null;

export default function ProcessPage() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  const [portal, setPortal] = useState<ReactPortal | undefined>(undefined);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    let $canvas = document.querySelector("canvas");
    const p = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    shapes.forEach((shape, shapeI) => {
      if (!$canvas) return;

      if (shape instanceof Process || Data || Desicion) {
        let currentShape =
          (shapes[shapeI] as Process) ||
          (shapes[shapeI] as Data) ||
          (shapes[shapeI] as Desicion);
        currentShape.onMouseDown(p);

        if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.clp2
        ) {
          if (!shape.curves.l) return;
          sender = {
            shape: shape,
            direction: "l",
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.ctp2
        ) {
          if (!shape.curves.t) return;
          sender = {
            shape: shape,
            direction: "t",
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.crp2
        ) {
          if (!shape.curves.r) return;
          sender = {
            shape: shape,
            direction: "r",
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.cbp2
        ) {
          if (!shape.curves.b) return;
          sender = {
            shape: shape,
            direction: "b",
          };
        }
      }
    });
  }, []);

  const onDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      shapes.forEach((shape) => {
        if (!(shape instanceof Data)) return;
        const p = {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
        };

        setPortal(shape.onDoubleClick(p));
      });
    },
    []
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const p = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    shapes.forEach((shape) => {
      shape.onMouseMove(
        p,
        sender && sender.shape.id !== shape.id ? true : false
      );
    });
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const p = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    if (sender) {
      shapes.forEach((shape) => {
        if (shape.id === sender?.shape?.id) {
          shape.onMouseUp(p);
        } else {
          if (!sender) return;
          shape.onMouseUp(p, sender);
        }
      });
    } else {
      shapes.forEach((shape) => {
        shape.onMouseUp(p);
      });
    }

    sender = null;
  }, []);

  const draw = useCallback(() => {
    ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    shapes.forEach((shape) => {
      if (!ctx) return;
      shape.draw(ctx);
    });
    requestAnimationFrame(draw);
  }, []);

  const onClickProcess = () => {
    let process_new = new Process(
      `process_${shapes.length + 1}`,
      200,
      100,
      { x: 100, y: 100 },
      "yellow"
    );

    shapes.push(process_new);
  };

  useEffect(() => {
    if (useEffected) return;

    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      if (!ctx) return;
      let process = new Process(
          "process_1",
          200,
          100,
          { x: 300, y: 300 },
          "red"
        ),
        process_2 = new Process(
          "process_2",
          200,
          100,
          { x: 1200, y: 300 },
          "blue"
        ),
        data_1 = new Data("data_1", 200, 100, { x: 600, y: 600 }, "green"),
        desicion_1 = new Desicion(
          "desicion_1",
          150,
          100,
          { x: 300, y: 100 },
          "#3498db"
        );

      // shapes.push(process);
      // shapes.push(process_2);
      shapes.push(data_1);
      // shapes.push(desicion_1);

      requestAnimationFrame(draw);
    }

    useEffected = true;
  }, []);

  return (
    <>
      <div className="fixed m-4">
        <div
          className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 cursor-pointer"
          onClick={onClickProcess}
        >
          口
        </div>
      </div>
      <canvas
        ref={(el) => {
          $canvas = el;
          ctx = $canvas?.getContext("2d");
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onDoubleClick={onDoubleClick}
      />

      {portal && portal}
    </>
  );
}
