export default class DrawingVisitor {
    private _shapes: /*Shape[]*/ any[] = [];

    getResult(): /*Shape[]*/ any[] {
        return this._shapes;
    }
}