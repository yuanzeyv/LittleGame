import { TextMeshLabel } from "../label/TextMeshLabel";
import { CharInfo } from "../label/CharInfo";
import { ITypeSet, LayoutResult } from "../types/ITypeSet";
import { Vec2 } from "cc";
import { HitTestResult } from "../types/types";
declare class AddtiveLineInfo {
    startIndex: number;
    lineLength: number;
    lineHeight: number;
    boundHeight: number;
    startY: number;
    existInLine: boolean;
    reset(): void;
}
declare type BeginUpdateHandler = (comp: TextMeshLabel, index: number, newLine: boolean) => void;
declare type EndUpdateHandler = (comp: TextMeshLabel, index: number) => void;
export declare class BaseTypeSet implements ITypeSet {
    protected hitTestResult: {
        result?: boolean;
        accurate?: boolean;
        charInfo?: CharInfo;
    };
    protected breakLineInfo: {
        lineIndex?: number;
        index?: number;
        lineHeight?: number;
        maxDescent?: number;
        maxAscent?: number;
        maxHeight?: number;
    };
    protected underLineInfo: AddtiveLineInfo;
    protected strikeInfo: AddtiveLineInfo;
    protected backgroundInfo: AddtiveLineInfo;
    protected maskInfo: AddtiveLineInfo;
    protected beginUpdateHandlers: BeginUpdateHandler[];
    protected endUpdateHandlers: EndUpdateHandler[];
    constructor();
    protected registUpdates(): void;
    hitTest(comp: TextMeshLabel, touchPos: Vec2): HitTestResult;
    layout(comp: TextMeshLabel): LayoutResult;
    protected reset(): void;
    protected getWidth(comp: TextMeshLabel, sidx: number, eidx: number): number;
    private calcLineInfo;
    /***********underline**************/
    private appendUnderLineData;
    protected updateUnderLineInBegin(comp: TextMeshLabel, index: number, newLine: boolean): void;
    protected updateUnderLineInEnd(comp: TextMeshLabel, index: number): void;
    /**************deleteline******************/
    private appendStrickData;
    protected updateStrickInBegin(comp: TextMeshLabel, index: number, newLine: boolean): void;
    protected updateStrickInEnd(comp: TextMeshLabel, index: number): void;
    /*************background*******************/
    private appendBackgroundData;
    protected updateBackgroundInBegin(comp: TextMeshLabel, index: number, newLine: boolean): void;
    protected updateBackgroundInEnd(comp: TextMeshLabel, index: number): void;
    /*************mask*******************/
    private appendMaskData;
    protected updateMaskInBegin(comp: TextMeshLabel, index: number, newLine: boolean): void;
    protected updateMaskInEnd(comp: TextMeshLabel, index: number): void;
}
export {};
