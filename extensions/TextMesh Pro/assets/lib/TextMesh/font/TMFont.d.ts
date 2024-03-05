import { Asset, BufferAsset, TextAsset, Texture2D, TTFFont } from "cc";
import { Char } from "./Char";
import { IFontData } from "../types/IFontData";
import { ITMFont } from "../types/ITMFont";
import { TMFontInfo } from "./FontParser";
export declare class TMFont extends Asset implements ITMFont {
    private static _fontMap;
    private static _loadingMap;
    private _version;
    private _uid;
    private _font;
    private _fontFamily;
    private _fontData;
    private _fontSize;
    private _padding;
    private _atlasWidth;
    private _atlasHeight;
    private _staticChannels;
    private _dynamic;
    private _padTrim;
    private _underLineOffset;
    private _keepUnlderLineSpace;
    private _underLineThickness;
    private _strikeOffset;
    private _strikeThickness;
    private _scriptThickness;
    private _chars;
    get uid(): string;
    get font(): TTFFont;
    get fontFamily(): string;
    get fontSize(): number;
    get padding(): number;
    get textureWidth(): number;
    get textureHeight(): number;
    get dynamic(): boolean;
    get staticChannels(): number;
    get fontData(): IFontData;
    get underLineOffset(): number;
    get underLineThickness(): number;
    get keepUnlderLineSpace(): boolean;
    get strikeOffset(): number;
    /**
     * 删除线宽度（百分比：0-1）
     */
    get strikeThickness(): number;
    get scriptThickness(): number;
    get padTrim(): boolean;
    constructor();
    initial(font?: TTFFont, texture?: Texture2D, tmfInfo?: TMFontInfo): void;
    getCharInfo(code: string): Char;
    removeDynamicChar(code: string): void;
    private _loadFontInfo;
    private isNone;
    static deserializeAsync(data: string | TextAsset | ArrayBuffer | BufferAsset): Promise<TMFont>;
    static deserialize(data: string | TextAsset | ArrayBuffer | BufferAsset): TMFont;
}
