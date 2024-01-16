// TODO: 處理 data shape SelectFrame 開關  / Process onMouseup 走訪 (l receive 完成 / t, r, b 待處裡) / Process 取用可用的 data / 尋找左側列 icons
"use client";
import Process from "@/shapes/process";
import Data from "@/shapes/data";
import Desicion from "@/shapes/decision";
import ImportFrame from "@/components/importFrame";
import SelectDataFrame from "@/components/selectDataFrame";
import useClickBody from "@/hooks/useClickBody/useClickBody";
import { useState, useRef, useEffect, useCallback, ReactPortal } from "react";
import { PressingTarget, ConnectTarget } from "@/types/shapes/core";
import { Vec, Direction, DataTable } from "@/types/shapes/common";

let useEffected = false,
  ctx: CanvasRenderingContext2D | null | undefined = null,
  shapes: (Process | Data | Desicion)[] = [],
  sender: null | ConnectTarget = null,
  dataTable: DataTable = {}; // total data

export default function ProcessPage() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  const [portal, setPortal] = useState<
      | {
          id: string;
          portal: ReactPortal;
        }
      | undefined
    >(undefined),
    [importFrame, setImportFrame] = useState<{ p: Vec } | undefined>(undefined),
    [selectFrame, setSelectFrame] = useState<{ p: Vec } | undefined>(undefined);

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
            direction: Direction.l,
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.ctp2
        ) {
          if (!shape.curves.t) return;
          sender = {
            shape: shape,
            direction: Direction.t,
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.crp2
        ) {
          if (!shape.curves.r) return;
          sender = {
            shape: shape,
            direction: Direction.r,
          };
        } else if (
          currentShape.pressing.activate &&
          currentShape.pressing.target === PressingTarget.cbp2
        ) {
          if (!shape.curves.b) return;
          sender = {
            shape: shape,
            direction: Direction.b,
          };
        }
      }
    });
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const p = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };

      shapes.forEach((shape) => {
        // const _portal =
        shape.onMouseMove(
          p,
          sender && sender.shape.id !== shape.id ? true : false
        );

        // if (!(shape instanceof Data) && !(shape instanceof Process)) return;
        // if (_portal && shape.isFrameOpen) {
        //   setPortal(_portal);
        // }
      });
    },
    [
      // portal
    ]
  );

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

  const onDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();

      const p = {
        x: e.nativeEvent.x,
        y: e.nativeEvent.y,
      };

      shapes.forEach((shape) => {
        if (shape.checkBoundry(p)) {
          setImportFrame({ p: shape.p });
        }
        // if (!(shape instanceof Data) && !(shape instanceof Process)) return;
        // shape.isFrameOpen = false;
        // const p = {
        //   x: e.nativeEvent.offsetX,
        //   y: e.nativeEvent.offsetY,
        // };
        // const _portal = shape.onDoubleClick(p);
        // if (_portal) {
        //   setPortal(_portal);
        // }
      });
    },
    []
  );

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
      "red",
      dataTable
    );

    shapes.push(process_new);
  };

  const onClickData = () => {
    let data_new = new Data(
      `data_${shapes.length + 1}`,
      200,
      100,
      { x: 100, y: 100 },
      "green",
      dataTable
    );

    shapes.push(data_new);
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
          "red",
          dataTable
        ),
        process_2 = new Process(
          "process_2",
          200,
          100,
          { x: 1200, y: 300 },
          "blue",
          dataTable
        ),
        data_1 = new Data(
          "data_1",
          200,
          100,
          { x: 600, y: 600 },
          "green",
          dataTable
        ),
        desicion_1 = new Desicion(
          "desicion_1",
          150,
          100,
          { x: 300, y: 100 },
          "#3498db",
          dataTable
        );

      shapes.push(process);
      shapes.push(process_2);
      shapes.push(data_1);
      shapes.push(desicion_1);

      requestAnimationFrame(draw);
    }

    useEffected = true;
  }, []);

  // useEffect(() => {
  //   const onClickBody = (e: MouseEvent) => {
  //     if (e.target === null) return;

  //     let currentElement = e.target as Element;

  //     let shape = shapes.find((shape) => shape.id === portal?.id),
  //       p = { x: e.offsetX, y: e.offsetY };

  //     while (currentElement) {
  //       if (currentElement?.id == portal?.id || shape?.checkBoundry(p)) return;
  //       if (currentElement.nodeName === "BODY") {
  //         if (!(shape instanceof Data) && !(shape instanceof Process)) return;

  //         shape.isFrameOpen = false;

  //         return setPortal(undefined);
  //       }
  //       currentElement = currentElement.parentNode as Element;
  //     }
  //   };

  //   document.body.addEventListener("click", onClickBody);

  //   return () => {
  //     document.body.addEventListener("click", onClickBody);
  //   };
  // }, [portal]);

  return (
    <>
      <div className="fixed m-4">
        <div className="flex flex-col">
          <div
            className="mb-2 w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 cursor-pointer"
            onClick={onClickProcess}
          >
            P
          </div>
          <div
            className="mb-2 w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 cursor-pointer"
            onClick={onClickData}
          >
            D
          </div>
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

      {/* {portal?.id && portal?.portal && portal.portal} */}
      {importFrame && (
        <ImportFrame
          id={"test"}
          key={"test"}
          coordinate={importFrame.p}
          onConfirm={() => {}}
          // init={{
          //   title: this.title,
          //   data: this.getInitData(),
          // }}
        />
      )}

      {selectFrame && (
        <SelectDataFrame
          id={"test_2"}
          key={"test_2"}
          coordinate={{
            x: 0,
            y: 0,
          }}
          onConfirm={() => {}}
          // init={{
          //   title: this.title,
          //   data: this.getInitData(),
          // }}
        />
      )}
    </>
  );
}
