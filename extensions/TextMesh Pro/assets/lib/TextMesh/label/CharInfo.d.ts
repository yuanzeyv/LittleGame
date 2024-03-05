import { TMFont } from "../font/TMFont";
import { Char } from "../font/Char";
import { TextStyle } from "./TextStyle";
import { Slot, Clickable } from "./LayoutTypes";
import { ETMQuadType } from "../vertex/ETMQuadType";
export declare class CharVertex {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    scale: number;
    rot: number;
    u: number;
    v: number;
    u1: number;
    v1: number;
    uw: number;
    vh: number;
    type: ETMQuadType;
}
export declare class CharInfo {
    index: number;
    font: TMFont;
    blendMode: number;
    char: Char;
    visible: boolean;
    style: TextStyle;
    /**
     * 顶点坐标：左下、右下、左上、右上
     */
    vertexData: CharVertex[];
    alpha: number;
    x: number;
    y: number;
    baseY: number;
    startY: number;
    rotate?: boolean;
    ascent: number;
    descent: number;
    realWidth: number;
    realHeight: number;
    fontSize: number;
    offsetX: number;
    offsetY: number;
    fixedY: number;
    w: number;
    h: number;
    glyphLeft: number;
    glyphRight: number;
    sw: number;
    sw1: number;
    cjk: boolean;
    scale: number;
    slot: Slot;
    click: Clickable;
    line: number;
    inline: number;
    visibleChar: boolean;
    shadowChar: CharInfo;
    addVertex(): CharVertex;
    copyFrom(charInfo: CharInfo): void;
    reset(): void;
}
export declare function putCharInfoToPool(charInfo: CharInfo): void;
export declare function getCharInfoFromPool(): CharInfo;
