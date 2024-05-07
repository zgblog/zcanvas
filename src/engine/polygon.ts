import { PolylineData, ZPolyline } from "./polyline";

interface PolygonData extends PolylineData {
    fillColor?: string | null
}


class ZPolygon extends ZPolyline<PolygonData> {
    constructor() {
        super()
    }
    public redraw(): void {
        this._g.save()
        this.outline()
        this._g.closePath()
        if (this._data.strokeColor) {
            this._g.stroke()
        }
        if (this._data.fillColor) {
            this._g.fillStyle = this._data.fillColor
            this._g.fill()
        }
        this._g.restore()
    }
}

export {ZPolygon}