import {  Rect, Texture2D, __private } from "cc";
import { ITMFont } from "../types/ITMFont";
import { Char, CharSet } from "./Char";
import { IFontData } from "../types/IFontData";
import { TextureChannel } from "./TextureChannel";
import { FontHelper } from "./FontHelper";
import TinySDF from "../libs/tinysdf";
import { Utils } from "../utils/Utils";
import { CharConst } from "./const";
import { GlyphInfo, SpaceInfo } from "../types/types";
import { TMFontInfo } from "./FontParser";

export class FontData implements IFontData {
    private _tmFont: ITMFont;
    private _texture: Texture2D = null;
    private _letters: { [code: string]: Char } = {};    
    private _staticLetters: { [code: string]: Char } = {};
    private _dynamicChannels: TextureChannel[];
    private _actualSize: number = 0;
    private _buffer: Uint8Array;
    private _fontRect: Rect = new Rect();
    private _safePadding = 2;

    get tmFont(): ITMFont {
        return this._tmFont;
    }

    get texture(): Texture2D {
        return this._texture;
    }

    get chars(): CharSet {
        return this._letters;
    }

    get spaceSize(): number {
        return this._actualSize;
    }

    get safePadding(): number {
        return this._safePadding;
    }

    constructor(tmFont: ITMFont, texture?: Texture2D, channels?: TextureChannel[], tmfInfo?: TMFontInfo) {
        this._tmFont = tmFont;
        this._dynamicChannels = channels || [];

        if(!texture) {
            this._texture = new Texture2D();
            this._texture.reset({
                mipmapLevel: 0,
                format: Texture2D.PixelFormat.RGBA8888,
                width: tmFont.textureWidth,
                height: tmFont.textureHeight,
            });
        }else{
            this._texture = texture;
        }

        this._actualSize = TinySDF.calcuteFontSize(tmFont.fontSize, tmFont.padding) + this._safePadding;
        this._fontRect.set(0, 0, this.spaceSize, this.spaceSize);

        if(tmfInfo) {
            let keys = Object.keys(tmfInfo.chars);
            for(let i=0;i<keys.length;i++) {
                let code = keys[i];
                let char = Char.fromTMFCharInfo(code, tmfInfo, tmfInfo.chars[code]);
                char.static = true;
                this._staticLetters[code] = char;
            }
        }
    }

    initial() {
        this.createDynamicChannels();
    }

    private createDynamicChannels() {
        this._dynamicChannels = [];
        if(!this._tmFont.dynamic || this._tmFont.staticChannels == 4) {
            return;
        }

        let lru: any = null;
        for(let i=this._tmFont.staticChannels;i<4;i++) {
            let channel = new TextureChannel(this._tmFont, i, true, lru);
            lru = channel.lru;
            this._dynamicChannels.push(channel);
        }
    }

    removeDynamicChar(code: string) {
        let char = this._letters[code];
        if(char && !char.static) {
            delete this._letters[code];
        }
    }

    getRoundLine(): Char {
        return this.getCharInfo(CharConst.RoundLine, FontHelper.getRoundLine, FontHelper);
    }

    getRectLine(): Char {
        return this.getCharInfo(CharConst.RectLine, FontHelper.getRectLine, FontHelper);
    }

    getNoneChar(): Char {
        return this.getCharInfo(CharConst.NoneChar, FontHelper.getNoneChar, FontHelper);
    }

    getCharInfo(code: string, charRender?:(code: string, tmFont: ITMFont) => GlyphInfo, thisRender?: any): Char {
        // 从静态字符集中获取字符信息
        let char = this._staticLetters[code];
        if(char) {
            return char;
        }

        if(!this.tmFont.dynamic) {
            console.warn(`font ${this.tmFont.fontFamily} is not dynamic, can not get char ${code}`);
            if(charRender == null) {
                return this.getNoneChar();
            }
        }

        // 从动态字符集中获取字符信息
        char = this._letters[code];
        if(char) {
            return char;
        }

        if(!this.tmFont.dynamic || this.tmFont.staticChannels == 4) {
            if(charRender == null) {                
                // 静态字符集已满，无法获取字符信息， 返回占位符
                return this.getNoneChar();
            }
        }

        if(charRender && this._dynamicChannels.length == 0) {
            return null;
        }

        // 获取一个动态通道
        let space: SpaceInfo = null;
        let channel: TextureChannel = null;
        for(let i=0;i<this._dynamicChannels.length;i++) {
            channel = this._dynamicChannels[i];
            if(!channel.isFull()) {
                if(channel.count == 0) {
                    this.clearChannel(channel.index);
                }
                break;
            }
        }

        if(!channel) {
            space = this._dynamicChannels[0].spanEmptySpace(code);
            channel = this._dynamicChannels.find(c => space.cid == c.index);
        }else{
            space = channel.spanEmptySpace(code);
        }
        delete this._letters[code];

        let glyph = charRender ? charRender.call(thisRender, code, this._tmFont) : FontHelper.createSDFChar(code, this._tmFont);        
        
        char = new Char();
        char.code = code;
        char.glyphWidth = glyph.glyphWidth;
        char.glyphHeight = glyph.glyphHeight;
        char.glyphAdvance = glyph.glyphAdvance;
        char.glyphRight = glyph.glyphRight;
        char.glyphLeft = glyph.glyphLeft;
        char.width = glyph.width;
        char.height = glyph.height;
        char.size = glyph.size;
        char.ascent = glyph.ascent;
        char.descent = glyph.descent;
        let u0 = (space.x+this._safePadding) / this.tmFont.textureWidth;
        let v0 = (space.y+this._safePadding) / this.tmFont.textureHeight;
        let v1 = v0 + glyph.height / this.tmFont.textureHeight;
        let u1 = u0 + glyph.width / this.tmFont.textureWidth;
        char.uvs = new Float32Array([u0, v0, u1, v0, u0, v1, u1, v1]);
        char.cid = channel.index;

        this._fontRect.set(space.x, space.y, this.spaceSize, this.spaceSize);
        this.writeToTexture(code, channel.index, glyph);

        this._letters[code] = char;

        return char;
    }

    private clearChannel(cid: number) {
        let width = this._texture.width;
        let height = this._texture.height;
        let rect = new Rect(0, 0, width, height);
        this._buffer = Utils.readTexturePixels(this._texture, rect, this._buffer);

        for(let i=0;i<width;i++) {
            for(let j=0;j<height;j++) {
                let index = (j * width + i) * 4;
                this._buffer[index + cid] = 0;
            }
        }
        
        Utils.uploadData(this._texture, this._buffer, rect);
    }

    private writeToTexture(code: string, cid: number, glyhp: GlyphInfo) {        
        this._buffer = Utils.readTexturePixels(this._texture, this._fontRect, this._buffer);

        for(let i=0;i<this._fontRect.width;i++) {
            for(let j=0;j<this._fontRect.height;j++) {
                let index = (j * this._fontRect.width + i) * 4;

                if(i >= this._safePadding && i<glyhp.width+this._safePadding && 
                   j >= this._safePadding && j<glyhp.height+this._safePadding) {
                    let gi = i - this._safePadding;
                    let gj = j - this._safePadding;
                    let value = glyhp.data[gi + gj * glyhp.width];
                    this._buffer[index + cid] = value;
                }else{
                    this._buffer[index + cid] = 0;
                }

                // for debug
                // this._buffer[index + 3] = 255;
            }
        }
        
        delete glyhp.data;
        Utils.uploadData(this._texture, this._buffer, this._fontRect);
    }
}