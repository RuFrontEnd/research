import { createRef, useEffect } from 'react';
import styles from './style.module.css'

export default function Canvas() {
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

    useEffect(() => {
        const [canvas, context] = _getCanvas();
        _setCanvasSize()

        console.log('canvas', canvas)
        console.log('context', context)
    }, [])

    return (
        <canvas id={styles.canvas} ref={_canvasRef} />
    )
}
