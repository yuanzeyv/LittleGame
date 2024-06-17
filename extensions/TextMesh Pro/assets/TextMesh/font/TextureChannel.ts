import { ITMFont } from "../types/ITMFont";
import { LRUCache as LRU} from "lru-cache";
import { SpaceInfo } from "../types/types";

export class TextureChannel {    
    private _tmFont: ITMFont;
    private _isDynamic: boolean;
    private _index: number;
    private _rowSize: number;
    private _colSize: number;
    private _capacity: number;
    private _size: number;
    private _lru:LRU<number, SpaceInfo>;
    private _disposedSpaces: SpaceInfo[] = [];
    private _fullIndices: number[] = [];
    private _initialized: boolean = false;

    get initialized(): boolean {
        return this._initialized;
    }

    get index(): number {
        return this._index;
    }

    get isDynamic(): boolean {
        return this._isDynamic; 
    }

    get count(): number {
        return this._capacity - this._fullIndices.length;
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

    get lru(): LRU<number, SpaceInfo> {
        return this._lru;
    }

    public initial() {
        this._initialized = true;
    }

    constructor(tmFont: ITMFont, index: number, isDynamic: boolean, lru?: LRU<number, SpaceInfo>) {
        this._tmFont = tmFont;
        this._index = index;
        this._isDynamic = isDynamic;

        this._size = tmFont.fontData.spaceSize;        
        this._colSize = Math.floor(tmFont.textureWidth / this._size);
        this._rowSize = Math.floor(tmFont.textureHeight / this._size);
        this._capacity = this._colSize * this._rowSize;

        if(isDynamic) {
            this._lru = lru || new LRU<number, SpaceInfo>({
                max: this._capacity,
                dispose: (value, key) => {
                    this._disposedSpaces.push(value);
                }
            });

            this._fullIndices = new Array(this._capacity);
            for(let i=this._capacity-1;i>=0;i--) {
                this._fullIndices[i] = i;
            }
        }
    }

    removeChar(index: number) {
        if(this._lru) {
            this._fullIndices.push(index);
            this._lru.delete(index);
        }
    }

    isFull(): boolean {
        return this._fullIndices.length == 0;
    }

    /**
     * 分配新的字符空位
     * @returns 空位信息
     */
    spanEmptySpace(): SpaceInfo {
        let ret: SpaceInfo;
        
        if(this.isFull()) {
            return null;
        }

        let index = this._fullIndices.pop();
        let row = Math.floor(index / this._colSize);
        let col = index % this._rowSize;
        let x = col * this._size;
        let y = row * this._size;
        let width = this._size;
        let height = this._size;

        ret = {
            index: index,
            cid: this._index,
            row,
            col,
            width,
            height,
            x,
            y,
        };

        if(this._lru) {
            this._lru.set(index, ret);
        }

        return ret;
    }
}