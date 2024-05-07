type EventType = 'click' | 'down' | 'up' | 'move'
type EventMapping = {
    [k in EventType]?: Func[]
}
type Func = () => void

class ZEvent {
    private _eventMapping: EventMapping = {}
    public on(name: EventType, func: () => void) {
        if (!this._eventMapping[name]) {
            this._eventMapping[name] = []
        }
        this._eventMapping[name]?.push(func)
    }
    public emit(name: EventType) {
        this._eventMapping[name]?.forEach(func => {
            func.call(this)
        })
    }
    public off(name: EventType): void
    public off(name: EventType, func: () => void): void
    public off(name: EventType, func?: () => void) {
        if (this._eventMapping[name]) {
            if (!func) {
                delete this._eventMapping[name]
            } else {
                const list = this._eventMapping[name] as Func[]
                list.splice(list.indexOf(func), 1)
            }
        }
    }
}

export {ZEvent}