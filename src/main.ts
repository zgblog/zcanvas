import { ZPolygon } from './engine'
import { ZCanvas } from './engine/canvas'
import { ZCircle } from './engine/circle'
import { ZEllipse } from './engine/ellipse'
import { ZPolyline } from './engine/polyline'
import { ZRect } from './engine/rect'
import { ZTriangle } from './engine/triangle'
import { ZTable } from './extends'
import './style.css'


// table
const table = new ZTable()
table.setData('columns', [{key: "name", title: "名称"}, {key: "age", title: "年龄"}])
table.setData('data', [{name: "zg", age: 27}, {name: 'blog', age: 18}])
table.setWidth(100)
table.setX(100)

// polyline
const polyline = new ZPolyline()
polyline.setData('values', [[0, 0], [0.5, 0.5], [1, 0]])

// polygon
const polygon = new ZPolygon()
polygon.setData('values', [[0, 0], [0.5, 0.5], [1, 0]])
polygon.setData('fillColor', '#FF0000')
polygon.setX(200)
polygon.setY(200)

// circle
const circle = new ZCircle()
circle.setX(100)
circle.setY(100)
circle.setData('end', 270)
circle.setData('fillColor', '#FF0000')
circle.setData('connectCenter', false)

// ellipse
const ellipse = new ZEllipse()
ellipse.setX(200)
ellipse.setY(100)
ellipse.setData('end', 270)
ellipse.setData('fillColor', '#FF0000')

// rect
const rect = new ZRect()
rect.setPosition(50, 200)
rect.setData('round', true)
rect.setData('fillColor', '#FF0000')

// triangle
const triangle = new ZTriangle()
triangle.setPosition(50, 300)
triangle.setData('fillColor', '#FF0000')

triangle.on('down', () => {
    console.log('点击三角形')
})

const canvas = new ZCanvas()
canvas.mount(document.body)
canvas.setWidth(500)
canvas.setHeight(500)
canvas.add(table, polyline, polygon, triangle, rect, circle, ellipse)
canvas.redraw()