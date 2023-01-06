import zrender from './zrRegister'
import {WaferShapeData, WaferShapes} from "./types";
import PathProxy from "zrender/lib/core/PathProxy";
import {mapcolor} from "./color";


export function getContainer<T>(selector: T) {

}

export function numZeroPadding(num: number, len: number): string {
    if (String(num).length > len) {
        return num.toString()
    }
    return (Array(len).join('0') + num).slice(-len)
}

/*export function mapTransform(mapData: Array<Array<simpleDieAttributes>>): Array<DieOption>
export function mapTransform(mapData: Array<DieOptions<simpleDieAttributes>>): Array<DieOption>
export function mapTransform(mapData: number[][]): Array<DieOption>*/

export function mapTransform(mapData: number[][]): Array<WaferShapeData> {
    let result: Array<WaferShapeData> = []
    mapData.forEach((line, index) => {
        line.forEach((item, i) => {
            let color = numZeroPadding(item, 3)
            if(item!==0){
                result.push({
                    x: i,
                    y: index,
                    value: numZeroPadding(item, 3),
                    color: mapcolor[color],
                })
            }

        })
    })
    return result
}

export const mapHumbnail = zrender.Path.extend<WaferShapes>({
    type: 'waferMap',
    shape: new WaferShapes(),
    buildPath(ctx: PathProxy, shape: WaferShapes) {
        let mapData = shape.mapData || []
        let width = shape.dieWidth
        let height = shape.dieHeight
        const ctxM = ctx.getContext()
        mapData.forEach(item => {
            ctx.beginPath()
            ctxM.fillStyle = item.color
            ctx.rect(item.x * width, item.y * height, width, height)
            ctx.fill(ctxM)
            ctx.stroke(ctxM)
        })

    }
})
