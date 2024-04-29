
class ZTable {
    private _g!: CanvasRenderingContext2D

    private _data: string[][] = []

    constructor(g: CanvasRenderingContext2D | HTMLCanvasElement) {
        if (g instanceof HTMLCanvasElement) {
            this._g =  g.getContext('2d') as CanvasRenderingContext2D
        } else {
            this._g = g
        }
    }

    setX() {

    }
    setY() {

    }
    setWidth() {

    }
    setHeight() {

    }
    getX() {
        
    }

    setData(data: string[][]) {
        this._data = data
    }

    redraw() {
        if (this._data.length == 0) return
        const g = this._g
        g.save()
        const rows = this._data.length
        g.restore()
    }
}