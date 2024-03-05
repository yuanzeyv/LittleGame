import { Color, IRenderData, Pool } from "cc";
import { Char } from "../font/Char";
import { CharInfo } from "../label/CharInfo";
import { TextStyle } from "../label/TextStyle";
import { ETMQuadType } from "./ETMQuadType";
export declare class TMRenderData implements IRenderData {
    x: number;
    y: number;
    z: number;
    u: number;
    v: number;
    u1: number;
    v1: number;
    color: Color;
    textureId: number;
    stroke: number;
    strokeBlur: number;
    fill: number;
    strokeColor: Color;
    shadowColor: Color;
    shadow: number;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    char: Char;
    type: ETMQuadType;
    style: TextStyle;
}
export declare var TMRenderDataPool: Pool<TMRenderData>;
export declare type TMRenderDataArray = TMRenderData[];
export declare class TMQuadRenderData {
    charInfo: CharInfo;
    type: ETMQuadType;
    startIndex: number;
    endIndex: number;
    length: number;
    height: number;
    maxHeight: number;
    reset(): void;
}
export declare var TMQuadRenderDataPool: Pool<TMQuadRenderData>;
export declare var putTMQuadRenderDataToPool: (quad: TMQuadRenderData) => void;
