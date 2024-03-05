import { TextStyle } from "./TextStyle";
export declare class StyleManager {
    static TMF_STYLE_CHANGED: string;
    private static _styles;
    private static _onStyleChanged;
    static removeAll(): void;
    static registByStyle(key: string, style: TextStyle): void;
    static registByStyles(key: string[], style: TextStyle[]): void;
    static registByKeyJson(key: string, style: string): void;
    static registByJson(styles: string): void;
    static getStyle(key: string): TextStyle;
}
