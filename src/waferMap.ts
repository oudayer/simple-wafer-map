import {WaferMapOption} from "./model";

export class WaferMap {
    dom: HTMLElement;
    id: number;

    constructor(id: number, dom: HTMLElement, opts?: WaferMapOption) {
        opts = opts || {};
        this.dom = dom;
        this.id = id;
    }


}
