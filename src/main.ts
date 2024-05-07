import { ZPolygon } from './engine'
import { ZCircle } from './engine/circle'
import { ZEllipse } from './engine/ellipse'
import { ZPolyline } from './engine/polyline'
import { ZRect } from './engine/rect'
import { ZTriangle } from './engine/triangle'
import { ZTable } from './extends'
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

// polygon
const polygon = new ZPolygon()
polygon.setData('values', [[0, 0], [0.5, 0.5], [1, 0]])
polygon.setData('fillColor', '#FF0000')
polygon.$setCtx(ctx)
polygon.setX(200)
polygon.setY(200)
polygon.redraw()

// circle
const circle = new ZCircle()
circle.$setCtx(ctx)
circle.setX(100)
circle.setY(100)
circle.setData('end', 270)
circle.setData('fillColor', '#FF0000')
circle.setData('connectCenter', false)
circle.redraw()

// ellipse
const ellipse = new ZEllipse()
ellipse.$setCtx(ctx)
ellipse.setX(200)
ellipse.setY(100)
ellipse.setData('end', 270)
ellipse.setData('fillColor', '#FF0000')
ellipse.redraw()

// rect
const rect = new ZRect()
rect.$setCtx(ctx)
rect.setPosition(50, 200)
rect.setData('round', true)
rect.setData('fillColor', '#FF0000')
rect.redraw()

// triangle
const triangle = new ZTriangle()
triangle.$setCtx(ctx)
triangle.setPosition(50, 300)
triangle.setData('fillColor', '#FF0000')
triangle.redraw()