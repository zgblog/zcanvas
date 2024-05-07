import { ZObject } from "../engine/object"
import { CommonObject } from "../engine/type"

interface Column {
    key: string
    title: string
    width?: number
}

interface TableData {
    columns: Column[]
    data: CommonObject[]
}

class ZTable extends ZObject<TableData>{

    $measureText(text: string) {
        return this._g.measureText(text)
    }

    redraw() {
        const columns = this._data.columns
        const data = this._data.data
        if (columns.length == 0) return
        const g = this._g
        g.save()
        const vInterval = this._width / columns.length
        const hInterval = this._height / (data.length + 1)
        const rows = data.length, cols = columns.length
        g.beginPath()
        // horizontal lines
        for (let i=0; i<rows + 2; i++) {
            g.moveTo(this._x, this._y + i * hInterval)
            g.lineTo(this._x + this._width, this._y + i* hInterval)
        }
        // vertical lines
        for (let i=0; i<cols + 1; i++) {
            g.moveTo(this._x + i * vInterval, this._y)
            g.lineTo(this._x + i * vInterval, this._y + this._height)
        }
        // text
        g.textAlign = 'center'
        g.textBaseline = 'middle'
        for (let i=0; i<cols; i++) {
            g.fillText(columns[i].title, this._x + i * vInterval + vInterval / 2, this._y  + hInterval / 2)
        }
        for (let i=1; i<rows + 1; i++) {
            for (const name in data[i - 1]) {
                const text = data[i - 1][name]
                const idx = columns.findIndex(col => col.key === name)
                if (idx > -1) {
                    const measure = this.$measureText(text)
                    // measure.
                    g.fillText(text, this._x + idx * vInterval + vInterval / 2, this._y + i * hInterval + hInterval / 2)
                }
            }
        }
        
        g.stroke()
        g.restore()
    }
}

export {ZTable}