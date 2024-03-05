import { GlyphInfo } from "../../types/types";
export default class TinySDF {
    buffer: number;
    cutoff: number;
    radius: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    size: number;
    gridOuter: Float64Array;
    gridInner: Float64Array;
    f: Float64Array;
    d: Float64Array;
    z: Float64Array;
    v: Uint16Array;
    middle: number;
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    cacheCanvas: boolean;
    trimBuffer: boolean;
    private antiAlis;
    private resolution;
    private canvasInst;
    private image;
    private texture;
    private supportGetData;
    constructor({ fontSize, buffer, radius, cutoff, fontFamily, fontWeight, fontStyle, cacheCanvas, trimBuffer, }?: {
        fontSize?: number;
        buffer?: number;
        radius?: number;
        cutoff?: number;
        fontFamily?: string;
        fontWeight?: string;
        fontStyle?: string;
        cacheCanvas?: boolean;
        trimBuffer?: boolean;
    });
    static calcuteFontSize(fontSize: number, buffer: number): number;
    setFontFamily(fontFamily: string): void;
    private _createCanvas;
    private beforeDraw;
    private afterDraw;
    draw(char: string, fontFamily?: string, measureText?: string, onDraw?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number, sx: number, sy: number) => void, trimBuffer?: boolean): GlyphInfo;
    /**
     * 通过纹理读取制定区域的像素值
     * @param src 纹理
     * @param rect 区域，为空表示全部区域
     * @param buffer 返回数组
     * @returns 返回数组
     */
    private readTexturePixels;
    private round;
    private _trimBuffer;
}
