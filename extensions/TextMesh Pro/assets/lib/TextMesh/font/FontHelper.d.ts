import TinySDF from "../libs/tinysdf";
import { ITMFont } from "../types/ITMFont";
import { GlyphInfo } from "../types/types";
export declare class FontHelper {
    private static _sdfs;
    static getSDF(tmFont: ITMFont): TinySDF;
    private static getFontFamily;
    static getKey(code: string, tmFont: ITMFont): string;
    static createSDFChar(code: string, tmFont: ITMFont): GlyphInfo;
    static getRoundLine(code: string, tmFont: ITMFont): GlyphInfo;
    static getRectLine(code: string, tmFont: ITMFont): GlyphInfo;
    static getNoneChar(code: string, tmFont: ITMFont): GlyphInfo;
}
