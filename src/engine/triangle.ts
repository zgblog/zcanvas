import { ZObject } from "./object";

type Point = {
    x: number,
    y: number
}

interface TriangleData {
    type: 'equal' | 'right' | 'custom'
    points?: [Point, Point, Point]
    borderColor: string | null
    fillColor: string | null
}

class ZTriangle extends ZObject<TriangleData> {
    constructor() {
        super()
        this._data.type = 'equal'
        this._data.borderColor = '#000'
    }
    public redraw(): void {
        const g = this._g
        g.save()
        const {x1, x2, y1, y2, w, h} = this.getRect()
        if (this._data.type === 'equal') {
            g.moveTo(this._x, y1)
            g.lineTo(x1, y2)
            g.lineTo(x2, y2)
        } else if (this._data.type === 'right') {
            g.moveTo(x1, y1)
            g.lineTo(x1, y2)
            g.lineTo(x2, y2)
        } else if(this._data.points){
            const [p1, p2, p3] = this._data.points
            g.moveTo(x1 + p1.x * w, y1 + p1.y * h)
            g.lineTo(x1 + p2.x * w, y1 + p2.y * h)
            g.lineTo(x1 + p3.x * w, y1 + p3.y * h)
        }
        g.closePath()
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

export {ZTriangle}