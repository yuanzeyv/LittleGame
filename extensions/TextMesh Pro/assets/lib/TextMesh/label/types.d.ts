export declare enum ETextDirection {
    Horizontal = 0,
    Vertical = 1
}
export declare enum ETextHorizontalAlign {
    Left = 0,
    Center = 1,
    Right = 2
}
export declare enum ETextVerticalAlign {
    Top = 0,
    Middle = 1,
    Bottom = 2
}
/**
 * @en Enum for Overflow.
 *
 * @zh 文本超载类型。
 */
export declare enum ETextOverflow {
    /**
     * @en None.
     *
     * @zh 此模式下，组件宽度是自动变化的
     */
    None = 0,
    /**
     * @en In CLAMP mode, when label content goes out of the bounding box, it will be clipped.
     *
     * @zh CLAMP 模式中，当文本内容超出边界框时，多余的会被截断。
     */
    Clamp = 1,
    /**
     * @en In SHRINK mode, the font size will change dynamically to adapt the content size.
     * This mode may takes up more CPU resources when the label is refreshed.
     *
     * @zh SHRINK 模式，字体大小会动态变化，以适应内容大小。这个模式在文本刷新的时候可能会占用较多 CPU 资源。
     */
    Shrink = 2,
    /**
     * @en In RESIZE_HEIGHT mode, you can only change the width of label and the height is changed automatically.
     *
     * @zh 在 RESIZE_HEIGHT 模式下，只能更改文本的宽度，高度是自动改变的。
     */
    ResizeHeight = 4
}
export declare enum EScriptType {
    None = 0,
    SuperScript = 1,
    SubScript = 2
}
export declare class Margin {
    onChanged: Function;
    private _left;
    private _right;
    private _top;
    private _bottom;
    get left(): number;
    set left(val: number);
    get right(): number;
    set right(val: number);
    get top(): number;
    set top(val: number);
    get bottom(): number;
    set bottom(val: number);
}
