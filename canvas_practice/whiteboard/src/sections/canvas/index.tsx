import { createRef, useEffect, useRef } from 'react';
import * as Types from '@/types/sections/canvas'
import styles from './style.module.css'

let _ticker: any

export default function Canvas(props: Types.Props) {
    const _canvasRef = useRef<HTMLCanvasElement>(null),
        _shapes: /* Shape[] */any[] = [];

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
            const [canvas, _] = _getCanvas();
            props.onDragStart({ x: event.pageX, y: event.pageY }, { x: event.pageX, y: event.pageY })
            canvas.addEventListener('mousemove', _onMouseLeftMove);
            canvas.addEventListener('mouseup', _onMouseLeftUp);

        }
    }

    const _onMouseLeftMove = (event: MouseEvent): void => {
        event.preventDefault();
        props.onDragMove({ x: event.pageX, y: event.pageY }, { x: event.pageX, y: event.pageY });
    }

    const _onMouseLeftUp = (event: MouseEvent): void => {
        event.preventDefault();
        const [canvas, _] = _getCanvas();
        props.onDragEnd({ x: event.pageX, y: event.pageY }, { x: event.pageX, y: event.pageY });

        canvas.removeEventListener('mouseup', _onMouseLeftUp);
        canvas.removeEventListener('mousemove', _onMouseLeftMove);
        // canvas.removeEventListener('mouseout', this._onMouseLeftUp);
    }


    const _draw = (): void => {
        const [canvas, context] = _getCanvas();
        const storedTransform = context.getTransform();
        canvas.width = canvas.width;
        context.setTransform(storedTransform);

        for (const s of _shapes) {
            s.draw(canvas, context);
        }
    }

    useEffect(() => {
        const [canvas, context] = _getCanvas();
        _setCanvasSize()
        _ticker = setInterval(_draw, 16.667);
        // window.addEventListener('resize', _onWindowsResize);
        // canvas.addEventListener('wheel', _onWheel);
        canvas.addEventListener('mousedown', _onMouseDown);
        // canvas.addEventListener('mousemove', _onMouseMove);
        // canvas.addEventListener('touchstart', _onTouchStart);
        // canvas.addEventListener('dblclick', _onDoubleClick);

        return () => {
            clearInterval(_ticker);
        }
    }, [])

    return (
        <canvas id={styles.canvas} ref={_canvasRef} />
    )
}
