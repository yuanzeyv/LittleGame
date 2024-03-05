import { ITMFont } from "../types/ITMFont";
import LRU from "lru-cache";
import { SpaceInfo } from "../types/types";
export declare class TextureChannel {
    private _tmFont;
    private _isDynamic;
    private _index;
    private _rowSize;
    private _colSize;
    private _capacity;
    private _size;
    private _lru;
    private _disposedSpaces;
    private _count;
    get index(): number;
    get isDynamic(): boolean;
    get count(): number;
    get rowSize(): number;
    get colSize(): number;
    get capacity(): number;
    get lru(): LRU<string, SpaceInfo>;
    constructor(tmFont: ITMFont, index: number, isDynamic: boolean, lru?: LRU<string, SpaceInfo>);
    isFull(): boolean;
    /**
     * 分配新的字符空位
     * @param code 字符编码
     * @returns 空位信息
     */
    spanEmptySpace(code: string): SpaceInfo;
}
