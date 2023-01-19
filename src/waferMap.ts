import {DieOption, WaferMapInitOpts, WaferMapOption, WaferShapeData} from "./types";
import zrender from './zrRegister'
import {HumbnailMap, mapTransform, normalMap} from "./utils";
import {mapcolor} from "./color";

class WaferMap {

    private _zr: zrender.ZRenderType;
    private dieLayer: zrender.Group
    private reticleLayer: zrender.Group
    dom: HTMLElement;
    id: number;
    mapData: Array<WaferShapeData>
    dieWidth: number
    dieHeight: number

    constructor(dom: HTMLElement, opts?: WaferMapOption) {
        opts = opts || {
            width: 100,
            height: 100
        };
        this.dom = dom;
        this.mapData = mapTransform(opts.mapData)
        const notch = opts.notch || 'down'
        this.dieWidth = opts.width / (opts.mapData[0].length)
        this.dieHeight = opts.height / opts.mapData.length
        const zr = this._zr = zrender.init(dom, {
            width: opts.width,
            height: opts.height,
            renderer: 'canvas'
        });

        const dieMap = this.dieLayer = new zrender.Group({
            draggable: opts.draggable || false,
            originX: 0,
            originY: 0,
            rotation: Notch[notch] / 180 * Math.PI,
        })


    }

    setOption<Opt extends WaferMapInitOpts>(opts: Opt): void {

    }

    draw(): void {
        this.updateColor()
        /*this.dieLayer.add(new HumbnailMap({
            shape: {
                dieWidth:  this.dieWidth ,
                dieHeight: this.dieHeight ,
                mapData: this.mapData
            }
        }))*/

        normalMap({
            dieWidth: this.dieWidth,
            dieHeight: this.dieHeight,
            mapData: this.mapData
        }).subscribe(rect=>{
            this.dieLayer.add(rect)
        })
        this._zr.add(this.dieLayer)
    }

    setScale() {

    }

    update() {

    }

    clear(): void {
        /*if (this._disposed) {
            console.warn('Instance ' + id + ' has been disposed');
            return;
        }*/
        this.setOption({});
    }

    reset(): void {

    }


    clip() {

    }

    select() {
    }

    clickDie() {

    }

    zoomIn() {

    }

    zoomOut() {

    }

    updateColor() {
        this.mapData.forEach(item => {
            //  item.color
        })
    }
}

export default WaferMap

enum Notch {
    down = 0,
    right = 90,
    up = 180,
    left = 270
}
