import { TextMeshLabel } from "../label/TextMeshLabel";
import { LayoutResult } from "../types/ITypeSet";
import { Vec2 } from "cc";
import { HitTestResult } from "../types/types";
import { BaseTypeSet } from "./BaseTypeSet";
export declare class HorizontalTypeSet extends BaseTypeSet {
    hitTest(comp: TextMeshLabel, touchPos: Vec2): HitTestResult;
    private processRTL;
    layout(comp: TextMeshLabel): LayoutResult;
    private updateGloabl;
    private updateInClampMode;
    private preProcessVertex;
    private calcNextBreakInfo;
    private getWidthExt;
    private updateInWarpMode;
    private updateInResizeHeightMode;
    private updateInResizeWidthMode;
    private updateInShrinkMode;
    private horizontalLayout;
    private verticalLayout;
    private layoutSlots;
}
