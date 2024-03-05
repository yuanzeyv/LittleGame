/// <reference path="../../../dts/cc.d.ts" />
/// <reference types="c:/programdata/cocos/editors/creator/3.8.0/resources/resources/3d/engine/bin/.declarations/cc" />
import { Asset } from "cc";
export declare class ResManager {
    static preload(uuid: string, progress?: Function): Promise<unknown>;
    static loadAB(abName: string, progress?: Function): Promise<unknown>;
    static getBundle(abName?: string): import("cc").AssetManager.Bundle;
    static getByUUIDAsync<T = Asset>(uuid: string, type: typeof Asset): Promise<T>;
    static get<T>(abName: string, url: string | Array<string>, type: typeof Asset): T | T[];
    static getAsync<T>(abName: string, url: string | Array<string>, type: typeof Asset): Promise<any>;
    static load<T>(abName: string, url: string | Array<string>, type: typeof Asset, onProgress?: any): Promise<T | T[]>;
    static loadDir(abName: string, url: string | Array<string>, onProgress?: any): Promise<Asset[]>;
    /**
     * 编辑器下加载资源
     * @param url db://assets/
     */
    static editorLoad<T>(url: string): Promise<T>;
}
