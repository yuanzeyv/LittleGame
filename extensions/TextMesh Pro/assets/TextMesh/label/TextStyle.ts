import { Color, Pool } from "cc";
import { TMFont } from "../font/TMFont";
import { StyleMapper } from "./StyleMapper";
import { EScriptType } from "./types";

/**
 * ubb style
 * <b/i/u/style>
 * <style b i u>content</style>
 */
type ColorType = number | string;

const colorMap = {
    'red': Color.RED,
    'green': Color.GREEN,
    'blue': Color.BLUE,
    'yellow': Color.YELLOW,
    'cyan': Color.CYAN,
    'magenta': Color.MAGENTA,
    'black': Color.BLACK,
    'white': Color.WHITE,
    'gray': Color.GRAY,
    'transparent': Color.TRANSPARENT,
};

export enum ECornerType {
    LT,
    RT,
    LB,
    RB,
}

export class TextStyle {  
    [key:string]:any;
    
    // 文本颜色
    private _$color: ColorType;
    private _$colorLT: ColorType;
    private _$colorLB: ColorType;
    private _$colorRT: ColorType;
    private _$colorRB: ColorType;
  
    private _$shadow: number;
    private _$shadowColor:ColorType;
    private _$shadowX:number;
    private _$shadowY:number;
    private _$shadowBlur:number;
      
    private _$stroke:number;
    private _$strokeBlur: number;
    private _$strokeColor:ColorType;

    private _$backgroundColor: ColorType;
    private _$maskColor: ColorType;
  
    private _$fontSize: number;
  
    private _$dilate: number;
    private _$scriptType:EScriptType;
    
    // 删除线
    private _$strike: boolean;
    private _$strikeColor: ColorType;
    private _$underline: boolean;
    private _$underlineColor: ColorType;
    private _$italic: boolean;
    private _$background: boolean;
    private _$mask: boolean;

    private _tmFont: TMFont;

    private _fontSize: number = 18;
    private _dilate: number = 0.25;
    private _background: boolean = false;
    private _mask: boolean = false;
    private _italic: boolean = false;
    private _scriptType: EScriptType = EScriptType.None;
    private _strike: boolean = false;
    private _strikeRGBA: Color = new Color(0, 0, 0, 255);
    private _underline: boolean = false;
    private _underlineRGBA: Color = new Color(0, 0, 0, 255);

    private _fillRGBA: Color = new Color(0, 0, 0, 255);
    private _enableColorLT = false;
    private _enableColorLB = false;
    private _enableColorRT = false;
    private _enableColorRB = false;
    private _colorLT: Color = new Color();
    private _colorLB: Color = new Color();
    private _colorRT: Color = new Color();
    private _colorRB: Color = new Color();
    private _strokeRGBA: Color = new Color(0, 0, 0, 255);
    private _shadowRGBA: Color = new Color(0, 0, 0, 255);
    private _backgroundRGBA: Color = new Color(0, 0, 0, 255);
    private _maskRGBA: Color = new Color(0, 0, 0, 128);
    
    private _stroke: number = 0;
    private _strokeBlur: number = 0;
    private _gamma = 1;
    private _shadow: number = 0;
    private _shadowBlur: number = 0;
    private _shadowOffsetX: number = 0;
    private _shadowOffsetY: number = 0;
    private _realFontSize: number = 18;

    constructor(tmFont?: TMFont) {
        this._tmFont = tmFont;
    }

    get font() {
        return this._tmFont;
    }

    set font(value: TMFont) {
        if(this._tmFont !== value) {
            this._tmFont = value;
        }
    }

    get realFontSize() {
        return this._realFontSize;
    }

    reset() {  
        this._$color = null;
    
        this._$shadowColor = null;
        this._$shadowBlur = null;
        this._shadowOffsetX = null;
        this._shadowOffsetY = null;
    
        this._$stroke = null;
        this._$strokeColor = null;
        this._$strokeBlur = null;

        this._$backgroundColor = null;
        this._$maskColor = null;
    
        this._$fontSize = null;
        this._fontSize = null;
    
        this._$italic = null;
        this._$dilate = null;
        this._$strike= null;
        this._$strikeColor= null;
        this._$underline= null;
        this._$underlineColor= null;

        this._$scriptType = null;
        this._scriptType = null;

        this._enableColorLB = false;
        this._enableColorLT = false;
        this._enableColorRB = false;
        this._enableColorRT = false;
    }

    clone() {
        return TextStyle.copy(this);
    }

    copyFrom(from: TextStyle, onlyChanged = true) {
        let fields = onlyChanged ? from.changedFields : null;

        let keys = fields || Object.keys(from);
        for(let key of keys) {
            let value = from[key];
            if(value instanceof Color) {
                this[key].set(value);
            }else{
                this[key] = from[key];
            }
        }
        return this;
    }

    static copy(from: TextStyle) {
        let style = new TextStyle();
        let keys = Object.keys(from);
        for(let key of keys) {
            let value = from[key];
            if(value instanceof Color) {
                style[key].set(value);
            }else{
                style[key] = from[key];
            }
        }
        return style;
    }

    private calcFontSize() {
        this._realFontSize = this._fontSize;
        if(this._scriptType != EScriptType.None) {
            this._realFontSize = this._fontSize * (this.font ? this.font.scriptThickness : 0.2);
        }
    }

    private getColor(color:ColorType, outColor?: Color): Color {
        outColor = outColor || new Color();
        if (typeof color === 'string') {
            color = color.toLocaleLowerCase();
            if (colorMap[color]) {
                return colorMap[color];
            }
            
            let hex = color.replace('0x', '#');
            Color.fromHEX(outColor, hex);
        }else if (typeof color === 'number') {
            let r = (color >> 24) & 0xff;
            let g = (color >> 16) & 0xff;
            let b = (color >> 8) & 0xff;
            let a = color & 0xff;
            outColor.set(r, g, b, a);
        }
        return outColor;
    }

    preset() {
        if(this._$color && typeof this._$color === 'string') {
            let colors = this._$color.split(',');
            this._$color = colors[0];
            
            if(colors.length == 4) {
                if(this._$colorLT == null) {
                    this._$colorLT = colors[0];
                }
                if(this._$colorLB == null) {
                    this._$colorLB = colors[1];
                }
                if(this._$colorRT == null) {
                    this._$colorRT = colors[2];
                }
                if(this._$colorRB == null) {
                    this._$colorRB = colors[3];
                }
            }else if(colors.length == 3) {
                if(this._$colorLT == null) {
                    this._$colorLT = colors[0];
                }
                if(this._$colorRT == null) {
                    this._$colorRT = colors[1];
                }
                if(this._$colorRB == null) {
                    this._$colorRB = colors[2];
                }
                if(this._$colorLB == null) {
                    this._$colorLB = colors[1];
                }
            }else if(colors.length == 2) {
                if(this._$colorLT == null) {
                    this._$colorLT = colors[0];
                }
                if(this._$colorRB == null) {
                    this._$colorRB = colors[1];
                }
                if(this._$colorRT == null) {
                    this._$colorRT = colors[0];
                }
                if(this._$colorLB == null) {
                    this._$colorLB = colors[1];
                }
            }
        }

        this._fillRGBA = this.getColor(this._$color, this._fillRGBA);
        this._strokeRGBA = this.getColor(this._$strokeColor, this._strokeRGBA);
        this._shadowRGBA = this.getColor(this._$shadowColor, this._shadowRGBA);
        this._backgroundRGBA = this.getColor(this._$backgroundColor, this._backgroundRGBA);
        this._maskRGBA = this.getColor(this._$maskColor, this._maskRGBA);
        this._strikeRGBA = this.getColor(this._$strikeColor || this._$color, this._strikeRGBA);
        this._underlineRGBA = this.getColor(this._$underlineColor || this._$color, this._underlineRGBA);

        this._fontSize = this._$fontSize == null ? this._fontSize : this._$fontSize;
        this._shadow = this._$shadow == null ? this._shadow : this._$shadow;
        this._shadowOffsetX = this._$shadowX == null ? this._shadowOffsetX : this._$shadowX;
        this._shadowOffsetY = this._$shadowY == null ? this._shadowOffsetY : this._$shadowY;
        this._stroke = this._$stroke == null ? this._stroke : this._$stroke;
        this._strokeBlur = this._$strokeBlur == null ? this._strokeBlur : this._$strokeBlur;
        this._dilate = this._$dilate == null ? this._dilate : this._$dilate;
        this._background = this._$background == null ? this._background : this._$background;
        this._mask = this._$mask == null ? this._mask : this._$mask;
        this._italic = this._$italic == null ? this._italic : this._$italic;

        this._strike = this._$strike == null ? this._strike : this._$strike;
        this._underline = this._$underline == null ? this._underline : this._$underline;
        this._scriptType = this._$scriptType == null ? this._scriptType : this._$scriptType;

        if(this._$colorLB) {
            this._enableColorLB = true;
            this._colorLB = this.getColor(this._$colorLB, this._colorLB);
        }
        if(this._$colorLT) {
            this._enableColorLT = true;
            this._colorLT = this.getColor(this._$colorLT, this._colorLT);
        }
        if(this._$colorRB) {
            this._enableColorRB = true;
            this._colorRB = this.getColor(this._$colorRB, this._colorRB);
        }
        if(this._$colorRT) {
            this._enableColorRT = true;
            this._colorRT = this.getColor(this._$colorRT, this._colorRT);
        }

        this.calculate();
    }  

    calculate() {
        this.calcGamma();
        this.calcFontSize();
    }

    private calcGamma() {
        this._gamma = 2 * 1.4142 / (this.realFontSize * ((this._strokeRGBA.a <= 0) ? 1 : 1.8));
    }  

    get fontSize() {
        return this._fontSize;
    }

    setFontSize(fontSize: number, focus = false) {
        if(this._$fontSize == null || focus) {
            this._fontSize = fontSize;
        }
    }

    get shadow() {
        return this._shadow;
    }
    setShadow(value: number, focus: boolean = false) {
        if(this._$shadow == null || focus) {
            this._shadow = value;
        }
    }

    get shadowOffsetX() {
        return this._shadowOffsetX;
    }
    setShadowOffsetX(value: number, focus: boolean = false) {
        if(this._$shadowX == null || focus) {
            this._shadowOffsetX = value;
        }
    }

    get shadowOffsetY() {
        return this._shadowOffsetY;
    }

    setShadowOffsetY(value: number, focus: boolean = false) {
        if(this._$shadowY == null || focus) {
            this._shadowOffsetY = value;
        }
    }

    get fillRGBA() {
        return this._fillRGBA;
    }
    
    /**
     * 设置文本颜色
     * @param color 
     * @param focus 如果为false，且颜色未通过样式设置过时，才可以改变
     */
    setFillColor(color: Color, focus: boolean = false) {
        if(this._$color == null || focus) {
            this._fillRGBA.set(color);
        }
    }

    get enableColorLB() {
        return this._enableColorLB || !!this._$colorLB;
    }
    set enableColorLB(value: boolean) {
        this._enableColorLB = value;
    }
    get enableColorLT() {
        return this._enableColorLT || !!this._$colorLT;
    }
    set enableColorLT(value: boolean) {
        this._enableColorLT = value;
    }
    get enableColorRB() {
        return this._enableColorRB || !!this._$colorRB;
    }
    set enableColorRB(value: boolean) {
        this._enableColorRB = value;
    }
    get enableColorRT() {
        return this._enableColorRT || !!this._$colorRT;
    }
    set enableColorRT(value: boolean) {
        this._enableColorRT = value;
    }
    getFillColor(corner: ECornerType) {
        switch(corner) {
            case ECornerType.LB:
                return this.enableColorLB ? this._colorLB : this._fillRGBA;
            case ECornerType.LT:
                return this.enableColorLT ? this._colorLT : this._fillRGBA;
            case ECornerType.RB:
                return this.enableColorRB ? this._colorRB : this._fillRGBA;
            case ECornerType.RT:
                return this.enableColorRT ? this._colorRT : this._fillRGBA;
        }
    }

    get colorLB() {
        return this._colorLB;
    }
    setColorLB(color: Color, focus: boolean = false) {
        if(this._$colorLB == null || focus) {
            this._enableColorLB = true;
            this._colorLB.set(color);
        }
    }

    get colorLT() {
        return this._colorLT;
    }
    setColorLT(color: Color, focus: boolean = false) {
        if(this._$colorLT == null || focus) {
            this._enableColorLT = true;
            this._colorLT.set(color);
        }
    }

    get colorRB() {
        return this._colorRB;
    }
    setColorRB(color: Color, focus: boolean = false) {
        if(this._$colorRB == null || focus) {
            this._enableColorRB = true;
            this._colorRB.set(color);
        }
    }

    get colorRT() {
        return this._colorRT;
    }
    setColorRT(color: Color, focus: boolean = false) {
        if(this._$colorRT == null || focus) {
            this._enableColorRT = true;
            this._colorRT.set(color);
        }
    }

    get strokeRGBA() {
        return this._strokeRGBA;
    }
    setStrokeColor(color: Color, focus: boolean = false) {
        if(this._$strokeColor == null || focus) {
            this._strokeRGBA.set(color);
        }
    }

    get shadowRGBA() {
        return this._shadowRGBA;
    }
    setShadowColor(color: Color, focus: boolean = false) {
        if(this._$shadowColor == null || focus) {
            this._shadowRGBA.set(color);
        }
    }

    get backgroundRGBA() {
        return this._backgroundRGBA;
    }

    setBackgroundColor(color: Color, focus: boolean = false) {
        if(this._$backgroundColor == null || focus) {
            this._backgroundRGBA.set(color);
        }
    }

    get maskRGBA() {
        return this._maskRGBA;
    }

    setMaskColor(color: Color, focus: boolean = false) {
        if(this._$maskColor == null || focus) {
            this._maskRGBA.set(color);
        }
    }

    get dilate() {
        return this._dilate;
    }
    setDilate(value: number, focus: boolean = false) {
        if(this._$dilate == null || focus) {
            this._dilate = value;
        }
    }

    get stroke() {
        return this._stroke;
    }
    setStroke(value: number, focus: boolean = false) {
        if(this._$stroke == null || focus) {
            this._stroke = value;
        }
    }

    get strokeBlur() {
        return this._strokeBlur;
    }

    setStrokeBlur(value: number, focus: boolean = false) {
        if(this._$strokeBlur == null || focus) {
            this._strokeBlur = value;
        }
    }

    get gamma() {
        return this._gamma;
    }

    get background() {
        return this._background;
    }

    setBackground(value: boolean, focus: boolean = false) {
        if(this._$background == null || focus) {
            this._background = value;
        }
    }

    get mask() {
        return this._mask;
    }

    setMask(value: boolean, focus: boolean = false) {
        if(this._$mask == null || focus) {
            this._mask = value;
        }
    }

    get shadowBlur() {
        return this._shadowBlur;
    }
    setShadowBlur(value: number, focus: boolean = false) {
        if(this._$shadowBlur == null || focus) {
            this._shadowBlur = value;
        }
    }

    get italic() {
        return this._italic;
    }

    setItalic(value: boolean, focus: boolean = false) {
        if(this._$italic == null || focus) {
            this._italic = value;
        }
    }

    get scriptType() {
        return this._scriptType;
    }

    setScriptType(value: EScriptType, focus: boolean = false) {
        if(this._$scriptType == null || focus) {
            this._scriptType = value;
        }
    }

    get strike() {
        return this._strike;
    }

    setStrike(value: boolean, focus: boolean = false) {
        if(this._$strike == null || focus) {
            this._strike = value;
        }
    }

    get strikeRGBA() {
        return this._strikeRGBA;
    }

    setStrikeColor(color: Color, focus: boolean = false) {
        if(this._$strikeColor == null || focus) {
            this._strikeRGBA.set(color);
        }
    }

    get underline() {
        return this._underline;
    }

    setUnderline(value: boolean, focus: boolean = false) {
        if(this._$underline == null || focus) {
            this._underline = value;
        }
    }

    get underlineRGBA() {
        return this._underlineRGBA;
    }

    setUnderlineColor(color: Color, focus: boolean = false) {
        if(this._$underlineColor == null || focus) {
            this._underlineRGBA.set(color);
        }
    }

    private setAttributeFromObject(obj: any, prefix?: string, changedFields?: string[]) {
        if(obj == null) {
            return;
        }

        let keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = obj[key];
            if(key == "enables" && Array.isArray(value)) {
                for(let j = 0; j < value.length; j++) {
                    let item = value[j];
                    let attr = StyleMapper[item];
                    if(attr != null) {
                        this[attr.field] = attr.value;
                        if(changedFields != null) {
                            changedFields.push(attr.field);
                        }
                    }else{
                        console.warn("StyleMapper not found: " + item);
                    }
                }
                continue;
            }

            if(value == null) {
                continue;
            }

            if(prefix) {
                key = `${prefix}-${key}`;
            }

            if(typeof value === "object") {
                this.setAttributeFromObject(value, key, changedFields);
                continue;
            }

            let attr = StyleMapper[key];
            if(attr == null) {
                console.warn(`StyleMapper[${key}] is null`);
            }else{
                if(attr.field) {
                    this[attr.field] = value != null ? value : attr.value;
                    if(changedFields != null) {
                        changedFields.push(attr.field);
                    }
                }else if(attr.mapper){
                    let fieldMappler = StyleMapper[attr.mapper];
                    if(fieldMappler) {
                        if(fieldMappler.field) {
                            this[fieldMappler.field] = value != null ? value : attr.value;
                            if(changedFields != null) {
                                changedFields.push(fieldMappler.field);
                            }
                        }
                    }else{
                        console.error("can not find mapper", attr.mapper);
                    }
                }
            }
        }
    }

    parseFromJson(json: object) {       
        let changedFields: string[] = [];
        this.changedFields = changedFields;
        this.setAttributeFromObject(json, null, changedFields);
        this.preset();
    }

    parseFromJsonStr(style: string) {
        let json = JSON.parse(style); 
        let changedFields: string[] = [];
        this.changedFields = changedFields;       
        this.setAttributeFromObject(json, null, changedFields);
        this.preset();
    }
}