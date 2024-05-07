import { ZObject } from "./object";

class ZLine extends ZObject{
    
    public redraw(): void {
        const g = this._g
        g.beginPath()
        g.moveTo(this._x, this._y)
        g.lineTo(this._x + this._width, this._y + this._height)
    }

}

export {ZLine}