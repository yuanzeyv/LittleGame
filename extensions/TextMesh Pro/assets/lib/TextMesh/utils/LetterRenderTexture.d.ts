import { ImageAsset, Texture2D } from "cc";
export declare class LetterRenderTexture extends Texture2D {
    /**
     * @en
     * Init the render texture with size.
     * @zh
     * 初始化 render texture。
     * @param [width]
     * @param [height]
     * @param [string]
     */
    initWithSize(width: number, height: number, format?: number): void;
    /**
     * @en Draw a texture to the specified position
     * @zh 将指定的图片渲染到指定的位置上。
     * @param {Texture2D} image
     * @param {Number} x
     * @param {Number} y
     */
    drawTextureAt(image: ImageAsset, x: number, y: number): void;
}
