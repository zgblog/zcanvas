import { Util } from "../utils/util";
import { ZObject } from "./object";

interface EllipseData {
    radiusX: number
    radiusY: number
    start: number
    end: number
    borderColor: string | null
    fillColor: string | null
    close?: boolean
    connectCenter?: boolean
}

class ZEllipse extends ZObject<EllipseData> {

    constructor() {
        super()
        this._data.start = 0
        this._data.end = 360
        this._data.radiusX = 30
        this._data.radiusY = 20
        this._data.borderColor = '#000'
        this._data.fillColor = null
        this._data.connectCenter = true
    }
    public redraw(): void {
        const start = Util.toRadian(this._data.start)
        const end = Util.toRadian(this._data.end)
        const g = this._g
        g.save()
        g.beginPath()
        g.ellipse(this._x, this._y, this._data.radiusX, this._data.radiusY, 0, start, end)
        if (this._data.connectCenter && end - start < 2 * Math.PI) {
            g.lineTo(this._x, this._y)
            g.closePath()
        }
        if (this._data.close) {
            g.closePath()
        }
        if (this._data.borderColor) {
            g.stroke()
        }
        if (this._data.fillColor) {
            g.fillStyle = this._data.fillColor
            g.fill()
        }
        g.restore()
    }
    
}

export {ZEllipse}