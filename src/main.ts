import WaferMap from "./waferMap";
import {WaferMapOption} from "./types";



export function init(dom: HTMLElement, opts?: WaferMapOption) {

    const chart=new WaferMap(dom,opts)

    console.log(chart)
    return chart
}

export function life() {

}
