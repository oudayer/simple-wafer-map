import {WaferMapInitOpts, WaferMapOption, WaferShapeData} from "./types";
import zrender from './zrRegister'
import {ThumbnailMap, mapTransform, normalMap} from "./utils";

class WaferMap {
    //todo update color
    // event listener
    // overwrite

    private _zr: zrender.ZRenderType;
    private dieLayer: zrender.Group
    private reticleLayer: zrender.Group
    dom: HTMLElement;
    id: number;
    mapData: Array<WaferShapeData>
    dieWidth: number
    dieHeight: number
    isThumbnail = true
    colorList = new Map()

    constructor(dom: HTMLElement, opts?: WaferMapOption) {
        opts = opts || {
            width: 100,
            height: 100
        };
        this.dom = dom;
        this.mapData = mapTransform(opts.mapData)
        this.isThumbnail = opts.isThumbnail === undefined ? true : opts.isThumbnail
        const notch = opts.notch || 'down'
        this.dieWidth = opts.width / (opts.mapData[0].length)
        this.dieHeight = opts.height / opts.mapData.length

        if (opts.colorList) {
            this.colorList.clear()
            opts.colorList.forEach(item => {
                const name=Object.keys(item)[0]
                this.colorList.set(name, item[name])
            })
            console.log(opts.colorList,this.colorList)
        }
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


    }

    setOption<Opt extends WaferMapInitOpts>(opts: Opt): void {

    }

    draw() {
        this.updateColor()

        if (this.isThumbnail) {
            this.dieLayer.draggable = false
            this.dieLayer.add(new ThumbnailMap({
                shape: {
                    dieWidth: this.dieWidth,
                    dieHeight: this.dieHeight,
                    mapData: this.mapData
                }
            }))
        } else {
            normalMap({
                dieWidth: this.dieWidth,
                dieHeight: this.dieHeight,
                mapData: this.mapData
            }).subscribe(rect => {
                this.dieLayer.add(rect)
            })
        }

        this._zr.add(this.dieLayer)
        return this
    }

    setScale(scale: number) {
        this.dieLayer.attr({
            scaleX: scale,
            scaleY: scale
        })
    }

    update() {

    }

    clear(): void {
        /*if (this._disposed) {
            console.warn('Instance ' + id + ' has been disposed');
            return;
        }*/
        this._zr.dispose()
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



    updateColor() {
        if (this.colorList.size > 0) {
            this.mapData.forEach(item => {
                if(this.colorList.has(item.value))item.color=this.colorList.get(item.value)
            })
        }

    }
}

export default WaferMap

enum Notch {
    down = 0,
    right = 90,
    up = 180,
    left = 270
}
