import { Node } from "cc";
export declare class Clickable {
    name: string;
    value: string;
    start: number;
    end: number;
}
export declare enum ESlotType {
    Custom = 0,
    Image = 1,
    Prefab = 2
}
export declare const ImageTAG = "img";
export declare const PrefabTAG = "pb";
export declare const SlotTAG = "slot";
export declare const SlotTypeMap: {};
export declare function isSlotType(type: string): boolean;
export declare enum ESlotSizeType {
    None = 0,
    HeightFirst = 1,
    WidthFirst = 2
}
export declare class Slot {
    index: number;
    type: ESlotType;
    tag: string;
    name: string;
    src: string;
    width: number;
    height: number;
    node: Node;
    dx: number;
    dy: number;
    fixed: boolean;
    sizeType: ESlotSizeType;
}
