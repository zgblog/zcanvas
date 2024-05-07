import { ZObject } from "./object";

interface RectData {
    round: boolean
    roundRadius: number
    borderColor: string | null
    fillColor: string | null
}

class ZRect extends ZObject<RectData> {
    constructor() {
        super()
        this._data.borderColor = '#000'
        this._data.roundRadius = 10
    }
    public redraw(): void {
        const g = this._g
        g.save()
        if (this._data.round) {
            const radius = this._data.roundRadius || 0
            const x1 = this._x - this._width / 2, x2 = this._x + this._width / 2
            const y1 = this._y - this._height / 2, y2 = this._y + this._height / 2
            g.moveTo(x1 + radius, y1)
            g.lineTo(x2 - radius, y1)
            g.arcTo(x2, y1, x2, y1 + radius, radius)
            g.lineTo(x2, y2 - radius)
            g.arcTo(x2, y2, x2 - radius, y2, radius)
            g.lineTo(x1 + radius, y2)
            g.arcTo(x1, y2, x1, y2- radius, radius)
            g.lineTo(x1, y1 + radius)
            g.arcTo(x1, y1, x1+radius, y1, radius)
        } else {
            g.rect(this._x - this._width / 2, this._y - this._height / 2, this._width, this._height)
        }
        if (this._data.borderColor) {
            g.strokeStyle = this._data.borderColor
            g.stroke()
        }
        if (this._data.fillColor) {
            g.fillStyle = this._data.fillColor
            g.fill()
        }
        g.restore()
    }
    
}

export {ZRect}