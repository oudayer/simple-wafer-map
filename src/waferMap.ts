import {Reticle, WaferMapInitOpts, WaferMapOption, WaferShapeData} from "./types";
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
    mapWidth:number
    mapHeight:number
    isThumbnail = true
    colorList = new Map()

    constructor(dom: HTMLElement, opts?: WaferMapOption) {
        // 初始化参数
        const notch = opts.notch || 'down'
        opts = opts || {
            width: 100,
            height: 100
        };
        this.dom = dom;
        this.mapData = mapTransform(opts.mapData)
        this.isThumbnail = opts.isThumbnail === undefined ? true : opts.isThumbnail
        this.mapWidth=opts.width
        this.mapHeight=opts.height
        this.dieWidth = opts.width / (opts.mapData[0].length)
        this.dieHeight = opts.height / opts.mapData.length

        if (opts.colorList) {
            this.colorList.clear()
            opts.colorList.forEach(item => {
                const name=Object.keys(item)[0]
                this.colorList.set(name, item[name])
            })
        }
        this._zr = zrender.init(dom, {
            width: opts.width,
            height: opts.height,
            renderer: 'canvas'
        });

         this.dieLayer = new zrender.Group({
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
        return this

    }

    update() {

    }

    clear(): void {
        this._zr.dispose()
        this.setOption({});
    }

    rotate(rotation:number){
        this.dieLayer.attr({
            rotation: rotation,
        })
        return this
    }

    reset(): void {

    }


    clip(path:zrender.Path) {
        this.dieLayer.setClipPath(path)
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

     drawReticleFunc(reticle:Array<number>) {
        const shot_x = reticle[0]
        const shot_y = reticle[1]
        const shot_ref_x = reticle[2]
        const shot_ref_y = reticle[3]
         const x0 = shot_ref_x % shot_x - shot_x
         const y0 = shot_ref_y % shot_y - shot_y

         for (let i = x0; i < this.mapWidth / this.dieWidth; i += shot_x) {
             for (let j = y0; j < this.mapHeight / this.dieHeight; j += shot_y) {
                 this.dieLayer.add(new zrender.Rect({
                     shape: {
                         x: this.dieWidth * i,
                         y: this.dieHeight * j,
                         width: shot_x * this.dieWidth,
                         height: shot_y * this.dieHeight
                     },
                     style: {
                         fill: 'rgba(0, 0, 0, 0)',
                         stroke: '#000FFF'
                     }
                 }))
             }
         }
             this.dieLayer.dirty()
         }


}

export default WaferMap

enum Notch {
    down = 0,
    right = 90,
    up = 180,
    left = 270
}
