import styles from '../styles/index.module.css'
import Canvas from '../sections/canvas'
import Toolbox from '../sections/toolbox'
import BoxDrawingTool from '@/tools/box-drawing-tool';
import Tool from '@/types/tools/tool'
import { useState, useRef } from 'react'
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

    const _currentTool = useRef<Tool>({
        cursor: "",
        onStart: (pos: Point) => {

        }

    })

    const _onToolChange = (toolName: string): void => {
        switch (toolName) {

            case 'box-draw':
                _currentTool.current = new BoxDrawingTool();
                setCurrentTool(toolName)
                setCursorType(_currentTool.current.cursor)

                break;
        }
    }

    const _onDragStart = (
        windowPos: Point

        // ,canvasPos: Point
    ): void => {

        // _currentTool.current.onStart(canvasPos);

        console.log('windowPos', windowPos)
    }

    return (
        <div id={styles.app} >
            <Toolbox currentTool={currentTool} onToolChange={_onToolChange} />

            <Canvas onDragStart={_onDragStart} />
        </div>
    )
}
