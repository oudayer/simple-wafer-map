export type WaferMapOption = {
    notch?: 'down' | 'left' | 'up' | 'right';
    mapData?: Array<Array<DieOptions<simpleDieAttributes>>> | Array<DieOptions<simpleDieAttributes>>
}

export interface DieOptions<T> {
    x: number,
    y: number,
    value?: string,
    attributes?: T
}

export interface simpleDieAttributes {
    name?: string,
    value?: string,
    description?: string,
    [propname: string]: any,
}
