import { Point } from '@/types/utils/point'
import { ORIGIN } from '@/utils/point';

class BoxDrawingTool {
    private _endPos: Point = ORIGIN;
    private _startPos: Point = ORIGIN;
    private _activate: boolean = false;

    get name(): string {
        return 'box-draw';

    }

    get cursor(): string {
        return 'crosshair';
    }


    onStart(pos: Point): void {
        this._startPos = pos;
        this._endPos = pos;
        this._activate = true;
    }

    onMove(pos: Point): void {
        this._activate = true;
        this._endPos = pos;
    }

    onEnd(pos: Point): void {
        this._endPos = pos;
    }
}

export default BoxDrawingTool;