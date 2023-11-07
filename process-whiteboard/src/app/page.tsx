"use client"
import { useState, useRef, useEffect, useCallback, EventHandler } from 'react'
import Image from 'next/image'

let lineOffset = 4,
  anchrSize = 2;

type Box = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineWidth: number;
  color: string;
}

export default function Home() {

  // const $textArea = useRef<HTMLTextAreaElement | null>(null)
  // const [height, setHeight] = useState<number | string>('auto'),
  //   [text, setText] = useState(''),
  //   [editing, setEditing] = useState(false)

  // useEffect(() => {
  //   if ($textArea.current && editing) {
  //     $textArea.current.focus()
  //   }
  // }, [editing])

  const $canvas = useRef<HTMLCanvasElement | null>(null)
  const ctx = (() => {
    if ($canvas.current) {
      return $canvas.current.getContext('2d')
    }

    return null
  })()
  let { current: mousedown } = useRef(false),
    { current: clickedArea } = useRef({ box: -1, pos: 'o' }),
    { current: tmpBox } = useRef<Box | null>(null)

  let x1 = -1;
  let y1 = -1;
  let x2 = -1;
  let y2 = -1;
  let boxes: any[] = [];

  const newBox = useCallback((x1: number, y1: number, x2: number, y2: number) => {
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
      color: 'DeepSkyBlue'
    };
    // } else {
    //   return null;
    // }
  }, [])

  const drawBoxOn = useCallback((box: Box, ctx: CanvasRenderingContext2D) => {
    const xCenter = box.x1 + (box.x2 - box.x1) / 2,
      yCenter = box.y1 + (box.y2 - box.y1) / 2;

    ctx.strokeStyle = box.color;
    ctx.fillStyle = box.color;

    ctx.rect(box.x1, box.y1, (box.x2 - box.x1), (box.y2 - box.y1));
    ctx.lineWidth = box.lineWidth;
    ctx.stroke();

    // draw anchors
    ctx.fillRect(box.x1 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize); // x, y, width, height
    ctx.fillRect(box.x1 - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
    ctx.fillRect(box.x1 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    ctx.fillRect(xCenter - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    ctx.fillRect(xCenter - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
    ctx.fillRect(xCenter - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    ctx.fillRect(box.x2 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    ctx.fillRect(box.x2 - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
    ctx.fillRect(box.x2 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  }, [])

  const redraw = useCallback(() => {
    if (!ctx) return
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    // for (var i = 0; i < boxes.length; i++) {
    //   drawBoxOn(boxes[i], ctx);
    // }
    if (clickedArea.box === -1) {
      tmpBox = newBox(x1, y1, x2, y2);
      if (tmpBox !== null) {
        drawBoxOn(tmpBox, ctx);
      }
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {

    mousedown = true;
    // clickedArea = findCurrentArea(e.offsetX, e.offsetY);
    x1 = e.nativeEvent.offsetX;
    y1 = e.nativeEvent.offsetY;
    x2 = e.nativeEvent.offsetX;
    y2 = e.nativeEvent.offsetY;
    console.log('mousedown', mousedown)
  }, [])

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    // if (clickedArea.box == -1 && tmpBox != null) {
    //   boxes.push(tmpBox);
    // } else if (clickedArea.box != -1) {
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
    clickedArea = { box: -1, pos: 'o' };
    tmpBox = null;
    mousedown = false;
    // console.log(boxes);
    console.log('mousedown', mousedown)
    console.log(`(x1:${x1} y2:${y1}), (x2:${x2} y2:${y2})`)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mousedown && clickedArea.box == -1) {
      x2 = e.nativeEvent.offsetX;
      y2 = e.nativeEvent.offsetY;
      redraw();
    }

  }, [])


  useEffect(() => {
    if ($canvas.current) {
      $canvas.current.width = window.innerWidth
      $canvas.current.height = window.innerHeight
    }
  }, [])

  return (
    <canvas ref={$canvas} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} />
    // <main style={{ width: '100px', height: '100px' }}

    //   onClick={() => {
    //     setEditing(false)
    //   }}>

    //   <div className='fixed top-[50px] left-[50px] border border-black '
    //     onDoubleClick={() => {
    //       setEditing(true)
    //       if ($textArea.current) {
    //         $textArea.current.focus()
    //       }
    //     }}>
    //     <textarea style={{ height: height }}
    //       disabled={!editing}
    //       value={text}
    //       className='resize-none focus:outline-none overflow-hidden block'
    //       ref={$textArea}
    //       onClick={(e) => { e.stopPropagation() }}
    //       onInput={(e) => {
    //         const textarea = e.currentTarget;
    //         textarea.style.height = "auto";
    //         textarea.style.height = textarea.scrollHeight - 1 + "px";
    //         setText(textarea.value)
    //       }} />
    //   </div>
    // </main >
  )
}
