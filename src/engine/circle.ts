import { Util } from "../utils/util";
import { ZObject } from "./object";

interface CircleData {
    radius: number
    start: number
    end: number
    borderColor: string | null
    fillColor: string | null
    close?: boolean
    connectCenter?: boolean
}

class ZCircle extends ZObject<CircleData>{

    constructor(){
        super()
        this._data.start = 0
        this._data.end = 360
        this._data.radius = 25
        this._data.borderColor = '#000'
        this._data.fillColor = null
        this._data.connectCenter = true
    }

    public setRadius(radius: number) {
        this._data.radius = radius
    }
    
    public redraw(): void {
        const start = Util.toRadian(this._data.start)
        const end = Util.toRadian(this._data.end)
        const g = this._g
        g.save()
        g.beginPath()
        g.arc(this._x, this._y, this._data.radius, start, end)
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

export {ZCircle}