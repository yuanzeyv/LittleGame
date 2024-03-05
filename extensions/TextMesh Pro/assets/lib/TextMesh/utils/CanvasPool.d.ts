export interface ISharedLabelData {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
}
export declare class CanvasPool {
    static getInstance(): CanvasPool;
    pool: ISharedLabelData[];
    get(): ISharedLabelData;
    put(canvas: ISharedLabelData): void;
}
