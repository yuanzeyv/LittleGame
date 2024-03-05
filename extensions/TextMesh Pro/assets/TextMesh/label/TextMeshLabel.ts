import { assetManager, BufferAsset, Color, EventTouch, game, Graphics, instantiate, isValid, Material, math, MeshRenderData, Node, Prefab, Quat, RenderData, Sprite, SpriteFrame, Texture2D, UIRenderer, UITransform, v2, v4, Vec2, Vec3, _decorator, __private } from "cc";
import { getStringArray } from "../font/FontUtils";
import { TMFont } from "../font/TMFont";
import { TMQuadRenderData, putTMQuadRenderDataToPool } from "../vertex/TMRenderData";
import { vfmtTMVertex } from "../vertex/VertexFormat";
import { ITypeSet, LayoutResult } from "../types/ITypeSet";
import { TypeSetFactory } from "../typeset/TypeSetFactory";
import dfs from "../utils/dfs";
import { TagNode, UBBParser } from "../utils/UBBParser";
import { TextMeshAssembler } from "./TextMeshAssembler";
import { TextStyle } from "./TextStyle";
import { ETextDirection, ETextHorizontalAlign, ETextOverflow, ETextVerticalAlign, Margin } from "./types";
import { CharInfo, getCharInfoFromPool, putCharInfoToPool } from "./CharInfo";
import { StyleMapper } from "./StyleMapper";
import { Slot, Clickable, ESlotType, isSlotType, SlotTypeMap, ESlotSizeType } from "./LayoutTypes";
import { ResManager } from "../utils/ResManger";
import { click_char_event } from "./events";
import { EDITOR } from "cc/env";
import { StyleManager } from "./StyleManager";
import { SlotConnector } from "./SlotConnector";
import { Utils } from "../utils/Utils";
const { ccclass, property, executeInEditMode,executionOrder } = _decorator;

type SlotHandlerType = (comp: TextMeshLabel, slotNode: Node, slot: Slot)=>void;
const vec2_temp = v2();

export enum EDirtyFlag {
    None = 0,
    Text = 1 << 1,
    Style = 1 << 2,
    Layout = 1 << 3,
    Property = 1 << 4,
    All = Text | Style | Layout | Property,
}

const quat = new Quat();

@ccclass("TextMeshLabel")
@executeInEditMode
@executionOrder(1)
export class TextMeshLabel extends UIRenderer {
    static CHAR_CLICK_EVENT = "CHAR_CLICK_EVENT";

    private _slotCreateHandlers: {[slotType: number]:SlotHandlerType} = {};

    @property({serializable: true})
    private _saveTag = 0;

    @property({ type: BufferAsset, visible: false, serializable: true })
    protected _fontData: BufferAsset = null;

    @property({ visible: false, serializable: true })
    protected _string = 'text mesh';

    @property({ visible: false, serializable: true })
    protected _rich = false;

    @property({ visible: false, serializable: true})
    protected _direction = ETextDirection.Horizontal;

    // @property({ visible: false, serializable: true})
    // protected _rtl = false;

    @property({ visible: false, serializable: true})
    protected _horizontalAlign: ETextHorizontalAlign = ETextHorizontalAlign.Center;

    @property({ visible: false, serializable: true})
    protected _verticalAlign: ETextVerticalAlign = ETextVerticalAlign.Middle;

    @property({ visible: false, serializable: true})
    protected _overflow: ETextOverflow = ETextOverflow.None;

    @property({ visible: false, serializable: true})
    protected _multiline = false;

    @property({ visible: false, serializable: true})
    protected _enableItalic = false;

    @property({ visible: false, serializable: true})
    protected _enableUnderline = false;

    @property({ visible: false, serializable: true})
    protected _enableStrike = false;

    @property({ visible: false, serializable: true})
    protected _enableBackground = false;

    @property({ visible: false, serializable: true})
    protected _enableMask = false;

    @property({ visible: false, serializable: true})
    protected _lineSpace = 5;

    @property({ visible: false, serializable: true})
    protected _letterSpace = 0;

    @property({ visible: false, serializable: true})
    protected _enableColorRT = false;

    @property({ visible: false, serializable: true})
    protected _colorRT = new Color(255, 255, 255, 255);

    @property({ visible: false, serializable: true})
    protected _enableColorRB = false;

    @property({ visible: false, serializable: true})
    protected _colorRB = new Color(255, 255, 255, 255);

    @property({ visible: false, serializable: true})
    protected _enableColorLT = false;

    @property({ visible: false, serializable: true})
    protected _colorLT = new Color(255, 255, 255, 255);

    @property({ visible: false, serializable: true})
    protected _enableColorLB = false;

    @property({ visible: false, serializable: true})
    protected _colorLB = new Color(255, 255, 255, 255);
    
    @property({ visible: false, serializable: true})
    protected _backgroundColor = new Color(255, 255, 255, 255);

    @property({ visible: false, serializable: true})
    protected _maskColor = new Color(255, 255, 255, 128);

    @property({visible: false, serializable: true})
    protected _strokeColor = new Color(0, 0, 0, 255);

    @property({ visible: false, serializable: true})
    protected _shadow = 0;

    @property({visible: false, serializable: true})
    protected _shadowOffsetX = 0;

    @property({ visible: false, serializable: true})
    protected _shadowOffsetY = 0;

    @property({ visible: false, serializable: true})
    protected _shadowBlur = 0.1;

    @property({ visible: false, serializable: true})
    protected _shadowColor = new Color(0, 0, 0, 255);
    
    @property({ visible: false, serializable: true})
    protected _handleTouchEvent = false;    

    @property({ visible: false, serializable: true})
    protected _autoWarp = false;   

    @property({ visible: false, serializable: true})
    protected _lineHeight = 40;

    @property({ visible: false, serializable: true})
    protected _fixedLineHeight = true;

    @property({type: Margin, visible: false, serializable: true})
    protected _padding: Margin = new Margin;

    @property({visible: false, serializable: true})
    protected _dilate: number = 0.25;

    @property({visible: false, serializable: true })
    protected _stroke: number = 0.0;
    
    @property({visible: false, serializable: true })
    protected _strokeBlur: number = 0.1;

    @property({visible: false, serializable: true })
    protected _aspect: number = 1;

    @property({visible: false, serializable: true })
    protected _charVisibleRatio = 1;

    @property({visible: false, serializable: true })
    protected _equalWidth = false;

    @property({visible: false, serializable: true })
    protected _overlayTexture: Texture2D = null;

    @property({visible: false, serializable: true })
    protected _enableGlow = false;

    @property({visible: false, serializable: true })
    protected _glowColor = new Color(255, 255, 255, 255);

    @property({visible: false, serializable: true })
    protected _glowInner: number = 0.0;

    @property({visible: false, serializable: true })
    protected _glowOuter: number = 0.0;

    @property({visible: false, serializable: true })
    protected _glowPower: number = 0.0;

    @property({visible: false, serializable: true })
    protected _breakWestern = false;
  
    private _style: TextStyle = new TextStyle();

    private _clicks: Clickable[] = [];

    private _slots: Slot[] = [];

    globalOffsetX = 0;
    globalOffsetY = 0;
    localOffsetX = 0;
    localOffsetY = 0;
    slotOffsetX = 0;
    slotOffsetY = 0;

    private _layoutResult: LayoutResult;
    private _dirtyFlag = EDirtyFlag.None;
    private _uiTransform: UITransform;
    private _ready = false;

    get ready() {
        return this._ready;
    }

    get slots() {
        return this._slots;
    }

    private incrSaveTag() {
        this._saveTag++;
        this._saveTag = this._saveTag % 100000;
    }

    public get style() {
        return this._style;
    }

    get layoutResult() {
        return this._layoutResult;
    }

    private _font: TMFont;
    get font() {
        return this._font;
    }

    @property({ visible: false, serializable: true})
    private _fontSize = 24;
    
    /**
    * @en
    * font size
    *
    * @zh
    * 字体大小。
    */
    @property({ displayOrder: 1, tooltip: ''})
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(val: number) {
        if(this._fontSize != val) {
            this._fontSize = val;

            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    private _underLineInfos: TMQuadRenderData[] = [];
    get underLineInfos() {
        return this._underLineInfos;
    }

    private _strikeInfos: TMQuadRenderData[] = [];
    get strikeInfos() {
        return this._strikeInfos;
    }

    private _backgroundInfos: TMQuadRenderData[] = [];
    get backgroundInfos() {
        return this._backgroundInfos;
    }

    private _maskInfos: TMQuadRenderData[] = [];
    get maskInfos() {
        return this._maskInfos;
    }

    private _charInfos: CharInfo[] = [];
    get charInfos(): CharInfo[] {
        return this._charInfos;
    }

    private _typeSet: ITypeSet;
    get typeSet(): ITypeSet {
        return this._typeSet;
    }

    set font(value) {
        if (this._font === value) {
            return;
        }
        this._font = value;
        this._style.font = value;

        this.addDirtyFlag(EDirtyFlag.All);
    }

    /**
     * @en
     * Content string of label.
     *
     * @zh
     * 标签显示的文本内容。
     */
     @property({ type: BufferAsset, displayOrder: 1, tooltip: ''})
     private get fontData() {
         return this._fontData;
     }

     private set fontData(value: BufferAsset) {
        if (!EDITOR && this._fontData === value)  { 
            return; 
        }

        this._fontData = value;
        if(value != null) {
            TMFont.deserializeAsync(value).then(this._onTMFLoaded.bind(this));
        }else{
            this._font = null;
        }
     }

     @property({type: Node, tooltip: 'i18n:text-mesh.label.slotsContainer'})
     public slotsContainer: Node = null;

    /**
     * @en
     * Content string of label.
     *
     * @zh
     * 标签显示的文本内容。
     */
    @property({ displayOrder: 1, tooltip: '', multiline: true })
    get string() {
        return this._string;
    }
    set string(value) {
        if (value === null || value === undefined) {
            value = '';
        } else {
            value = value.toString();
        }

        if (this._string === value) {
            return;
        }

        this._string = value;

        this.addDirtyFlag(EDirtyFlag.Text | EDirtyFlag.Layout);
    }

    /**
    * @en
    * is rich lable
    *
    * @zh
    * 是否富文本。
    */
    @property({ displayOrder: 2})
    get rich() {
        return this._rich;
    }
    set rich(value) {
        value = !!value;

        if (this._rich === value) {
            return;
        }

        this._rich = value;

        this.addDirtyFlag(EDirtyFlag.Text | EDirtyFlag.Layout);
    }

    @property({displayOrder: 2})
    get multiline() {
        return this._multiline;
    }

    set multiline(value: boolean) {
        if(value != this._multiline) {
            this._multiline = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }   

    @property({displayOrder: 2, min: 0, max:1, step: 0.01, slide: true})
    get dilate() {
        return this._dilate;
    }

    set dilate(value: number) {
        if(value != this._dilate) {
            this._dilate = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }
    } 

    @property({type: Color, displayOrder: 3, override: true})
    get color() {
        return this._color;
    }

    set color(value: Color) {
        value.a = math.clamp(value.a, 1, 255);
        if (this._color.equals(value)) {
            return;
        }
        this._color.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
        
        this._updateColor();
        if (EDITOR) {
            const clone = value.clone();
            this.node.emit(Node.EventType.COLOR_CHANGED, clone);
        }
    }

    @property({displayOrder: 4})
    get enableColorRT() {
        return this._enableColorRT;
    }
    set enableColorRT(value: boolean) {
        if(value != this._enableColorRT) {
            this._enableColorRT = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }   
    }

    @property({visible: function(){return this._enableColorRT}, type: Color, displayOrder: 5})
    get colorRT() {
        return this._colorRT;
    }
    set colorRT(value: Color) {
        if (this._colorRT.equals(value)) {
            return;
        }

        this._colorRT.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }

    @property({displayOrder: 6})
    get enableColorRB() {
        return this._enableColorRB;
    }
    set enableColorRB(value: boolean) {
        if(value != this._enableColorRB) {
            this._enableColorRB = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }
    }

    @property({visible: function(){return this._enableColorRB}, type: Color, displayOrder: 7})
    get colorRB() {
        return this._colorRB;
    }
    set colorRB(value: Color) {
        if (this._colorRB.equals(value)) {
            return;
        }

        this._colorRB.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }

    @property({ displayOrder: 8})
    get enableColorLT() {
        return this._enableColorLT;
    }
    set enableColorLT(value: boolean) {
        if(value != this._enableColorLT) {
            this._enableColorLT = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }
    }

    @property({visible: function(){return this._enableColorLT}, type: Color, displayOrder: 9})
    get colorLT() {
        return this._colorLT;
    }
    set colorLT(value: Color) {
        if (this._colorLT.equals(value)) {
            return;
        }

        this._colorLT.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }

    @property({displayOrder: 10})
    get enableColorLB() {
        return this._enableColorLB;
    }
    set enableColorLB(value: boolean) {
        if(value != this._enableColorLB) {
            this._enableColorLB = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }
    }

    @property({visible: function(){return this._enableColorLB}, type: Color, displayOrder: 11})
    get colorLB() {
        return this._colorLB;
    }
    set colorLB(value: Color) {
        if (this._colorLB.equals(value)) {
            return;
        }

        this._colorLB.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }  

    @property({displayOrder: 12})
    get enableItalic() {
        return this._enableItalic;
    }

    set enableItalic(value: boolean) {
        if(value != this._enableItalic) {
            this._enableItalic = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }  

    @property({displayOrder: 13})
    get enableUnderline() {
        return this._enableUnderline;
    }

    set enableUnderline(value: boolean) {
        if(value != this._enableUnderline) {
            this._enableUnderline = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    } 

    @property({displayOrder: 14})
    get enableStrike() {
        return this._enableStrike;
    }

    set enableStrike(value: boolean) {
        if(value != this._enableStrike) {
            this._enableStrike = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }  

    @property({displayOrder: 15})
    get enableBackground() {
        return this._enableBackground;
    }

    set enableBackground(value: boolean) {
        if(value != this._enableBackground) {
            this._enableBackground = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }  

    @property({visible: function(){return this._enableBackground}, displayOrder: 16})
    get backgroundColor() {
        return this._backgroundColor;
    }

    set backgroundColor(value: Color) {
        if (this._backgroundColor.equals(value)) {
            return;
        }

        this._backgroundColor.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }

    @property({displayOrder: 17})
    get enableMask() {
        return this._enableMask;
    }

    set enableMask(value: boolean) {
        if(value != this._enableMask) {
            this._enableMask = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    } 

    @property({visible: function(){return this._enableMask}, displayOrder: 18})
    get maskColor() {
        return this._maskColor;
    }

    set maskColor(value: Color) {
        if (this._maskColor.equals(value)) {
            return;
        }

        this._maskColor.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }

    @property({displayOrder: 19})
    get autoWarp() {
        return this._autoWarp;
    }

    set autoWarp(value: boolean) {
        if(value != this._autoWarp) {
            this._autoWarp = value;            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({displayOrder: 20})
    get equalWidth() {
        return this._equalWidth;
    }

    set equalWidth(value: boolean) {
        if(value != this._equalWidth) {
            this._equalWidth = value;
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({displayOrder: 21})
    get fixedLineHeight() {
        return this._fixedLineHeight;
    }

    set fixedLineHeight(value: boolean) {
        if(value != this._fixedLineHeight) {
            this._fixedLineHeight = value;            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }    

    @property({visible: function(){return this._fixedLineHeight}, displayOrder: 22})
    get lineHeight() {
        return this._lineHeight;
    }

    set lineHeight(value: number) {
        if(value != this._lineHeight) {
            this._lineHeight = value;            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    // @property({type:ETextDirection, displayOrder: 3})
    // get direction() {
    //     return this._direction;
    // }

    // set direction(value: ETextDirection) {
    //     if(value != this._direction) {
    //         this._direction = value;

    //         this.addDirtyFlag(EDirtyFlag.Layout);
    //     }
    // }

    @property({type:ETextHorizontalAlign, displayOrder: 24})
    get horizontalAlign() {
        return this._horizontalAlign;
    }

    set horizontalAlign(value: ETextHorizontalAlign) {
        if(value != this._horizontalAlign) {
            this._horizontalAlign = value;

            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({type:ETextVerticalAlign, displayOrder: 25})
    get verticalAlign() {
        return this._verticalAlign;
    }

    set verticalAlign(value: ETextVerticalAlign) {
        if(value != this._verticalAlign) {
            this._verticalAlign = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    // @property({ displayOrder: 6})
    // get RTL() {
    //     return this._rtl;
    // }

    // set RTL(value: boolean) {
    //     if(value != this._rtl) {
    //         this._rtl = value;
    //     }
    // }

    @property({type:ETextOverflow, displayOrder: 26})
    get overflow() {
        return this._overflow;
    }

    set overflow(value: ETextOverflow) {
        if(value != this._overflow) {
            this._overflow = value;

            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({displayOrder: 27})
    get lineSpace() {
        return this._lineSpace;
    }

    set lineSpace(value: number) {
        if(value != this._lineSpace) {
            this._lineSpace = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({displayOrder: 28})
    get letterSpace() {
        return this._letterSpace;
    }

    set letterSpace(value: number) {
        if(value != this._letterSpace) {
            this._letterSpace = value;
            
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }   

    @property({displayOrder: 29})
    get padding() {
        return this._padding;
    }

    set padding(value: Margin) {
        if(value != this._padding) {
            this._padding = value;
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }    

    @property({displayOrder: 30, min: 0, max:1, step: 0.001, slide: true})
    get stroke() {
        return this._stroke;
    }

    set stroke(value: number) {
        if(value != this._stroke) {
            this._stroke = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }
    }

    @property({visible: function(){return this._stroke > 0}, displayOrder: 31, min: 0, max:1, step: 0.001, slide: true})   
    get strokeBlur() {
        return this._strokeBlur;
    }

    set strokeBlur(value: number) {
        if(value != this._strokeBlur) {
            this._strokeBlur = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }
    }

    @property({visible: function(){return this._stroke > 0}, type: Color, displayOrder: 32})
    get strokeColor() {
        return this._strokeColor;
    }
    set strokeColor(value: Color) {
        if (this._strokeColor.equals(value)) {
            return;
        }

        this._strokeColor.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }

    @property({displayOrder: 33, min: 0, max:1, step: 0.001, slide: true})
    get shadow() {
        return this._shadow;
    }
    set shadow(value: number) {
        if(value != this._shadow) {
            this._shadow = value;
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({visible: function(){return this._shadow > 0}, displayOrder: 34, min: 0, max:1, step: 0.001, slide: true})   
    get shadowBlur() {
        return this._shadowBlur;
    }

    set shadowBlur(value: number) {
        if(value != this._shadowBlur) {
            this._shadowBlur = value;
            this.addDirtyFlag(EDirtyFlag.Style);
        }
    }

    @property({visible: function(){return this._shadow > 0}, displayOrder: 35, min: -100, max:100, step: 0.1, slide: true})
    get shadowOffsetX() {
        return this._shadowOffsetX;
    }
    set shadowOffsetX(value: number) {
        if(value != this._shadowOffsetX) {
            this._shadowOffsetX = value;
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({visible: function(){return this._shadow > 0}, displayOrder: 36, min: -100, max:100, step: 0.1, slide: true})
    get shadowOffsetY() {
        return this._shadowOffsetY;
    }
    set shadowOffsetY(value: number) {
        if(value != this._shadowOffsetY) {
            this._shadowOffsetY = value;
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({visible: function(){return this._shadow > 0}, type: Color, displayOrder: 37})
    get shadowColor() {
        return this._shadowColor;
    }

    set shadowColor(value: Color) {
        if (this._shadowColor.equals(value)) {
            return;
        }

        this._shadowColor.set(value);
        this.addDirtyFlag(EDirtyFlag.Style);
    }

    @property({displayOrder: 38, min: 0, max:3, step: 0.01, slide: true})
    get aspect() {
        return this._aspect;
    }

    set aspect(value: number) {
        if(value != this._aspect) {
            this._aspect = value;
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    @property({displayOrder: 39, min: 0, max:1, step: 0.01, slide: true})
    get charVisibleRatio() {
        return this._charVisibleRatio;
    }
    set charVisibleRatio(value: number) {
        if(this._charVisibleRatio != value) {
            this._charVisibleRatio = math.clamp01(value);

            let showIndex = this._charInfos.length * this._charVisibleRatio;
            for(let i = 0; i < this._charInfos.length; i++) {
                let charInfo = this._charInfos[i];
                let visible = i < showIndex;
                if(charInfo.slot) {
                    charInfo.slot.node.active = visible;
                }
                charInfo.visible = visible;
            }
        }
    }

    @property({type: Texture2D, displayOrder: 40})
    get overlayTexture() {
        return this._overlayTexture;
    }

    set overlayTexture(value: Texture2D) {
        if(value != this._overlayTexture) {
            this._overlayTexture = value;
            this.addDirtyFlag(EDirtyFlag.Property);
        }
    }

    @property({displayOrder: 41})
    get enableGlow() {
        return this._enableGlow;
    }

    set enableGlow(value: boolean) {
        if(value != this._enableGlow) {
            this._enableGlow = value;
            this.addDirtyFlag(EDirtyFlag.Property);
        }
    }   

    @property({visible: function(){return this._enableGlow}, displayOrder: 42})
    get glowColor() {
        return this._glowColor;
    }

    set glowColor(value: Color) {
        if(this._glowColor.equals(value)) {
            return;
        }

        this._glowColor.set(value);
        this.addDirtyFlag(EDirtyFlag.Property);
    }

    @property({visible: function(){return this._enableGlow}, displayOrder: 43, min: 0, max:1, step: 0.01, slide: true})
    get glowInner() {
        return this._glowInner;
    }

    set glowInner(value: number) {
        if(value != this._glowInner) {
            this._glowInner = value;
            this.addDirtyFlag(EDirtyFlag.Property);
        }
    }

    @property({visible: function(){return this._enableGlow}, displayOrder: 44, min: 0, max:1, step: 0.01, slide: true})
    get glowOuter() {
        return this._glowOuter;
    }

    set glowOuter(value: number) {
        if(value != this._glowOuter) {
            this._glowOuter = value;
            this.addDirtyFlag(EDirtyFlag.Property);
        }
    }

    @property({visible: function(){return this._enableGlow}, displayOrder: 45, min: 0, max:10, step: 0.01, slide: true})
    get glowPower() {
        return this._glowPower;
    }

    set glowPower(value: number) {
        if(value != this._glowPower) {
            this._glowPower = value;
            this.addDirtyFlag(EDirtyFlag.Property);
        }
    }

    @property({visible: true})
    get breakWestern() {
        return this._breakWestern;
    }

    set breakWestern(value: boolean) {
        if(value != this._breakWestern) {
            this._breakWestern = value;
            this.addDirtyFlag(EDirtyFlag.Layout);
        }
    }

    get handleTouchEvent () {
        return this._handleTouchEvent;
    }

    set handleTouchEvent (value) {
        if (this._handleTouchEvent === value) {
            return;
        }

        this._handleTouchEvent = value;
        if (this.enabledInHierarchy) {
            if (this.handleTouchEvent) {
                this._addEventListeners();
            } else {
                this._removeEventListeners();
            }
        }
    }

    get uiTransform() {
        return this._uiTransform;
    }

    get renderEntity() {
        return this._renderEntity;
    }

    onLoad() {
        this._uiTransform = this.node.getComponent(UITransform);

        this.node.on(Node.EventType.LAYER_CHANGED, this._applyLayer, this);
        this.node.on(Node.EventType.ANCHOR_CHANGED, this._onAnchorChanged, this);
        this.node.on(Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
        game.on(StyleManager.TMF_STYLE_CHANGED, this._onTMFStyleChanged, this);     

        this._style.preset();
        this._typeSet = TypeSetFactory.get("horizontal");
        if(this._fontData) {
            TMFont.deserializeAsync(this._fontData).then(this._onTMFLoaded.bind(this));
        }

        this._padding.onChanged = (()=>{
            this.addDirtyFlag(EDirtyFlag.Layout);
        }).bind(this);

        this.clearEditorSlots();
    }

    private clearEditorSlots() {
        var children = [...this.node.children];
        children.forEach((child)=>{
            if(child.name.startsWith("slot_(")) {
                child.removeFromParent();
                child.destroy();
            }
        });

        if(this.slotsContainer) {
            children = [...this.slotsContainer.children];
            children.forEach((child)=>{
                if(child.name.startsWith("slot_(")) {
                    let conn = child.getComponent(SlotConnector);
                    if(!conn || conn.labelNode == this.node) {
                        child.removeFromParent();
                        child.destroy();
                    }
                }
            });
        }
    }

    private _onTMFLoaded(font: TMFont) {
        this._font = font;
        this._style.font = font;
        this.addDirtyFlag(EDirtyFlag.All);
    }

    private _updateStyle(style: TextStyle) {
        style.setFontSize(this._fontSize);
        style.setFillColor(this._color);
        style.setDilate(this._dilate);        
        style.setStroke(this._stroke);
        style.setStrokeBlur(this._strokeBlur);
        style.setStrokeColor(this._strokeColor);
        style.setShadow(this._shadow);
        style.setShadowBlur(this._shadowBlur);
        style.setShadowColor(this._shadowColor);
        style.setShadowOffsetX(this._shadowOffsetX);
        style.setShadowOffsetY(this._shadowOffsetY);
        style.setUnderline(this._enableUnderline);
        style.setBackground(this._enableBackground);
        style.setBackgroundColor(this._backgroundColor);
        style.setMask(this._enableMask);
        style.setMaskColor(this._maskColor);
        style.setItalic(this._enableItalic);
        style.setStrike(this._enableStrike);
        if(this._enableColorLB) {
            style.setColorLB(this._colorLB);
        }else{
            style.enableColorLB = false;
        }
        if(this._enableColorLT) {
            style.setColorLT(this._colorLT);
        }else{
            style.enableColorLT = false;
        }
        if(this._enableColorRT) {
            style.setColorRT(this._colorRT);
        }else{
            style.enableColorRT = false;
        }
        if(this._enableColorRB) {
            style.setColorRB(this._colorRB);
        }else{
            style.enableColorRB = false;
        }

        style.calculate();
    }

    private _updateAllStyles(needResetChar?: boolean) {
        let style = this._style;
        this._updateStyle(style);

        for(let i=0;i<this._backgroundInfos.length;i++) {
            let info = this._backgroundInfos[i];
            let infoStyle = info.charInfo.style;
            if(infoStyle != style) {
                infoStyle.setBackground(this._enableBackground);
                infoStyle.setBackgroundColor(this._backgroundColor);
                infoStyle.setColorLB(this._backgroundColor);
                infoStyle.setColorLT(this._backgroundColor);
                infoStyle.setColorRT(this._backgroundColor);
                infoStyle.setColorRB(this._backgroundColor);
            }
        }

        for(let i=0;i<this._charInfos.length;i++) {
            let charInfo = this._charInfos[i];
            if(style != charInfo.style) {
                this._updateStyle(charInfo.style);
                style = charInfo.style;
            }
        }

        for(let i=0;i<this._maskInfos.length;i++) {
            let info = this._maskInfos[i];            
            let infoStyle = info.charInfo.style;
            if(infoStyle.style != style) {
                infoStyle.setMask(this._enableMask);
                infoStyle.setMaskColor(this._maskColor);
                infoStyle.setColorLB(this._maskColor);
                infoStyle.setColorLT(this._maskColor);
                infoStyle.setColorRT(this._maskColor);
                infoStyle.setColorRB(this._maskColor);
            }
        }

        // if(needResetChar) {
        //     for(let i=0;i<this._charInfos.length;i++) {
        //         let charInfo = this._charInfos[i];
        //         charInfo.reset();
        //     }
        // }

        let assembler = this._assembler;
        assembler.updateColors(this);
        assembler.updateOthers(this);
    }

    onEnable() {
        super.onEnable();

        if (this.handleTouchEvent) {
            this._addEventListeners();
        }

        // Utils.until(()=>this.customMaterial!=null).then(()=>{
        //     this.addDirtyFlag(EDirtyFlag.All);
        // });       
    }

    onDisable() {
        super.onDisable();

        if (this.handleTouchEvent) {
            this._removeEventListeners();
        }
    }

    onDestroy() {      
        super.onDestroy();

        this.node.off(Node.EventType.LAYER_CHANGED, this._applyLayer, this);
        this.node.off(Node.EventType.ANCHOR_CHANGED, this._onAnchorChanged, this);
        this.node.off(Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
        game.off(StyleManager.TMF_STYLE_CHANGED, this._onTMFStyleChanged, this);

        this._clearSlots();
    }

    private _addEventListeners() {
        this.node.on('touch-end', this._onTouchEnded, this);

        if(EDITOR) {
            //@ts-ignore
            Editor.Message.addBroadcastListener("textmesh:tmf-refresh", this._onEditorTMFChanged.bind(this));
        }
    }

    private _removeEventListeners() {
        this.node.off('touch-end', this._onTouchEnded, this);
        if(EDITOR) {
            //@ts-ignore
            Editor.Message.removeBroadcastListener("textmesh:tmf-refresh", this._onEditorTMFChanged.bind(this));
        }
    }

    private _onEditorTMFChanged(uuid: string, model: any) {
        if(this._font && this._font.uid == uuid) {
            this.incrSaveTag();

            let data = JSON.parse(model);
            let font = this._font;
            //@ts-ignore
            font._underLineOffset = data.underLineOffset || 0;
            //@ts-ignore
            font._keepUnlderLineSpace = data.keepUnlderLineSpace || false;
            //@ts-ignore
            font._underLineThickness = data.underLineThickness || 0;
            //@ts-ignore
            font._strikeOffset = data.strikeOffset || 0;
            //@ts-ignore
            font._strikeThickness = data.strikeThickness || 0;
            //@ts-ignore
            font._scriptThickness = data.scriptThickness || 0;

            this.addDirtyFlag(EDirtyFlag.All);
        }
    }

    protected _onTouchEnded (event: EventTouch) {
        let pos = event.getLocation(vec2_temp);
        let info = this._typeSet.hitTest(this, pos);
        if(info?.result) {
            click_char_event.accurate = info.accurate;
            click_char_event.charInfo = info.charInfo;
            this.node.emit(TextMeshLabel.CHAR_CLICK_EVENT, click_char_event, event);
        }
        // event.propagationStopped = true;
    }

    private _setLayer(node:Node, layer: number) {
        if(node) {
            node.layer = layer;
            for(let i=0;i<node.children.length;i++) {
                this._setLayer(node.children[i], layer);
            }
        }
    }

    protected _applyLayer () {
        for (const slot of this._slots) {
            this._setLayer(slot.node, this.node.layer);
        }
    }

    protected _onAnchorChanged() {
        this.addDirtyFlag(EDirtyFlag.Layout);
    }

    protected _onSizeChanged() {
        this.addDirtyFlag(EDirtyFlag.Layout);
    }

    private _onTMFStyleChanged() {
        this.addDirtyFlag(EDirtyFlag.Layout);
    }

    protected _render (render: __private._cocos_2d_renderer_i_batcher__IBatcher) {
        //@ts-ignore
        render.commitComp(this, this.renderData, this._font?.fontData.texture, this._assembler!, null);
    }

    public requestRenderData(drawInfoType = 0) {
        const data: any = RenderData.add(vfmtTMVertex);
        if(data.requestRenderData) {
            data.initRenderDrawInfo(this, drawInfoType);
        }
        this._renderData = data;
        return data;
    }

    getRenderElementCount() {
        return this._backgroundInfos.length + 
               this._underLineInfos.length + 
               this._charInfos.length + 
               this._strikeInfos.length + 
               this._maskInfos.length;
    }

    getRenderElement(index: number) {
        if(index < this._backgroundInfos.length) {
            return this._backgroundInfos[index].charInfo;
        }
        index -= this._backgroundInfos.length;
        if(index < this._underLineInfos.length) {
            return this._underLineInfos[index].charInfo;
        }
        index -= this._underLineInfos.length;
        if(index < this._charInfos.length) {
            return this._charInfos[index];
        }
        index -= this._charInfos.length;
        if(index < this._strikeInfos.length) {
            return this._strikeInfos[index].charInfo;
        }
        index -= this._strikeInfos.length;
        if(index < this._maskInfos.length) {
            return this._maskInfos[index].charInfo;
        }
    }

    protected _flushAssembler () {
        const assembler = TextMeshAssembler;

        if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
        }

        if (!this._renderData) {
            if (this._assembler && this._assembler.createData) {
                this._renderData = this._assembler.createData(this);
                
                this._renderData!.material = this.sharedMaterial;
            }
        }
    }

    /**
     * 修复合批问题
     * @param index 
     * @returns 
     */
    public getRenderMaterial (index: number): Material | null {
        if(!this.renderData) {
            return null;
        }

        return this.renderData.material || this._materialInstances[index] || this._materials[index];
    }

    markForUpdateRenderData(enable: boolean = true) {
        super.markForUpdateRenderData(enable);
    }

    updateRenderData(force = false) {
        if (force || !this._renderData) {
            this._flushAssembler();
            this._applyFontTexture();            
        
            if (this.renderData) { 
                this.renderData.vertDirty = true; 
            }
        }
        
        if (this._assembler) {
            this._assembler.updateRenderData(this);
        }
    }

    setSlotCreateHandler(type: ESlotType, handler: SlotHandlerType) {
        this._slotCreateHandlers[type] = handler;
    }

    makeDirty(dirtyFlag: EDirtyFlag) {
        this.dirtyFlag |= dirtyFlag;
    }

    private _updateOverlayTexture(material: Material){
        if(!material) {
            return false;
        }

        let useOverlayTexture = this._overlayTexture != null;

        let pass = material.passes[0];
        if(pass.defines.USE_OVERLAY_TEXTURE != undefined && pass.defines.USE_OVERLAY_TEXTURE != useOverlayTexture || 
            pass.defines.USE_OVERLAY_TEXTURE == undefined && useOverlayTexture) {

            material.recompileShaders({
                "USE_OVERLAY_TEXTURE": useOverlayTexture
            });

            if(useOverlayTexture) {
                material.setProperty("overlayTexture", this._overlayTexture);
            }
        }

        return useOverlayTexture;
    }

    private _updateGlow(material: Material) {
        if(!material) {
            return false;
        }

        let pass = material.passes[0];
        if(pass.defines.USE_GLOW != undefined && pass.defines.USE_GLOW != this._enableGlow ||
            pass.defines.USE_GLOW == undefined && this._enableGlow) {

            material.recompileShaders({
                "USE_GLOW": this._enableGlow
            });

            if(this._enableGlow) {
                material.setProperty("glowColor", this._glowColor);
                material.setProperty("glowInner", this._glowInner);
                material.setProperty("glowOuter", this._glowOuter);
                material.setProperty("glowPower", this._glowPower);
            }
        }

        return this._enableGlow;
    }

    private _updateMaterialProperties(material: Material) {       
        let changed = false;

        changed = this._updateOverlayTexture(material) || changed;
        changed = this._updateGlow(material) || changed;

        return changed;
    }

    updateMaterial(): void {
        //@ts-ignore
        super.updateMaterial();
        if (!this._customMaterial) {
            return;
        }

        let material = this.getMaterialInstance(0);
        if(this._updateMaterialProperties(material)) {
            if(this._renderData) {
                this._renderData.material = material;
                this.setMaterialInstance(material, 0);
            }

            this.markForUpdateRenderData();
        }else{
            if(this._renderData) {
                this._renderData.material = this.sharedMaterial;
            }
        }
    }

    // protected _onMaterialModified(index: number, material: Material | null): void {
    //     super._onMaterialModified(index, material);

    //     this.updateMaterial();
    // }

    private _applyFontTexture() {

    }   
    
    private _updateLayout() {                
        let layout = this.typeSet.layout(this);
        this._layoutResult = layout;
    }

    private _updateText() {   
        if(this._font == null) {
            console.warn("font is null");
            return;
        }

        this._clearSlots();   
        this._freeCharInfos();

        if(this._rich) {
            this._parseRich(this._string);
        }else{
            this._parse(this._string);
        }
    }

    _clearAdditions() {
        for(let i=0;i<this._underLineInfos.length;i++) {
            putTMQuadRenderDataToPool(this._underLineInfos[i]);
        }
        this._underLineInfos.length = 0;

        for(let i=0;i<this._strikeInfos.length;i++) {
            putTMQuadRenderDataToPool(this._strikeInfos[i]);
        }
        this._strikeInfos.length = 0;

        for(let i=0;i<this._backgroundInfos.length;i++) {
            putTMQuadRenderDataToPool(this._backgroundInfos[i]);
        }
        this._backgroundInfos.length = 0;

        for(let i=0;i<this._maskInfos.length;i++) {
            putTMQuadRenderDataToPool(this._maskInfos[i]);
        }
        this._maskInfos.length = 0;
    }

    private _freeCharInfos() {
        for(let i=0;i<this._charInfos.length;i++) {
            putCharInfoToPool(this._charInfos[i]);
        }
        this._charInfos.length = 0;
        
        this._clearAdditions();
    }

    private _clearSlots() {
        for(let i=0;i<this._slots.length;i++) {
            let slot = this._slots[i];
            if(slot.node) {
                slot.node.destroy();
            }
        }
        this._slots.length = 0;
    }

    private _parse(text: string) {
        if(this._font == null) {
            return;
        }

        this._updateStyle(this._style);
        let end = text.length;

        for (let i = 0; i < end; i++) {
            var vertexInfo = getCharInfoFromPool();
            vertexInfo.index = this._charInfos.length;
            vertexInfo.click = null;
            vertexInfo.slot = null;
            vertexInfo.cjk = null;
            vertexInfo.style = this.style;
            vertexInfo.char = this.font.getCharInfo(text[i]);
            vertexInfo.font = this.font;
            // vertexInfo.reset();
            this._charInfos.push(vertexInfo);
        }
    }

    private _parseSlot(charIndex: number, node: TagNode, type: ESlotType, fontSize: number) {
        let slot = new Slot();
        slot.index = charIndex;
        let keys = Object.keys(slot);
        for(let i=0;i<keys.length;i++) {
            let key = keys[i];
            if(node.attributes[key] !== undefined) {
                slot[key] = node.attributes[key];
            }
        }
        slot.type = type;   

        this._createSlot(slot, fontSize);
        return slot;
    }

    /**
     * slot 格式：[包名|resources目录无需包名][://资源路径|资源路径]
     * @param slot 
     * @param fontSize 
     * @returns 
     */
    private async _createSlot(slot: Slot, fontSize: number) {
        let node = new Node();
        node.layer = this.node.layer;        
        node.name = `slot_(${this.node.name}_${slot.type}_${slot.name})`;
        slot.node = node; 
        
        if(this.slotsContainer) {
            this.slotsContainer.addChild(node);
            var conn = node.addComponent(SlotConnector);
            conn.labelNode = this.node;
            this.slotOffsetX = this.node.worldPosition.x - node.worldPosition.x;
            this.slotOffsetY = this.node.worldPosition.y - node.worldPosition.y;
        }else{
            this.node.addChild(node);
            this.slotOffsetX = 0;
            this.slotOffsetY = 0;
        }

        let urt = node.addComponent(UITransform);
        urt.anchorPoint.set(0, 0);

        let hasW = slot.width != null;
        let hasH = slot.height != null;
        slot.width = hasW ? slot.width : fontSize;
        slot.height = hasH ? slot.height : fontSize;

        if(EDITOR) {
            if(slot.sizeType == ESlotSizeType.None) {
                urt.width = hasW ? slot.width : urt.width;
                urt.height = hasH ? slot.height : urt.height;
            }else if(slot.sizeType == ESlotSizeType.WidthFirst) {
                var aspect = urt.height / urt.width;
                urt.width = hasW ? slot.width : fontSize;
                urt.height = hasH ? slot.height : urt.width * aspect;
            }else {
                var aspect = urt.width / urt.height;
                urt.height = hasH ? slot.height : fontSize;
                urt.width = hasW ? slot.width : urt.height * aspect;
            }

            let g = node.addComponent(Graphics);
            g.color = Color.WHITE;
            g.fillRect(0, 0, urt.width, urt.height);
            return;      
        }
        
        if(slot.src){
            let strs = slot.src.split(':');
            let abName = null;
            let path = "";
            if(strs.length == 1) {
                path = strs[0];
            }else{
                abName = strs[0];
                path = strs[1];
            }

            if(slot.type == ESlotType.Image) {
                if(this._slotCreateHandlers[ESlotType.Image]) {
                    this._slotCreateHandlers[ESlotType.Image](this, node, slot);
                }else{
                    if(!EDITOR) {
                        let sp = await ResManager.getAsync(abName, path + "/spriteFrame", SpriteFrame);
                        if(sp && isValid(node)) {
                            let spNode = new Node();
                            spNode.name = "sprite";
                            spNode.layer = node.layer;
                            node.addChild(spNode);

                            let spUrt = spNode.addComponent(UITransform);
                            spUrt.setAnchorPoint(0, 0);

                            let sprite = spNode.addComponent(Sprite);
                            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
                            sprite.type = Sprite.Type.SIMPLE;
                            sprite.spriteFrame = sp;  

                            if(slot.sizeType == ESlotSizeType.WidthFirst) {
                                var scale = slot.width / spUrt.width;
                                spNode.setScale(scale, scale);
                            }else if(slot.sizeType == ESlotSizeType.HeightFirst) {
                                var scale = slot.height / spUrt.height;
                                spNode.setScale(scale, scale);
                            }                        
                        }
                    }
                }
            }else if(slot.type == ESlotType.Prefab){
                if(this._slotCreateHandlers[ESlotType.Prefab]) {
                    this._slotCreateHandlers[ESlotType.Prefab](this, node, slot);
                }else{
                    if(!EDITOR) {
                        let prefab = await ResManager.getAsync(abName, path, Prefab);
                        // 防止还未创建就被删除的情况
                        if(prefab && isValid(node)) {
                            let inst = instantiate(prefab) as Node;
                            node.addChild(inst);
                            let pTR = inst.getComponent(UITransform);
                            if(pTR == null){
                                pTR = inst.addComponent(UITransform);
                            }

                            pTR.setAnchorPoint(0, 0);    
                            if(slot.sizeType == ESlotSizeType.WidthFirst) {
                                var scale = slot.width / pTR.width;
                                inst.setScale(scale, scale);
                            }else if(slot.sizeType == ESlotSizeType.HeightFirst) {
                                var scale = slot.height / pTR.height;
                                inst.setScale(scale, scale);
                            } 

                            let rt = inst.getComponent(UITransform);
                            if(rt) {
                                rt.width = pTR.width;
                                rt.height = pTR.height;
                            }
                        }
                    }
                }
            }else{
                if(this._slotCreateHandlers[ESlotType.Custom]) {
                    this._slotCreateHandlers[ESlotType.Custom](this, node, slot);
                }
            }
        }   
    }

    private _parseClick(node: TagNode) {
        let clickable = new Clickable;
        if(node.attributes) {
            clickable.name = node.attributes["name"] as string;
            clickable.value = node.attributes["value"] as string;
        }
        return clickable;
    }

    private _parseRich(text: string) {
        this._updateStyle(this._style);

        this._clicks.length = 0;

        let ast = UBBParser.inst.parse(text);
        let lastDepth = 0;
        let currentStyle = this._style;
        let prevStyle = this._style;
        const styleStack = [currentStyle];
        let nodeStack:TagNode[] = [];
        let clickStack: Clickable[] = [];
        const tagMap = StyleMapper['tagMap'] || {};
        for (const [node, depth] of dfs(ast)) {
            if (depth < lastDepth) {
                for (let i = lastDepth - depth; i >= 0; i--) {
                    currentStyle = styleStack.pop()|| this._style;
                    prevStyle = currentStyle;
                }
                let pnode = nodeStack.pop();
                if(pnode?.name == "click") {
                    clickStack.pop();
                }
            }else if(depth == lastDepth){
                currentStyle = prevStyle;
                nodeStack.push(node);
            }

            let tagNode = node as TagNode;

            if(tagNode.type != 'text') {
                if(depth > lastDepth) {
                    styleStack.push(currentStyle);
                }
                
                prevStyle = currentStyle;
                currentStyle = currentStyle.clone();
                if(isSlotType(node.name)) {
                    let slot = this._parseSlot(this._charInfos.length, node, SlotTypeMap[node.name], currentStyle.fontSize);
                    this._slots.push(slot);
                    this._addCharInfo('', currentStyle, clickStack.length > 0, this._slots[this._slots.length - 1]);
                }else if(node.name == "click") {
                    let clickable = this._parseClick(node);
                    this._clicks.push(clickable);
                    clickStack.push(clickable);
                }else{
                    const mapper = StyleMapper[node.name];
                    if(mapper) {
                        if(mapper.field) {
                            if(node.value != null) {
                                currentStyle[mapper.field] = node.value;
                            }else{
                                currentStyle[mapper.field] = mapper.value;
                            }
                        }

                        if(node.attributes && mapper.attributes) {
                            let keys = Object.keys(node.attributes);
                            for(let i=0;i<keys.length;i++) {
                                let key = keys[i];
                                let attr = mapper.attributes[key];
                                if(attr) {
                                    if(attr.field) {
                                        currentStyle[attr.field] = node.attributes[key];
                                    }else if(attr.mapper){
                                        let fieldMappler = StyleMapper[attr.mapper];
                                        if(fieldMappler) {
                                            if(fieldMappler.field) {
                                                currentStyle[fieldMappler.field] = node.attributes[key];
                                            }
                                        }else{
                                            console.error("can not find mapper", attr.mapper);
                                        }
                                    }
                                }
                            }
                        }
                    }else if(tagNode.name == "style"){
                        let styleStr = tagNode.value as string;
                        let styles = styleStr.split(/[ ;,]/gi);
                        for(let i=0;i<styles.length;i++) {
                            if(!styles[i]) {
                                continue;
                            }

                            let style = StyleManager.getStyle(styles[i]);
                            if(style) {
                                currentStyle.copyFrom(style);
                            }else{
                                console.error("can not find style named ", styles[i]);
                            }
                        }
                    }else if(tagMap[tagNode.name]) {
                        this._addCharInfo(tagMap[tagNode.name], currentStyle, clickStack.length > 0);
                    }else{
                        let field = `_$${node.name}`;
                        if (Object.keys(currentStyle).indexOf(field) >= 0) {
                            if(typeof currentStyle[field] == "boolean") {
                                currentStyle[field] = true;
                            }else{
                                currentStyle[field] = (node.value === undefined) ? true : node.value;
                            }
                        }
                    }
                }

                if(currentStyle != this._style) {
                    currentStyle.preset();
                }
            }

            if (tagNode.text) {                
                const content = tagNode.text;
                let chars = getStringArray(content);
                let end = chars.length;

                for (let i = 0; i < end; i++) {
                    this._addCharInfo(chars[i], currentStyle, clickStack.length > 0);
                }
            }

            lastDepth = depth;
        }
    }

    private _addCharInfo(char: string, style: TextStyle, inClick: boolean, slot?: Slot) {
        var vertexInfo = getCharInfoFromPool();
        vertexInfo.index = this._charInfos.length;
        vertexInfo.style = style;
        vertexInfo.char = this.font.getCharInfo(char);
        vertexInfo.font = this.font;   
        vertexInfo.click = inClick ? this._clicks[this._clicks.length - 1] : null;
        vertexInfo.slot = slot;              
        // vertexInfo.reset();
        this._charInfos.push(vertexInfo);
    }

    lateUpdate(dt: number): void {
        if (!this.enabledInHierarchy || !this._font) {
            return;
        }

        if(this.dirtyFlag != EDirtyFlag.None) {
            this._ready = false;

            // console.log("update text", this.dirtyFlag);

            if(this.dirtyFlag == EDirtyFlag.Style) {
                this._updateAllStyles();
                // console.log("update all styles");
            } else if(this.dirtyFlag == EDirtyFlag.Property) {
                this.updateMaterial();
                // console.log("update material");
            } else{                
                this._updateText();
                this._updateLayout();
                this.destroyRenderData();
                this.updateRenderData();
                // console.log("update text", this.charInfos.length);
                
                this.markForUpdateRenderData();
            }

            this.dirtyFlag = EDirtyFlag.None;
            this._ready = true;
        }
    }

    get dirtyFlag(): EDirtyFlag {
        return this._dirtyFlag;
    }

    set dirtyFlag(value: EDirtyFlag) {
        if(this.dirtyFlag != value) {
            this._dirtyFlag = value;
        }
    }

    addDirtyFlag(flag: EDirtyFlag) {
        this.dirtyFlag |= flag;
    }

    clearDirtyFlag() {
        this.dirtyFlag = EDirtyFlag.None;
    }
    
    /**
     * 获取文本内容
     * @param index 
     * @returns 
     */
    getCharInfo(index: number) {
        if(index >= 0 && index < this._charInfos.length) {
            return this._charInfos[index];
        }

        console.error("index out of range", index);
        return null;
    }

    /**
     * 
     * @param charInfo 
     * @param colors 设置统一颜色，或者设置单个顶点
     * @returns 
     */
    setCharColor(charInfo: CharInfo, colors?: Color | Color[]) {
        if(!charInfo) {
            return;
        }
        
        TextMeshAssembler.updateColor(this, charInfo, colors);
    }

    /**
     * 设置文本偏移、旋转、缩放
     * @param charInfo 
     * @param dx x偏移
     * @param dy y偏移
     * @param rotation 旋转角度，弧度
     * @param scale 缩放值
     * @returns 
     */
    setCharTransform(charInfo: CharInfo, dx: number, dy: number, rotation: number, scale: number) {
        if(!charInfo) {
            return;
        }

        if(charInfo.slot) {
            let node = charInfo.slot.node;
            node.setScale(scale, scale, scale);    

            let urt = node._uiProps.uiTransformComp;
            let hx =  urt.width * (0.5 - urt.anchorX);
            let hy =  urt.height * (0.5 - urt.anchorY);
            node.setPosition(charInfo.x + this.globalOffsetX, 
                            charInfo.y + this.globalOffsetY, 
                            0);        

            Quat.fromEuler(quat, 0, 0, rotation * 180 / Math.PI);
            node.setRotation(quat);

            let pos = new Vec3(urt.width*urt.anchorX, urt.height*urt.anchorY, 0);
            let center = new Vec3(hx, hy, 0);
            Vec3.rotateZ(pos, pos, center, rotation);
            node.setPosition(node.position.x + pos.x, node.position.y + pos.y, 0);
            return;
        }else if(charInfo.vertexData.length == 0){
            return;
        }
        
        let center = new Vec3();
        let vs = charInfo.vertexData;
        center.x = (vs[0].x + vs[1].x + vs[2].x + vs[3].x) / 4;
        center.y = (vs[0].y + vs[1].y + vs[2].y + vs[3].y) / 4;

        for (let j = 0; j < 4; j++) {
            let pos: Vec3 = new Vec3();
            Vec3.subtract(pos, vs[j], center);
            pos.multiplyScalar(scale);
            Vec3.add(pos, center, pos);
            if(rotation != 0) {
                Vec3.rotateZ(pos, pos, center, rotation);
            }

            vs[j].rx = pos.x + dx;
            vs[j].ry = pos.y + dy;
        }
    }

    setCustomMaterialByUUID(uuid: string) {
        if(uuid) {
            assetManager.loadAny({uuid: uuid}, (err, asset) => {
                if(err) {
                    console.error(err);
                    return;
                }

                this.customMaterial = asset;
            });
        }
    }

    setFontByUUID(uuid: string) {
        if(uuid) {
            assetManager.loadAny({uuid: uuid}, (err, asset) => {
                if(err) {
                    console.error(err);
                    return;
                }

                this.fontData = asset;
            });
        }
    }

    protected _canRender () {
        if (!super._canRender() || !this._string || !this._font) {
            return false;
        }

        return true;
    }
}