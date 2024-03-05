/// <reference types="../../../temp/declarations/cc" />
import { BufferAsset, Color, EventTouch, Material, Node, Texture2D, UIRenderer, UITransform, __private } from "cc";
import { TMFont } from "../font/TMFont";
import { TMQuadRenderData } from "../vertex/TMRenderData";
import { ITypeSet, LayoutResult } from "../types/ITypeSet";
import { TextStyle } from "./TextStyle";
import { ETextDirection, ETextHorizontalAlign, ETextOverflow, ETextVerticalAlign, Margin } from "./types";
import { CharInfo } from "./CharInfo";
import { Slot, ESlotType } from "./LayoutTypes";
declare type SlotHandlerType = (comp: TextMeshLabel, slotNode: Node, slot: Slot) => void;
export declare enum EDirtyFlag {
    None = 0,
    Text = 2,
    Style = 4,
    Layout = 8,
    Property = 16,
    All = 30
}
export declare class TextMeshLabel extends UIRenderer {
    static CHAR_CLICK_EVENT: string;
    private _slotCreateHandlers;
    private _saveTag;
    protected _fontData: BufferAsset;
    protected _string: string;
    protected _rich: boolean;
    protected _direction: ETextDirection;
    protected _horizontalAlign: ETextHorizontalAlign;
    protected _verticalAlign: ETextVerticalAlign;
    protected _overflow: ETextOverflow;
    protected _multiline: boolean;
    protected _enableItalic: boolean;
    protected _enableUnderline: boolean;
    protected _enableStrike: boolean;
    protected _enableBackground: boolean;
    protected _enableMask: boolean;
    protected _lineSpace: number;
    protected _letterSpace: number;
    protected _enableColorRT: boolean;
    protected _colorRT: Color;
    protected _enableColorRB: boolean;
    protected _colorRB: Color;
    protected _enableColorLT: boolean;
    protected _colorLT: Color;
    protected _enableColorLB: boolean;
    protected _colorLB: Color;
    protected _backgroundColor: Color;
    protected _maskColor: Color;
    protected _strokeColor: Color;
    protected _shadow: number;
    protected _shadowOffsetX: number;
    protected _shadowOffsetY: number;
    protected _shadowBlur: number;
    protected _shadowColor: Color;
    protected _handleTouchEvent: boolean;
    protected _autoWarp: boolean;
    protected _lineHeight: number;
    protected _fixedLineHeight: boolean;
    protected _padding: Margin;
    protected _dilate: number;
    protected _stroke: number;
    protected _strokeBlur: number;
    protected _aspect: number;
    protected _charVisibleRatio: number;
    protected _equalWidth: boolean;
    protected _overlayTexture: Texture2D;
    protected _enableGlow: boolean;
    protected _glowColor: Color;
    protected _glowInner: number;
    protected _glowOuter: number;
    protected _glowPower: number;
    protected _breakWestern: boolean;
    private _style;
    private _clicks;
    private _slots;
    globalOffsetX: number;
    globalOffsetY: number;
    localOffsetX: number;
    localOffsetY: number;
    slotOffsetX: number;
    slotOffsetY: number;
    private _layoutResult;
    private _dirtyFlag;
    private _uiTransform;
    private _ready;
    get ready(): boolean;
    get slots(): Slot[];
    private incrSaveTag;
    get style(): TextStyle;
    get layoutResult(): LayoutResult;
    private _font;
    get font(): TMFont;
    private _fontSize;
    /**
    * @en
    * font size
    *
    * @zh
    * 字体大小。
    */
    get fontSize(): number;
    set fontSize(val: number);
    private _underLineInfos;
    get underLineInfos(): TMQuadRenderData[];
    private _strikeInfos;
    get strikeInfos(): TMQuadRenderData[];
    private _backgroundInfos;
    get backgroundInfos(): TMQuadRenderData[];
    private _maskInfos;
    get maskInfos(): TMQuadRenderData[];
    private _charInfos;
    get charInfos(): CharInfo[];
    private _typeSet;
    get typeSet(): ITypeSet;
    set font(value: TMFont);
    /**
     * @en
     * Content string of label.
     *
     * @zh
     * 标签显示的文本内容。
     */
    private get fontData();
    private set fontData(value);
    slotsContainer: Node;
    /**
     * @en
     * Content string of label.
     *
     * @zh
     * 标签显示的文本内容。
     */
    get string(): string;
    set string(value: string);
    /**
    * @en
    * is rich lable
    *
    * @zh
    * 是否富文本。
    */
    get rich(): boolean;
    set rich(value: boolean);
    get multiline(): boolean;
    set multiline(value: boolean);
    get dilate(): number;
    set dilate(value: number);
    get color(): Color;
    set color(value: Color);
    get enableColorRT(): boolean;
    set enableColorRT(value: boolean);
    get colorRT(): Color;
    set colorRT(value: Color);
    get enableColorRB(): boolean;
    set enableColorRB(value: boolean);
    get colorRB(): Color;
    set colorRB(value: Color);
    get enableColorLT(): boolean;
    set enableColorLT(value: boolean);
    get colorLT(): Color;
    set colorLT(value: Color);
    get enableColorLB(): boolean;
    set enableColorLB(value: boolean);
    get colorLB(): Color;
    set colorLB(value: Color);
    get enableItalic(): boolean;
    set enableItalic(value: boolean);
    get enableUnderline(): boolean;
    set enableUnderline(value: boolean);
    get enableStrike(): boolean;
    set enableStrike(value: boolean);
    get enableBackground(): boolean;
    set enableBackground(value: boolean);
    get backgroundColor(): Color;
    set backgroundColor(value: Color);
    get enableMask(): boolean;
    set enableMask(value: boolean);
    get maskColor(): Color;
    set maskColor(value: Color);
    get autoWarp(): boolean;
    set autoWarp(value: boolean);
    get equalWidth(): boolean;
    set equalWidth(value: boolean);
    get fixedLineHeight(): boolean;
    set fixedLineHeight(value: boolean);
    get lineHeight(): number;
    set lineHeight(value: number);
    get horizontalAlign(): ETextHorizontalAlign;
    set horizontalAlign(value: ETextHorizontalAlign);
    get verticalAlign(): ETextVerticalAlign;
    set verticalAlign(value: ETextVerticalAlign);
    get overflow(): ETextOverflow;
    set overflow(value: ETextOverflow);
    get lineSpace(): number;
    set lineSpace(value: number);
    get letterSpace(): number;
    set letterSpace(value: number);
    get padding(): Margin;
    set padding(value: Margin);
    get stroke(): number;
    set stroke(value: number);
    get strokeBlur(): number;
    set strokeBlur(value: number);
    get strokeColor(): Color;
    set strokeColor(value: Color);
    get shadow(): number;
    set shadow(value: number);
    get shadowBlur(): number;
    set shadowBlur(value: number);
    get shadowOffsetX(): number;
    set shadowOffsetX(value: number);
    get shadowOffsetY(): number;
    set shadowOffsetY(value: number);
    get shadowColor(): Color;
    set shadowColor(value: Color);
    get aspect(): number;
    set aspect(value: number);
    get charVisibleRatio(): number;
    set charVisibleRatio(value: number);
    get overlayTexture(): Texture2D;
    set overlayTexture(value: Texture2D);
    get enableGlow(): boolean;
    set enableGlow(value: boolean);
    get glowColor(): Color;
    set glowColor(value: Color);
    get glowInner(): number;
    set glowInner(value: number);
    get glowOuter(): number;
    set glowOuter(value: number);
    get glowPower(): number;
    set glowPower(value: number);
    get breakWestern(): boolean;
    set breakWestern(value: boolean);
    get handleTouchEvent(): boolean;
    set handleTouchEvent(value: boolean);
    get uiTransform(): UITransform;
    get renderEntity(): __private._cocos_2d_renderer_render_entity__RenderEntity;
    onLoad(): void;
    private clearEditorSlots;
    private _onTMFLoaded;
    private _updateStyle;
    private _updateAllStyles;
    onEnable(): void;
    onDisable(): void;
    onDestroy(): void;
    private _addEventListeners;
    private _removeEventListeners;
    private _onEditorTMFChanged;
    protected _onTouchEnded(event: EventTouch): void;
    private _setLayer;
    protected _applyLayer(): void;
    protected _onAnchorChanged(): void;
    protected _onSizeChanged(): void;
    private _onTMFStyleChanged;
    protected _render(render: __private._cocos_2d_renderer_i_batcher__IBatcher): void;
    requestRenderData(drawInfoType?: number): any;
    getRenderElementCount(): number;
    getRenderElement(index: number): CharInfo;
    protected _flushAssembler(): void;
    /**
     * 修复合批问题
     * @param index
     * @returns
     */
    getRenderMaterial(index: number): Material | null;
    markForUpdateRenderData(enable?: boolean): void;
    updateRenderData(force?: boolean): void;
    setSlotCreateHandler(type: ESlotType, handler: SlotHandlerType): void;
    makeDirty(dirtyFlag: EDirtyFlag): void;
    private _updateOverlayTexture;
    private _updateGlow;
    private _updateMaterialProperties;
    updateMaterial(): void;
    private _applyFontTexture;
    private _updateLayout;
    private _updateText;
    _clearAdditions(): void;
    private _freeCharInfos;
    private _clearSlots;
    private _parse;
    private _parseSlot;
    /**
     * slot 格式：[包名|resources目录无需包名][://资源路径|资源路径]
     * @param slot
     * @param fontSize
     * @returns
     */
    private _createSlot;
    private _parseClick;
    private _parseRich;
    private _addCharInfo;
    lateUpdate(dt: number): void;
    get dirtyFlag(): EDirtyFlag;
    set dirtyFlag(value: EDirtyFlag);
    addDirtyFlag(flag: EDirtyFlag): void;
    clearDirtyFlag(): void;
    /**
     * 获取文本内容
     * @param index
     * @returns
     */
    getCharInfo(index: number): CharInfo;
    /**
     *
     * @param charInfo
     * @param colors 设置统一颜色，或者设置单个顶点
     * @returns
     */
    setCharColor(charInfo: CharInfo, colors?: Color | Color[]): void;
    /**
     * 设置文本偏移、旋转、缩放
     * @param charInfo
     * @param dx x偏移
     * @param dy y偏移
     * @param rotation 旋转角度，弧度
     * @param scale 缩放值
     * @returns
     */
    setCharTransform(charInfo: CharInfo, dx: number, dy: number, rotation: number, scale: number): void;
    setCustomMaterialByUUID(uuid: string): void;
    setFontByUUID(uuid: string): void;
    protected _canRender(): boolean;
}
export {};
