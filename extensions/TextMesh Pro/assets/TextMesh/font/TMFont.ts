import { Asset, assetManager, BufferAsset, TextAsset, Texture2D, TTFFont, _decorator } from "cc";
import { FontData } from "./FontData";
import { Char } from "./Char";
import { IFontData } from "../types/IFontData";
import { ITMFont } from "../types/ITMFont";
import { Utils } from "../utils/Utils";
import { FontParser, TMFontInfo } from "./FontParser";
import { ResManager } from "../utils/ResManger";

const { ccclass, property, executeInEditMode } = _decorator;

@ccclass("TMFont")
export class TMFont extends Asset implements ITMFont {
    private static _fontMap: Map<string, TMFont> = new Map();
    private static _loadingMap: Map<string, boolean> = new Map();

    private _version: string;
    private _uid: string;
    private _font: TTFFont;
    private _fontFamily: string;
    private _fontData: IFontData;
    private _fontSize: number = 45;
    private _padding: number = 60;
    private _atlasWidth: number = 1024;
    private _atlasHeight: number = 1024;
    private _staticChannels: number = 3;
    private _dynamic: boolean = true;
    private _padTrim: boolean = false;

    private _underLineOffset = -6.9;
    private _keepUnlderLineSpace = false;
    private _underLineThickness = 0.15;
    private _strikeOffset = 0.4;
    private _strikeThickness = 0.1;
    private _scriptThickness = 0.3;

    private _chars:{[char:string]: Char} = {};

    get uid() {
        return this._uid;
    }
    
    get font(): TTFFont {
        return this._font;
    }

    get fontFamily() {
        return this._fontFamily;
    }

    get fontSize(): number {
        return this._fontSize;
    }
    
    get padding(): number {
        return this._padding;
    }

    get textureWidth(): number {
        return this._atlasWidth;
    }

    get textureHeight(): number {
        return this._atlasHeight;
    }

    get dynamic() {
        return this._dynamic;
    }

    get staticChannels(): number {
        return this._staticChannels;
    }

    get fontData(): IFontData {
        return this._fontData;
    }

    get underLineOffset() {
        return this._underLineOffset;
    }

    get underLineThickness() {
        return this._underLineThickness;
    }

    get keepUnlderLineSpace() {
        return this._keepUnlderLineSpace;
    }

    get strikeOffset() {
        return this._strikeOffset;
    }

    /**
     * 删除线宽度（百分比：0-1）
     */
    get strikeThickness() {
        return this._strikeThickness;
    }

    get scriptThickness() {
        return this._scriptThickness;
    }

    get padTrim() {
        return this._padTrim;
    }

    constructor() {   
        super();
    }

    initial(font?: TTFFont, texture?: Texture2D, tmfInfo?: TMFontInfo) {
        this._font = font;

        this._fontData = new FontData(this, texture, null, tmfInfo);
        this._fontData.initial();
    }

    getCharInfo(code: string): Char {
        return this._fontData.getCharInfo(code, null);
    }

    removeDynamicChar(code: string) {
        this._fontData.removeDynamicChar(code);
    }

    private async _loadFontInfo(fontInfo: TMFontInfo) {   
        this._version = fontInfo.version;
        this._fontFamily = fontInfo.fontFamily;
        this._fontSize = fontInfo.fontSize;
        this._padding = fontInfo.padding;
        this._atlasWidth = fontInfo.atlasWidth;
        this._atlasHeight = fontInfo.atlasHeight;
        this._staticChannels = fontInfo.staticChannels || 0;
        this._dynamic = fontInfo.dynamic == 1 || this._staticChannels == 0;
        this._padTrim = fontInfo.padTrim == 1;

        this._underLineOffset = fontInfo.underLineOffset;
        this._keepUnlderLineSpace = fontInfo.keepUnlderLineSpace == 1;
        this._underLineThickness = fontInfo.underLineThickness;
        this._strikeOffset = fontInfo.strikeOffset;
        this._strikeThickness = fontInfo.strikeThickness;
        this._scriptThickness = fontInfo.scriptThickness;

        let ttf: TTFFont;
        if(fontInfo.dynamic && fontInfo.staticChannels < 4) {
            ttf = await ResManager.getByUUIDAsync(fontInfo.font, TTFFont) as TTFFont;
        }

        let atlas: Texture2D;
        if(fontInfo.staticChannels > 0) {
            atlas = await ResManager.getByUUIDAsync(fontInfo.atlas + "@6c48a", Texture2D) as Texture2D;
        }
        this.initial(ttf, atlas, fontInfo);
    }

    private isNone(value: any) {
        return value === null || value === undefined || Number.isNaN(value);
    }

    static async deserializeAsync(data: string | TextAsset | ArrayBuffer | BufferAsset) {
        let text = "";
        let uuid = "";
        if(typeof data == "string") {
            text = data;
        }else {
            if(data instanceof TextAsset) {
                text = data.text;
                uuid = data._uuid;
            }else if(data instanceof ArrayBuffer) {
                text = Utils.arrayBufferToString(data);
            }else if(data instanceof BufferAsset) {
                text = Utils.arrayBufferToString(data.buffer());
                uuid = data._uuid;
            }else{
                console.error("invaliad tmf data");
                return null;
            }
        }
        
        if(TMFont._fontMap.has(uuid)) {
            return TMFont._fontMap.get(uuid);
        }else{
            if(TMFont._loadingMap.has(uuid)) {
                return new Promise<TMFont>((resolve, reject) => {
                    let timer = setInterval(() => {
                        if(TMFont._fontMap.has(uuid)) {
                            clearInterval(timer);
                            resolve(TMFont._fontMap.get(uuid));
                        }
                    }, 100);
                });
            }           
        }
        this._loadingMap.set(uuid, true);

        let fontInfo = FontParser.parse(uuid, text);
        let tmf = new TMFont();
        tmf._uid = uuid;

        await tmf._loadFontInfo(fontInfo);

        TMFont._fontMap.set(uuid, tmf);
        this._loadingMap.delete(uuid);
        
        return tmf;
    }

    static deserialize(data: string | TextAsset | ArrayBuffer | BufferAsset) {
        let text = "";
        let uuid = "";
        if(typeof data == "string") {
            text = data;
        }else {
            if(data instanceof TextAsset) {
                text = data.text;
                uuid = data._uuid;
                assetManager.releaseAsset(data);
            }else if(data instanceof ArrayBuffer) {
                text = Utils.arrayBufferToString(data);
                data = null;
            }else if(data instanceof BufferAsset) {
                text = Utils.arrayBufferToString(data.buffer());
                uuid = data._uuid;
                assetManager.releaseAsset(data);
            }else{
                console.error("invaliad tmf data");
                return null;
            }
        }

        let fontInfo = FontParser.parse(uuid, text);
        let tmf = new TMFont();       

        tmf._loadFontInfo(fontInfo);

        return tmf;
    }
}

//@ts-ignore
assetManager.downloader.register(".tmf", assetManager.downloader._downloaders[".json"]);

// assetManager.parser.register(".tmf", (file, options, onComplete)=>{
//     console.log("fmt parser")
// });

assetManager.factory.register(".tmf", (id, data, options, onComplete)=>{
    const out = new TMFont();
    out._nativeUrl = id;
    out._nativeAsset = data;
    console.log("factory: tmf parse ", data);
    onComplete(null, out);
});