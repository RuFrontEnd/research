import { createRef, useEffect, useRef } from 'react';
import * as Types from '@/types/sections/canvas'
import styles from './style.module.css'

export default function Canvas(props: Types.Props) {
    const _canvasRef = createRef<HTMLCanvasElement>();

    const _getCanvas = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
        const canvas = _canvasRef.current!;
        const context = canvas.getContext('2d')!;
        return [canvas, context];
    }

    const _setCanvasSize = (): void => {
        const [canvas, context] = _getCanvas();
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }

    const _onMouseDown = (event: MouseEvent): void => {
        if (event.button === 1) {

        } else if (event.button === 0) { // left button
            props.onDragStart({ x: event.pageX, y: event.pageY })
        }
    }

    useEffect(() => {
        const [canvas, context] = _getCanvas();
        _setCanvasSize()

        // window.addEventListener('resize', _onWindowsResize);
        // canvas.addEventListener('wheel', _onWheel);
        canvas.addEventListener('mousedown', _onMouseDown);
        // canvas.addEventListener('mousemove', _onMouseMove);
        // canvas.addEventListener('touchstart', _onTouchStart);
        // canvas.addEventListener('dblclick', _onDoubleClick);


        console.log('canvas', canvas)
        console.log('context', context)
    }, [])

    return (
        <canvas id={styles.canvas} ref={_canvasRef} />
    )
}
