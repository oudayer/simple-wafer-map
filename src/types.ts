export type WaferMapOption = {
    notch?: NotchPosition,
    isThumbnail?: boolean,
    width: number,
    height: number,
    draggable?: boolean, // 拖拽
    colorList?: Array<Color>,
    // mapData?: Array<Array<simpleDieAttributes>> | Array<DieOptions<simpleDieAttributes>> | number[][]
    mapData?: number[][]

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


export type DieOption = {
    x: number,
    y: number,
    value?: string | number,
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




export type NotchPosition = 'left' | 'down' | 'right' | 'up'

export type GridMask = {
    x: number,
    y: number,
    width: number,
    height: number
}
type Color = {
    [propName: string]: string
}

export type WaferShapeData = DieOption & { color: string }

export class WaferShapes {
    dieWidth = 0;
    dieHeight = 0;
    mapData: Array<WaferShapeData>
}
