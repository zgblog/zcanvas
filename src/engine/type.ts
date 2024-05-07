interface CommonObject {
    [k: string]: any
}

// 创建一个重复类型的工具类型
type Repeat<T, N extends number> = N extends N ? T : T & Repeat<T, Exclude<N, N>>;

export {type CommonObject, type Repeat}