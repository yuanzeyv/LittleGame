import { IChar } from "../types/IChar";
import { TMFCharInfo, TMFontInfo } from "./FontParser";
export declare class Char implements IChar {
    static: boolean;
    code: string;
    /**
     * 左下，右下，左上，右上
     */
    uvs: Float32Array;
    glyphWidth: number;
    glyphHeight: number;
    glyphAdvance: number;
    glyphRight: number;
    glyphLeft: number;
    width: number;
    height: number;
    size: number;
    ascent: number;
    descent: number;
    /**
     * channel id[0,3]
     */
    cid: number;
    static fromTMFCharInfo(code: string, tmfFont: TMFontInfo, charInfo: TMFCharInfo): Char;
}
export declare type CharSet = {
    [code: string]: Char;
};
