import {WaferMapInitOpts, WaferMapOption} from "./types";
import zrender from './zrRegister'

class WaferMap {

    private _zr: zrender.ZRenderType;
    private dieLayer: zrender.Group
    private reticleLayer: zrender.Group
    dom: HTMLElement;
    id: number;

    constructor(dom: HTMLElement, opts?: WaferMapOption) {
        opts = opts || {
            width: 100,
            height: 100
        };
        this.dom = dom;
        const notch = opts.notch || 'down'

        const zr = this._zr = zrender.init(dom, {
            width: opts.width,
            height: opts.height,
            renderer: 'canvas'
        });

        const dieMap = this.dieLayer = new zrender.Group({
            draggable: opts.draggable || false,
            originX: opts.width / 2,
            originY: opts.height / 2,
            rotation: Notch[notch] / 180 * Math.PI,
        })

        const reticleMap = this.reticleLayer = new zrender.Group({
            draggable: opts.draggable || false,
            originX: opts.width / 2,
            originY: opts.height / 2,
        })
        zr.add(dieMap);
        zr.add(reticleMap)
    }

    setOption<Opt extends WaferMapInitOpts>(opts: Opt): void {

    }

    draw(): void {

    }

    setScale() {

    }

    update(){

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

}

export default WaferMap

enum Notch {
    down = 0,
    right = 90,
    up = 180,
    left = 270
}
