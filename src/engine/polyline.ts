import { ZObject } from "./object";

interface PolylineData {
    values: [number, number][]
}

class ZPolyline extends ZObject<PolylineData> {
    
    public redraw(): void {
        const g = this._g
        const values = this._data.values
        g.beginPath()
        let v = this.$calc(values[0])
        g.moveTo(v.x, v.y)
        for (let i=1; i<values.length; i++) {
            v = this.$calc(values[i])
            g.lineTo(v.x, v.y)
        }
        g.stroke()
    }
    private $calc(xy: [number, number]) {
        return {
            x: this._x + this._width * xy[0],
            y: this._y + this._height * xy[1]
        }
    }
}

export {ZPolyline}