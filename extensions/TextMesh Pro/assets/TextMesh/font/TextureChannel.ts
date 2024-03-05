import { ITMFont } from "../types/ITMFont";
import LRU from "lru-cache";
import { SpaceInfo } from "../types/types";

export class TextureChannel {    
    private _tmFont: ITMFont;
    private _isDynamic: boolean;
    private _index: number;
    private _rowSize: number;
    private _colSize: number;
    private _capacity: number;
    private _size: number;
    private _lru:LRU<string, SpaceInfo>;
    private _disposedSpaces: SpaceInfo[] = [];

    private _count: number = 0;
    get index(): number {
        return this._index;
    }

    get isDynamic(): boolean {
        return this._isDynamic;
    }

    get count(): number {
        return this._count;
    }

    get rowSize(): number {
        return this._rowSize;
    }

    get colSize(): number {
        return this._colSize;
    }

    get capacity(): number {
        return this._capacity;
    }

    get lru(): LRU<string, SpaceInfo> {
        return this._lru;
    }

    constructor(tmFont: ITMFont, index: number, isDynamic: boolean, lru?: LRU<string, SpaceInfo>) {
        this._tmFont = tmFont;
        this._index = index;
        this._isDynamic = isDynamic;

        this._size = tmFont.fontData.spaceSize;        
        this._colSize = Math.floor(tmFont.textureWidth / this._size);
        this._rowSize = Math.floor(tmFont.textureHeight / this._size);
        this._capacity = this._colSize * this._rowSize;

        if(isDynamic) {
            this._lru = lru || new LRU<string, SpaceInfo>({
                max: this._capacity,
                dispose: (value, key) => {
                    this._disposedSpaces.push(value);
                    this._tmFont.removeDynamicChar(key);
                }
            });
        }
    }

    isFull(): boolean {
        return this._count >= this._capacity;
    }

    /**
     * 分配新的字符空位
     * @param code 字符编码
     * @returns 空位信息
     */
    spanEmptySpace(code: string): SpaceInfo {
        let ret: SpaceInfo;
        
        if(this.isFull()) {
            // 如果是动态字体，则从缓存中获取空位
            if(this._lru) {
                ret = this._lru.get(code);
                if(ret) {
                    return ret;
                }
    
                if(this._disposedSpaces.length > 0) {
                    ret = this._disposedSpaces.pop();
                    this._lru.set(code, ret);
                    return ret;
                }
            }else{
                return null;
            }
        }

        let row = Math.floor(this._count / this._colSize);
        let col = this._count % this._rowSize;
        let x = col * this._size;
        let y = row * this._size;
        let width = this._size;
        let height = this._size;

        this._count++;
        ret = {
            code,
            cid: this._index,
            row,
            col,
            width,
            height,
            x,
            y,
        };

        if(this._lru) {
            this._lru.set(code, ret);
        }

        return ret;
    }
}