import {WaferMapInitOpts, WaferMapOption} from "./types";

export class WaferMap {
    dom: HTMLElement;
    id: number;

    constructor(id: number, dom: HTMLElement, opts?: WaferMapOption) {
        opts = opts || {};
        this.dom = dom;
        this.id = id;
    }
    setOption<Opt extends WaferMapInitOpts>(opts: Opt): void {

    }

    draw(): void {

    }

    clear(): void {

    }

    reset(): void {

    }


    clip() {

    }

    select() {
    }

    clickDie() {

    }

}
