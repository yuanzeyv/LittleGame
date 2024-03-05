import { Rect, RenderTexture, Texture2D } from "cc";
export declare class Utils {
    static readTexturePixels(src: RenderTexture | Texture2D, rect?: Rect, buffer?: Uint8Array): Uint8Array;
    static uploadData(target: RenderTexture | Texture2D, source: HTMLCanvasElement | HTMLImageElement | ArrayBufferView | ImageBitmap, rect?: Rect, level?: number, arrayIndex?: number): void;
    static until(condition: () => boolean): Promise<void>;
    static arrayBufferToString(buffer: ArrayBuffer, begin?: number): string;
}
