import { ZObject } from "./object";

interface PolylineData {
    values: [number, number][]
    strokeColor?: string | null
}

class ZPolyline<T extends PolylineData = PolylineData> extends ZObject<T> {

    constructor() {
        super()
        this._data.strokeColor = '#000'
    }

    protected outline(inner?: (g: CanvasRenderingContext2D) => void) {
        const g = this._g
        const values = this._data.values
        typeof inner === 'function' && inner.call(this, g)
        this._data.strokeColor && (g.strokeStyle = this._data.strokeColor)
        g.beginPath()
        let v = this.$calc(values[0])
        g.moveTo(v.x, v.y)
        for (let i=1; i<values.length; i++) {
            v = this.$calc(values[i])
            g.lineTo(v.x, v.y)
        }
    }
    
    public redraw(): void {
        this._g.save()
        this.outline()
        this._g.stroke()
        this._g.restore()
    }
    private $calc(xy: [number, number]) {
        return {
            x: this._x + this._width * xy[0],
            y: this._y + this._height * xy[1]
        }
    }
}

export {ZPolyline, type PolylineData}