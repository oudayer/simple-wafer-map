import zrender from './zrRegister'
import {WaferShapeData, WaferShapes} from "./types";
import PathProxy from "zrender/lib/core/PathProxy";
import {mapcolor} from "./color";
import {from} from 'rxjs'
import {map,mergeAll} from "rxjs/operators";

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
            if (item !== 0) {
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

export const HumbnailMap = zrender.Path.extend<WaferShapes>({
    type: 'waferMap',
    shape: new WaferShapes(),
    buildPath(ctx: PathProxy, shape: WaferShapes) {
        let mapData = shape.mapData || []
        let w = shape.dieWidth
        let h = shape.dieHeight
        const ctxM = ctx.getContext()
        mapData.forEach(item => {
            ctx.beginPath()
            ctxM.fillStyle = item.color
            ctx.rect(item.x * w, item.y * h, w, h)
            ctx.fill(ctxM)
            ctx.stroke(ctxM)
        })

    }
})

export function normalMap(shape: WaferShapes) {
   return from(shape.mapData).pipe(
        map(item => {
            let rect = new zrender.Rect({
                shape: {
                    x: shape.dieWidth * item.x,
                    y: shape.dieHeight * item.y,
                    width: shape.dieWidth,
                    height: shape.dieHeight
                },
                style: {
                    fill: item.color,
                    stroke:'1'
                },

            }).on('click', () => {
               // this.selectDieEmit.emit(item.value)
            })
            return rect
        }),
    )


}



