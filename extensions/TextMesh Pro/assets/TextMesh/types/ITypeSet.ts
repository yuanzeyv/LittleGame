import { Vec2 } from "cc";
import { TextMeshLabel } from "../label/TextMeshLabel";
import { HitTestResult } from "./types";

export interface ITypeSet {
    layout(comp: TextMeshLabel): LayoutResult;
    hitTest(comp: TextMeshLabel, screenPos: Vec2, accurate?: boolean): HitTestResult;
}

export type LayoutResult = {
    lines: number[][];
    maxWidth: number;
    maxHeight: number;
    linesHeight: number[];
    linesWidth: number[];
    lastMaxDescent: number;
}