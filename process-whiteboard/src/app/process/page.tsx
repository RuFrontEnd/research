// TODO: onConfirm 時觸發 Terminal traversal / 條件判斷當 drag p2 時才進行 Terminal traversal / 確認 Decision 取用可用的 data 邏輯是否與 Process 一致 / 禁止 shape 頂點未從 terminal 出發 ( 會造成無法 traversal ) / 處理 data shape SelectFrame 開關(點擊 frame 以外要關閉) / 尋找左側列 icons / 後端判斷新增的 data 是否資料重名
"use client";
import Terminal from "@/shapes/terminal";
import Process from "@/shapes/process";
import Data from "@/shapes/data";
import Desicion from "@/shapes/decision";
import ImportFrame from "@/components/importFrame";
import SelectDataFrame from "@/components/selectDataFrame";
import { useState, useRef, useEffect, useCallback } from "react";
import { PressingTarget, ConnectTarget } from "@/types/shapes/core";
import { Vec, Direction } from "@/types/shapes/common";
import Core from "@/shapes/core";

let useEffected = false,
  ctx: CanvasRenderingContext2D | null | undefined = null,
  shapes: (Terminal | Process | Data | Desicion)[] = [],
  sender: null | ConnectTarget = null,
  dbClickedShape: Terminal | Data | Process | Desicion | null = null;

const getFramePosition = (shape: Core) => {
  const frameOffset = 12;
  return { x: shape.p.x + shape.w / 2 + frameOffset, y: shape.p.y };
};

export default function ProcessPage() {
  let { current: $canvas } = useRef<HTMLCanvasElement | null>(null);

  const [importFrame, setImportFrame] = useState<{ p: Vec } | undefined>(
      undefined
    ),
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

      if (shape.checkBoundry(p) && dbClickedShape?.id === shape.id) {
        if (shape instanceof Data) {
          const $importFrame = document.getElementById(dbClickedShape?.id);
          if ($importFrame) {
            const framePosition = getFramePosition(shape);
            $importFrame.style.left = `${framePosition.x}px`;
            $importFrame.style.top = `${framePosition.y}px`;
          }
        } else if (shape instanceof Process || shape instanceof Desicion) {
          const $selectFrame = document.getElementById(dbClickedShape?.id);
          if ($selectFrame) {
            const framePosition = getFramePosition(shape);
            $selectFrame.style.left = `${framePosition.x}px`;
            $selectFrame.style.top = `${framePosition.y}px`;
          }
        }
      }
    });
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const p = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    // create relationships between shapes and shapes
    if (sender) {
      shapes.forEach((shape) => {
        shape.options = [];

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

    // traversal to give all shapes corresponding options
    const terminal = shapes.find(
      (shape) => shape instanceof Terminal && shape.isStart
    );
    if (terminal && terminal instanceof Terminal) {
      terminal.onTraversal();
    }

    // check all correspondants of shapes' between options and selectedData 
    if (sender) {
      shapes.forEach((shape) => {
        shape.getRedundancies();
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
          dbClickedShape = shape;
          if (shape instanceof Data) {
            setImportFrame({
              p: getFramePosition(shape),
            });
            setSelectFrame(undefined);
          } else if (shape instanceof Process || shape instanceof Desicion) {
            setImportFrame(undefined);
            setSelectFrame({
              p: getFramePosition(shape),
            });
          }
        }
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
      "red"
    );

    shapes.push(process_new);
  };

  const onClickData = () => {
    let data_new = new Data(
      `data_${shapes.length + 1}`,
      200,
      100,
      { x: 100, y: 100 },
      "green"
    );

    shapes.push(data_new);
  };

  useEffect(() => {
    if (useEffected) return;

    if ($canvas) {
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      if (!ctx) return;
      let terminal = new Terminal(
          "terminal_1",
          200,
          100,
          { x: 300, y: 100 },
          "orange",
          true
        ),
        process = new Process("process_1", 200, 100, { x: 300, y: 350 }, "red"),
        process_2 = new Process(
          "process_2",
          200,
          100,
          { x: 1200, y: 300 },
          "blue"
        ),
        data_1 = new Data("data_1", 200, 100, { x: 600, y: 600 }, "green");
      // desicion_1 = new Desicion(
      //   "desicion_1",
      //   150,
      //   100,
      //   { x: 300, y: 100 },
      //   "#3498db"
      // );

      shapes.push(terminal);
      shapes.push(process);
      shapes.push(process_2);
      shapes.push(data_1);
      // shapes.push(desicion_1);

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

      {importFrame && dbClickedShape instanceof Data && (
        <ImportFrame
          id={dbClickedShape.id}
          key={dbClickedShape.id}
          coordinate={importFrame.p}
          onConfirm={(title, data) => {
            if (!(dbClickedShape instanceof Data)) return;
            dbClickedShape?.onDataChange(title, data);
          }}
          init={{
            title: dbClickedShape?.title ? dbClickedShape?.title : "",
            data: dbClickedShape?.data ? dbClickedShape?.data : [],
          }}
        />
      )}

      {selectFrame &&
        (dbClickedShape instanceof Process ||
          dbClickedShape instanceof Desicion) && (
          <SelectDataFrame
            id={dbClickedShape.id}
            key={dbClickedShape.id}
            coordinate={selectFrame.p}
            onConfirm={(title, data) => {
              if (
                !(dbClickedShape instanceof Process) &&
                !(dbClickedShape instanceof Desicion)
              )
                return;
              dbClickedShape?.onDataChange(title, data);
            }}
            init={{
              title: dbClickedShape?.title,
              options: dbClickedShape?.options,
              selections: dbClickedShape.selectedData,
            }}
          />
        )}
    </>
  );
}
