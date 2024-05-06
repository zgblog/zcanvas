import { ZPolyline } from './engine/polyline'
import { ZTable } from './shapes'
import './style.css'

const canvas = document.createElement('canvas')
canvas.width = 500
canvas.height = 500
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

// table
const table = new ZTable()
table.$setCtx(ctx)
table.setData('columns', [{key: "name", title: "名称"}, {key: "age", title: "年龄"}])
table.setData('data', [{name: "zg", age: 27}, {name: 'blog', age: 18}])
table.setWidth(100)
table.setX(100)
table.scale(1, 1)

// polyline
const polyline = new ZPolyline()
polyline.setData('values', [[0, 0], [0.5, 0.5], [1, 0]])
polyline.$setCtx(ctx)
polyline.redraw()