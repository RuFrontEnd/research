"use client";
import Process from "@/shapes/process";
import Curve from "@/shapes/curve";
import { useRef, useEffect, useCallback } from "react";
import { PressingTarget, ConnectTarget } from "@/types/shapes/process";

let useEffected = false,
  ctx: CanvasRenderingContext2D | null | undefined = null,
  shapes: Process[] = [],
  sender: null | ConnectTarget = null;

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

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
  };

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
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
      );
      let process_2 = new Process(
        "process_2",
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
      />
      {/* TODO: 切版輸入框 => 待後續開啟 */}
      {/* <div className="w-[200px] bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 fixed top-0 left-0">
        <div className="relative mb-4">
          <label
            // for="full-name"
            className="leading-7 text-sm text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Confirm
        </button>
      </div> */}
    </>
  );
}
