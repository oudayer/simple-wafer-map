export type WaferMapOption = {
    notch?: NotchPosition,
    width: number,
    height: number,
    draggable?: boolean, // 拖拽
    mapData?: Array<Array<simpleDieAttributes>> | Array<DieOptions<simpleDieAttributes>>
}

export interface DieOptions<T> {
    x: number,
    y: number,
    value?: string | number,
    attributes?: T
}

export interface simpleDieAttributes {
    name?: string,
    value: string | number,
    description?: string,
    [propname: string]: any,
}


export type DieOption<T> = {
    x: number,
    y: number,
    option?: T | null
}

export type Bin<T> = {
    value: number | string,
    description?: string,
    binOption?: T
}

export type Wafer = {}

export type Shot = GridMask
export type Reticle = GridMask


export type WaferMapInitOpts = {
    width?: number,
    height?: number,
    devicePixelRatio?: number,
    colorMap?: Array<string>,
};

export type WaferMapBasicOptions = {
    zoom?: boolean,
    drag?: boolean,
    notch?: NotchPosition,
    reticle?: Reticle
}

export type NotchPosition = 'left' | 'down' | 'right' | 'up'

export type GridMask = {
    x: number,
    y: number,
    width: number,
    height: number
}
