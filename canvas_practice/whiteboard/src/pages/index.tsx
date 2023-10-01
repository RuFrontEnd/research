import styles from '../styles/index.module.css'
import Canvas from '../sections/canvas'
import Toolbox from '../sections/toolbox'
import BoxDrawingTool from '@/tools/box-drawing-tool';
import DrawingVisitor from '@/visitors/drawing-visitor';
import Tool from '@/types/tools/tool'
import { useState, useRef, useEffect } from 'react'
import { Point } from "@/types/utils/point"

export default function Index() {
    const [currentTool, setCurrentTool] = useState("select"),
        [cursorType, setCursorType] = useState('default'),
        [ctx, setCtx] = useState({
            canvasSize: { w: 1920, h: 1080 },
            editableTopLeftPos: { x: 320, y: 180 },
            editableBottomRightPos: { x: 1600, y: 900 },
            display: {
                showEditableArea: true,
                showObstacle: true,
                showSize: false,
                showText: true
            }
        })

    let _currentTool: Tool = {
        cursor: "",
        onStart: (pos: Point) => {

        },
        onMove: (pos: Point) => {

        },
        onEnd: (pos: Point) => {

        }
    }

    const _onToolChange = (toolName: string): void => {
        switch (toolName) {

            case 'box-draw':
                _currentTool = new BoxDrawingTool();
                setCurrentTool(toolName)
                setCursorType(_currentTool.cursor)

                break;
        }
    }

    const _onDragStart = (
        windowPos: Point

        , canvasPos: Point
    ): void => {

        _currentTool.onStart(canvasPos);

        console.log(_currentTool)

        console.log('_onDragStart:canvasPos', canvasPos)
    }

    const _onDragMove = (windowPos: Point, canvasPos: Point): void => {

        _currentTool.onMove(canvasPos);

        _updateCanvas();

        console.log('_onDragMove:canvasPos', canvasPos)
    }

    const _onDragEnd = (windowPos: Point, canvasPos: Point): void => {
        _currentTool.onEnd(canvasPos);

        console.log('_onDragEnd:canvasPos', canvasPos)

        _onToolChange('select');
        _updateCanvas();
    }

    const _updateCanvas = (): void => {
        const drawVisitor = new DrawingVisitor();
        // this._itemPool.visit(drawVisitor);
        // const shapes = drawVisitor.getResult();
        // shapes.push(...this._currentTool.draw());
        // shapes.push(...(this._itemPool.selected?.draw() ?? []));
        // if (this.state.ctx.display.showEditableArea) {
        //     shapes.push(...(new EditableAreaIndicator(this.state.ctx.editableTopLeftPos, this.state.ctx.editableBottomRightPos).draw()));
        // }
        // this._canvasRef.current!.shapes = drawVisitor.getResult();
    }

    useEffect(() => {
        setTimeout(() => _updateCanvas(), 100);
    })

    return (
        <div id={styles.app} >
            <Toolbox currentTool={currentTool} onToolChange={_onToolChange} />

            <Canvas onDragStart={_onDragStart} onDragMove={_onDragMove} onDragEnd={_onDragEnd} />
        </div>
    )
}
