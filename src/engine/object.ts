import { ZEvent } from "./event"
import { CommonObject } from "./type"

abstract class ZObject<T extends CommonObject = CommonObject> extends ZEvent {
    protected _x = 0
    protected _y = 0
    protected _width = 50
    protected _height = 50

    protected _g!: CanvasRenderingContext2D
    protected _data: T = {} as T

    public $setCtx(g: CanvasRenderingContext2D) {
        this._g = g
    }

    public setData<K extends keyof T>(name: K, data: T[K]): void
    public setData(data: T): void
    public setData<K extends keyof T>(name: K | T, data?: T[K]) {
        if (typeof name === 'string' && arguments.length === 2) {
            this._data[name] = data as any
        } else if (typeof name === 'object' && arguments.length === 1) {
            this._data = name
        }
    }

    public getX() {
        return this._x
    }
    public getY() {
        return this._y
    }
    public setPosition(x: number, y: number) {
        this._x = x
        this._y = y
    }
    public getPosition() {
        return {x: this._x, y: this._y}
    }
    public getRect() {
        return {
            x1: this._x - this._width / 2,
            y1: this._y - this._height / 2,
            x2: this._x + this._width / 2,
            y2: this._y + this._height / 2,
            w: this._width,
            h: this._height
        }
    }
    public setX(x: number) {
        this._x = x
        return this
    }
    public setY(y: number) {
        this._y = y
        return this
    }
    public getWidth() {
        return this._width
    }
    public getHeight() {
        return this._height
    }
    public setWidth(width: number) {
        this._width = width
        return this
    }
    public setHeight(_height: number) {
        this._height = _height
    }

    public abstract redraw(): void

    private _do(before: (g: CanvasRenderingContext2D) => void, after?: (g: CanvasRenderingContext2D) => void) {
        const g = this._g
        g.save()
        before.call(this, this._g)
        this.redraw()
        typeof after === 'function' && after.call(this, this._g)
        g.restore()
    }

    /**
     * rotate *angle* 
     * @param angle 
     */
    public rotate(angle: number) {
       this._do(g => {
        // 1. 移动坐标原点到图形中心
        g.translate(this._x + this._width / 2, this._y + this._height / 2)
        // 2. 设置旋转角度
        g.rotate(Math.PI * angle / 180)
       })
    }

    public scale(x: number, y: number) {
        let oX = this._x, oY = this._y
        this._do(g => {
            // 1. 移动坐标原点到图形中心
            g.translate(this._x + this._width / 2, this._y + this._height / 2)
            // 2. 缩放
            g.scale(x, y)
            // 3. 图形的相对坐标变化了
            this._x =  - this._width / 2
            this._y =  - this._height / 2
        }, () => {
            // 4. 恢复相对坐标
            this._x = oX
            this._y = oY
        })
    }

    public move(x: number, y: number) {
       this._do(g => {
        g.translate(x, y)
       })
    }
    
}

export {ZObject}