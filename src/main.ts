import WaferMap from "./waferMap";
import {WaferMapOption} from "./types";



console.log("main")


export function init(dom: HTMLElement, opts?: WaferMapOption) {

    const chart=new WaferMap(dom,opts)
    console.log(chart)
}

export function life() {

}
