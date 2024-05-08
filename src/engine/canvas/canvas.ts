import { ZObject } from "../object";

type Func = (obj: ZObject) => boolean | void

class ZCanvas {
    private _ctx!:CanvasRenderingContext2D
    private _pix = window.devicePixelRatio
    constructor() {
        const canvas = document.createElement('canvas')
        canvas.style.width = canvas.width + 'px'
        canvas.style.height = canvas.height + 'px'
        canvas.width = canvas.width * this._pix
        canvas.height = canvas.height * this._pix
        canvas.tabIndex = 0
        this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const pick = (e: MouseEvent, event: string) => {
            let {offsetX: x, offsetY: y} = e
            x = x * this._pix
            y = y * this._pix
            this.eachReverse(obj => {
                const rect = obj.getRect()
                if (x >= rect.x1 && y >= rect.y1 && x <= rect.x2 && y <= rect.y2) {
                    obj.emit(event as any)
                    return true
                }
            })
        }
        canvas.addEventListener('mousemove', e => {
            pick(e, 'move')
        })
        canvas.addEventListener('mousedown', e => {
            pick(e, 'down')
        })
        canvas.addEventListener('mouseup', e => {
            pick(e, 'up')
        })
        canvas.addEventListener('keydown', e => {
            
        })
    }
    private _lists: ZObject[] = []
    each(func: Func) {
        for (let i=0; i<this._lists.length; i++) {
            if (func(this._lists[i])){
                return
            }
        }
        
    }
    eachReverse(func: Func) {
        for (let i=this._lists.length - 1; i>=0; i--) {
            if (func(this._lists[i])){
                return
            }
        }
    }
    add(...objs: ZObject[]): ZCanvas {
        objs.forEach(obj => {
            obj.$setCtx(this._ctx)
            this._lists.push(obj)
        })
        return this
    }
    remove(object: ZObject): ZCanvas {
        this._lists.splice(this._lists.indexOf(object), 1)
        return this
    }
    clear() {
        this._lists.length = 0
    }
    contains(object: ZObject): boolean {
        return false
    }
    lists() {
        return this._lists
    }
    mount(dom: HTMLElement) {
        dom.appendChild(this._ctx.canvas)
    }
    unmount() {
        this._ctx.canvas.parentElement?.removeChild(this._ctx.canvas)
    }

    redraw() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
        this._lists.forEach(obj => {
            obj.redraw()
        })
    }

    setWidth(w: number) {
        this._ctx.canvas.width = w * this._pix
        this._ctx.canvas.style.width = w + 'px'
    }

    setHeight(h: number) {
        this._ctx.canvas.height = h * this._pix
        this._ctx.canvas.style.height = h + 'px'
    }

}

export {ZCanvas}