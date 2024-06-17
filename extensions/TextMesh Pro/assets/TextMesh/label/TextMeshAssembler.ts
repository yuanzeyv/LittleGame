import { Color, IAssembler, Mat4, Vec3, __private } from "cc";
import { JSB } from "cc/env";
import { TextMeshSettings } from "../settings";
import { LayoutResult } from "../types/ITypeSet";
import { ItalicSkewFactor } from "../utils/Const";
import { ETMQuadType } from "../vertex/ETMQuadType";
import { CharInfo, getCharInfoFromPool } from "./CharInfo";
import { TextMeshLabel } from "./TextMeshLabel";
import { EScriptType, ETextOverflow } from "./types";

const MaxQuadLimit = Math.ceil(65535 / 6);
const QuadIndices = [0, 1, 2, 2, 1, 3];
const vec3_temp = new Vec3();
const _worldMatrix = new Mat4();

export class TextMeshAssembler implements IAssembler {
    static createData (comp: TextMeshLabel) {
        const renderData = comp.requestRenderData()!;
        // renderData.resize(0, 0);
        // renderData.dataLength = 0;
        return renderData;
    }

    static fillBuffers (comp: TextMeshLabel, renderer: __private._cocos_2d_renderer_i_batcher__IBatcher) {
        if (!comp.renderData || !comp.font) {
            return;
        }

        // if(!comp.node.hasChangedFlags) {
        //     return;
        // }
        
        const node = comp.node; 

        const chunk = comp.renderData!.chunk;
        if(!chunk) {
            return;
        }      
        
        node.updateWorldTransform();
        node.getWorldMatrix(_worldMatrix);

        let vertexOffset = 0;
        if(this._needCheckShdaow(comp)) {
            vertexOffset = this._fillElementBuffers(comp, renderer, true);
        }
        this._fillElementBuffers(comp, renderer, false, vertexOffset);
        comp.transformDirty = false;
    }

    private static _fillElementBuffers(comp: TextMeshLabel, renderer: __private._cocos_2d_renderer_i_batcher__IBatcher, shadow: boolean = false, vertexOffset: number = 0) {        
        const chunk = comp.renderData!.chunk;

        const vData = chunk.vb;
        const floatStride = comp.renderData!.floatStride;   

        const bid = chunk.bufferId;
        const vid = chunk.vertexOffset;
        const meshBuffer = chunk.vertexAccessor.getMeshBuffer(chunk.bufferId);
        const ib = chunk.vertexAccessor.getIndexBuffer(bid);

        const len = comp.getRenderElementCount();
        let vIndex = vertexOffset;
        for(let i=0;i<len;i++) {
            let charInfo = comp.getRenderElement(i);
            if(!charInfo || !charInfo.visible) {
                return;
            }

            if(shadow) {
                charInfo = charInfo.shadowChar;
                if(!charInfo) {
                    return vIndex;
                }
            }
            
            for(let vi = 0; vi < charInfo.vertexData.length; vi++) {
                const v = charInfo.vertexData[vi];
                if(true || comp.transformDirty || charInfo.dirty) {
                    vec3_temp.set(v.rx, v.ry, 0);
                    Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);
                    v.worldX = vec3_temp.x;
                    v.worldY = vec3_temp.y;
                    v.worldZ = vec3_temp.z;
                }

                let idx = floatStride * vIndex;
                vData[idx] = v.worldX;
                vData[idx + 1] = v.worldY;
                vData[idx + 2] = v.worldZ;

                if(vIndex % 4 == 0) {
                    let vOffset = vIndex + vid;
                    let idxOffset = meshBuffer.indexOffset;
                    ib[idxOffset++] = vOffset;
                    ib[idxOffset++] = vOffset + 1;
                    ib[idxOffset++] = vOffset + 2;
                    ib[idxOffset++] = vOffset + 2;
                    ib[idxOffset++] = vOffset + 1;
                    ib[idxOffset++] = vOffset + 3;
                    meshBuffer.indexOffset = idxOffset;
                }

                vIndex++;
            } 
            charInfo.dirty = false;
        }
        meshBuffer.setDirty();
        return vIndex;
    }

    private static updateUVs(comp: TextMeshLabel) {
        const chunk = comp.renderData!.chunk;
        if(!chunk) {
            return;
        }

        let vertexOffset = 0;
        if(this._needCheckShdaow(comp)) {
            vertexOffset = this._updateUVs(comp, true);
        }
        this._updateUVs(comp, false, vertexOffset);
    }

    private static _needCheckShdaow(comp: TextMeshLabel) {
        if(comp.rich) {
            return true;
        }

        return comp.style.shadow > 0.0001;
    }

    private static _updateUVs(comp: TextMeshLabel, shadow: boolean = false, vertexOffset: number = 0) {
        const chunk = comp.renderData!.chunk;

        const vData = chunk.vb;

        const len = comp.getRenderElementCount();
        const floatStride = comp.renderData!.floatStride; 

        let vIndex = vertexOffset;
        for(let i=0;i<len;i++) { 
            let charInfo = comp.getRenderElement(i);
            if(!charInfo || !charInfo.visible) {
                return;
            }

            if(shadow) {
                charInfo = charInfo.shadowChar;
                if(!charInfo) {
                    return vIndex;
                }
            }

            for(let vi = 0; vi < charInfo.vertexData.length; vi++) {
                const v = charInfo.vertexData[vi];
                let idx = floatStride * vIndex;

                // uv
                vData[idx + 3 ] = v.u;
                vData[idx + 4 ] = v.v;
                vData[idx + 5 ] = v.u1;
                vData[idx + 6 ] = v.v1;  

                vIndex++;
            }
        }

        return vIndex;
    }

    static updateColor(comp: TextMeshLabel, charInfo?: CharInfo, colors?: Color | Color[]) {
        const chunk = comp.renderData!.chunk;
        if(!chunk) {
            return;
        }

        if(this._needCheckShdaow(comp)) {
            this._updateColor(comp, charInfo, colors, true);
        }
        this._updateColor(comp, charInfo, colors);
    }

    private static _updateColor(comp: TextMeshLabel, charInfo: CharInfo, colors: Color | Color[], shadow: boolean = false) {
        if(!charInfo || !charInfo.visible) {
            return;
        }

        const chunk = comp.renderData!.chunk;

        const vData = chunk.vb;
        const vertexOffset = comp.renderData!.floatStride; 

        let style = charInfo.style;
        let isArray = Array.isArray(colors);
        
        for(let vi = 0; vi < charInfo.vertexData.length; vi++) {   
            let vIndex = vi + charInfo.index * 4;
            let idx = vertexOffset * vIndex;
            // color   
            let color: Color = null;
            if(shadow) {
                color = style.shadowRGBA;
            }else{
                color = !!colors ? (isArray ? colors[vi] : colors) : style.getFillColor(vi % 4);
            }
            vData[idx + 7 ] = color.x;
            vData[idx + 8 ] = color.y;
            vData[idx + 9 ] = color.z;
            vData[idx + 10] = color.w;
        }
    }

    static updateColors(comp: TextMeshLabel) {
        const chunk = comp.renderData!.chunk;
        if(!chunk) {
            return;
        }

        let vertexOffset = 0;
        if(this._needCheckShdaow(comp)) {
            vertexOffset = this._updateColors(comp, true);
        }
        this._updateColors(comp, false, vertexOffset);
    }

    private static _updateColors(comp: TextMeshLabel, shadow: boolean = false, vertexOffset: number = 0) {
        const chunk = comp.renderData!.chunk;

        const vData = chunk.vb;
        const len = comp.getRenderElementCount();
        const floatStride = comp.renderData!.floatStride; 

        let vIndex = vertexOffset;
        for(let i=0;i<len;i++) {            
            let charInfo = comp.getRenderElement(i);
            if(!charInfo || !charInfo.visible) {
                return;
            }

            if(shadow) {
                charInfo = charInfo.shadowChar;
                if(!charInfo) {
                    return vIndex;
                }
            }

            let style = charInfo.style;
            for(let vi = 0; vi < charInfo.vertexData.length; vi++) {
                let v = charInfo.vertexData[vi];
                let idx = floatStride * vIndex;
                // color   
                let color: Color = null;
                if(v.type == ETMQuadType.Shadow) {
                    color = style.shadowRGBA;
                }else{
                    color = style.getFillColor(vi % 4);
                }
                
                vData[idx + 7 ] = color.x;
                vData[idx + 8 ] = color.y;
                vData[idx + 9 ] = color.z;
                vData[idx + 10] = color.w;

                vIndex++;
            }
        }

        return vIndex;
    }

    static updateOthers(comp: TextMeshLabel) {
        const chunk = comp.renderData!.chunk;
        if(!chunk) {
            return;
        }
        
        let vertexOffset = 0;
        if(this._needCheckShdaow(comp)) {
            vertexOffset = this._updateOthers(comp, true);
        }
        this._updateOthers(comp, false, vertexOffset);
    }

    private static _updateOthers(comp: TextMeshLabel, shadow: boolean = false, vertexOffset: number = 0) {
        const chunk = comp.renderData!.chunk;

        const vData = chunk.vb;
        const len = comp.getRenderElementCount();
        let vIndex = vertexOffset;
        for(let i=0;i<len;i++) {            
            let charInfo = comp.getRenderElement(i);
            if(!charInfo) {
                return;
            }

            if(shadow) {
                charInfo = charInfo.shadowChar;
                if(!charInfo) {
                    return vIndex;
                }
            }

            const char = charInfo.char;
            const floatStride = comp.renderData!.floatStride; 
            let style = charInfo.style;

            const v0 = charInfo.vertexData[0];
            for(let vi = 0; vi < charInfo.vertexData.length; vi++) {
                let v = charInfo.vertexData[vi];
                let idx = floatStride * vIndex;
                
                // channelId,fill,stroke,strokeBlur
                vData[idx + 11] = char?.cid || 0;
                vData[idx + 12] = style.dilate * TextMeshSettings.dilateScale;

                // strokeColor
                let color: Color = null;
                if(shadow) {
                    vData[idx + 12] -= style.shadowBlur;
                    if(vData[idx + 12] < 0) {
                        vData[idx + 12] = 0.0001;
                    }

                    color = style.shadowRGBA;
                    vData[idx + 13] = style.shadow;
                    vData[idx + 14] = style.shadowBlur;
                }else{
                    color = style.strokeRGBA;
                    vData[idx + 13] = style.stroke;
                    vData[idx + 14] = style.strokeBlur;    
                }
                vData[idx + 15] = color.x;
                vData[idx + 16] = color.y;
                vData[idx + 17] = color.z;
                vData[idx + 18] = color.w;
                vIndex++;
            }
        }

        return vIndex;
    }


    private static updateVertexData (comp: TextMeshLabel) {
        if (!comp.renderData || !comp.font) {
            return;
        }

        comp.node.updateWorldTransform();
        if(comp.typeSet) {
            let len = 0;    
            const layout = comp.layoutResult;
            
            if(comp.backgroundColor.a > 0) {
                len = comp.backgroundInfos.length;
                for(let i=0;i<len;i++) {
                    this.refreshBackgroundInfo(comp, i, layout);
                }
            }

            len = comp.charInfos.length;
            for(let i=0;i<len;i++) {
                let char = comp.charInfos[i];
                if(!char.visibleChar) {
                    continue;
                }
                this.refreshCharInfo(comp, i, char);
            }  

            if(comp.font.strikeThickness > 0) {
                len = comp.strikeInfos.length;
                for(let i=0;i<len;i++) {
                    this.refreshStrikeInfo(comp, i, layout);
                }
            }
            
            if(comp.font.underLineThickness > 0) {
                len = comp.underLineInfos.length;
                for(let i=0;i<len;i++) {
                    this.refreshUnderlineInfo(comp, i, layout);
                }
            }

            if(comp.maskColor.a > 0) {
                len = comp.maskInfos.length;
                for(let i=0;i<len;i++) {
                    this.refreshMaskInfo(comp, i, layout);
                }
            }
        }

        // comp.renderData.resize(comp.renderInfos.length, comp.renderInfos.length / 4 * 6);
    }

    private static appendShadowQuad(
        comp: TextMeshLabel, 
        width: number, 
        height: number, 
        offsetX: number, offsetY: number, 
        skewFactor: number, 
        charInfo: CharInfo, 
        uvs?: Float32Array) {
        const style = charInfo.style;
        if(style.shadow > 0.0001) {
            const fontSize = style.fontSize;
            let shadowCharInfo = charInfo.shadowChar;
            if(!shadowCharInfo) {
                shadowCharInfo = charInfo.shadowChar = getCharInfoFromPool();
                shadowCharInfo.copyFrom(charInfo);
            }
            this.appendQuad(comp, width, height, offsetX + style.shadowOffsetX * TextMeshSettings.shadowScale, offsetY - style.shadowOffsetY * TextMeshSettings.shadowScale, skewFactor, shadowCharInfo, uvs || charInfo.char.uvs, ETMQuadType.Shadow);
        }
    }

    static refreshCharInfo(comp: TextMeshLabel, index: number, charInfo: CharInfo) {        
        const width = charInfo.realWidth;
        const height = charInfo.realHeight;
        const offsetX = charInfo.x;
        const offsetY = charInfo.baseY + charInfo.y;
        const italic = charInfo.style.italic;
        const skewFactor = italic ? ItalicSkewFactor : 0;

        this.appendShadowQuad(comp, width, height, offsetX, offsetY, skewFactor, charInfo);
        this.appendQuad(comp, width, height, offsetX, offsetY, skewFactor, charInfo, charInfo.char.uvs, ETMQuadType.Char);
    }

    private static _clipInfo = {
        xy: 0,
        uv: 0,
        len: 0,
    };
    private static _clipX(comp: TextMeshLabel, value: number, min: number, max: number, width: number, isMin: boolean) {
        let tr = comp.uiTransform;
        this._clipInfo.xy = value;
        this._clipInfo.len = width;
        let dist = max - min;
        if(isMin) {
            if(value < 0) {
                this._clipInfo.uv = min - dist * value / width;
                this._clipInfo.xy = 0;
                this._clipInfo.len += value;
            }else{
                this._clipInfo.uv = min;
            }
        }else{
            let rxy = value + width;
            let size = tr.width;
            if(rxy > size) {
                let dw = rxy - size;
                this._clipInfo.uv = max - dist * dw / width;
                this._clipInfo.len -= dw;
            }else{                
                this._clipInfo.uv = max;
            }
        }
        return this._clipInfo;
    }
    private static _clipY(comp: TextMeshLabel, value: number, min: number, max: number, height: number, isMin: boolean) {
        let tr = comp.uiTransform;
        this._clipInfo.xy = value;
        this._clipInfo.len = height;
        let dist = max - min;
        if(isMin) {
            let top = value + height;
            if(top > 0) {
                this._clipInfo.uv = min + dist * top / height;
                this._clipInfo.len -= top;
            }else{
                this._clipInfo.uv = min;
            }
        }else{
            let size = tr.height;
            if(value < -size) {
                let dh = size + value;
                this._clipInfo.uv = max + dist * dh / height;
                this._clipInfo.xy = -size;
                this._clipInfo.len += dh;
            }else{                
                this._clipInfo.uv = max;
            }
        }
        return this._clipInfo;
    }

    private static appendQuad(comp: TextMeshLabel, width: number, height: number, 
        offsetX: number, offsetY: number, 
        skewFactor: number, 
        charInfo: CharInfo, 
        uvs: Float32Array, 
        type: ETMQuadType = ETMQuadType.Char,
        ) {
        const renderData = comp.renderData;
        if (!renderData) {
            return;
        }
        
        let uv0 = uvs[0];
        let uv1 = uvs[1];
        let uv2 = uvs[2];
        let uv3 = uvs[3];
        let uv4 = uvs[4];
        let uv5 = uvs[5];
        let uv6 = uvs[6];
        let uv7 = uvs[7];

        if(charInfo.slot) {
            uv0 = uv1 = uv2 = uv3 = uv4 = uv5 = uv6 = uv7 = 0;
        }else{
            if(comp.overflow == ETextOverflow.Clamp) {
                offsetX += comp.localOffsetX;
                offsetY += comp.localOffsetY;
                let tr = comp.uiTransform;
                // // left
                let clip = this._clipX(comp, offsetX, uvs[0], uvs[2], width, true);
                offsetX = clip.xy;
                width = clip.len;
                uv0 = uv4 = clip.uv;
                if(width <= 0) {
                    return;
                }
                
                // // right
                clip = this._clipX(comp, offsetX, uvs[0], uvs[2], width, false);
                width = clip.len;
                uv2 = uv6 = clip.uv;
                if(width <= 0) {
                    return;
                }
    
                // top
                clip = this._clipY(comp, offsetY, uvs[1], uvs[5], height, true);
                height = clip.len;
                uv1 = uv3 = clip.uv;
                if(height <= 0) {
                    return;
                }
    
                // bottom
                clip = this._clipY(comp, offsetY, uvs[1], uvs[5], height, false);
                height = clip.len;
                offsetY = clip.xy;
                uv5 = uv7 = clip.uv;
                if(height <= 0) {
                    return;
                }
                offsetX -= comp.localOffsetX;
                offsetY -= comp.localOffsetY;
            }
        }

        offsetX += comp.globalOffsetX;
        offsetY += comp.globalOffsetY;

        renderData.dataLength += 4;
        renderData.resize(renderData.dataLength, renderData.dataLength / 2 * 3);
        // console.log('renderData', renderData.dataLength, renderData.vertexCount);
        
        const a = 1;
        const b = 0;
        const c = skewFactor;
        const d = 1;
        const tx = -skewFactor;
        const ty = 0;
        
        let w0 = 0;
        let w1 = 0;
        let h0 = 0;
        let h1 = 0;
        
        w1 = 0;
        w0 = w1 + width;
        h0 = 0;
        h1 = h1 + height;
    
        // left bottom
        let x0 = (a * w1) + (c * h1) + tx + offsetX;
        let y0 = (d * h1) + (b * w1) + ty + offsetY;
        // right bottom
        let x1 = (a * w0) + (c * h1) + tx + offsetX;
        let y1 = (d * h1) + (b * w0) + ty + offsetY;
        // left top
        let x2 = (a * w1) + (c * h0) + tx + offsetX;
        let y2 = (d * h0) + (b * w1) + ty + offsetY;
        // right top
        let x3 = (a * w0) + (c * h0) + tx + offsetX;
        let y3 = (d * h0) + (b * w0) + ty + offsetY;

        // left bottom
        let vt = charInfo.addVertex();
        vt.rx = vt.x = x0;
        vt.ry = vt.y = y0;
        vt.u = uv0;
        vt.v = uv1;
        vt.u1 = 0;
        vt.v1 = 0;
        vt.type = type;

        // right bottom
        vt = charInfo.addVertex();
        vt.rx = vt.x = x1;
        vt.ry = vt.y = y1;
        vt.u = uv2;
        vt.v = uv3;
        vt.u1 = 1;
        vt.v1 = 0;
        vt.type = type;

         // left top
        vt = charInfo.addVertex();
        vt.rx = vt.x = x2;
        vt.ry = vt.y = y2;
        vt.u = uv4;
        vt.v = uv5;
        vt.u1 = 0;
        vt.v1 = 1;
        vt.type = type;

         // right top
        vt = charInfo.addVertex();
        vt.rx = vt.x = x3;
        vt.ry = vt.y = y3;
        vt.u = uv6;
        vt.v = uv7;
        vt.u1 = 1;
        vt.v1 = 1;
        vt.type = type;
    }

    static refreshUnderlineInfo(comp: TextMeshLabel, index: number, layout: LayoutResult) {       
        const font = comp.font; 
        let underlineInfo = comp.underLineInfos[index];
        let startChar = comp.charInfos[underlineInfo.startIndex];
        let width = underlineInfo.length;
        let height = Math.max(4, startChar.style.fontSize * font.underLineThickness);
        let offsetX = startChar.x;
        // 不能添加offsetY,否则位置为出现跳动
        let offsetY = startChar.baseY + startChar.y - comp.font.underLineOffset + height * 0.5;
        let skewFactor = 0;

        // if(startChar.style.scriptType == EScriptType.SuperScript) {
        //     offsetY -= (startChar.style.fontSize - startChar.style.realFontSize);
        // }
    
        let uvs = underlineInfo.charInfo.char.uvs;
        // if(underlineInfo.endIndex - underlineInfo.startIndex > 0) {
        // 圆形边框
        //     let uDist = uvs[2] - uvs[0];
        //     let vDist = uvs[5] - uvs[1];
        //     let newUVs = new Float32Array(uvs.slice());
        //     newUVs[2] = newUVs[6] = uvs[0] + uDist * 0.4;  
        //     let endWidth = Math.min(width * 0.4, startChar.realWidth*0.4);
        //     let startX = offsetX;
        //     this.appendQuad(comp, endWidth, height, startX, offsetY, skewFactor, underlineInfo.charInfo, newUVs);

        //     newUVs[0] = newUVs[4] = newUVs[2];
        //     newUVs[2] = newUVs[6] = uvs[0] + uDist * 0.6;
        //     let centWidth = width - endWidth * 2;  
        //     startX += endWidth;  
        //     this.appendQuad(comp, centWidth, height, startX, offsetY, skewFactor, underlineInfo.charInfo, newUVs);

        //     newUVs[0] = newUVs[4] = newUVs[2]; 
        //     newUVs[2] = newUVs[6] = uvs[2];    
        //     startX += centWidth;
        //     this.appendQuad(comp, endWidth, height, startX, offsetY, skewFactor, underlineInfo.charInfo, newUVs);
        // }else{   
            // 方形边框
            let uDist = uvs[2] - uvs[0];
            RECT_UVS[1] = uvs[1];
            RECT_UVS[3] = uvs[3];
            RECT_UVS[5] = uvs[5];
            RECT_UVS[7] = uvs[7];
            RECT_UVS[0] = RECT_UVS[4] = uvs[0] + uDist * 0.4;
            RECT_UVS[2] = RECT_UVS[6] = uvs[0] + uDist * 0.6;
            
            this.appendShadowQuad(comp, width, height, offsetX, offsetY, skewFactor, underlineInfo.charInfo, RECT_UVS);
            this.appendQuad(comp, width, height, offsetX, offsetY, skewFactor, underlineInfo.charInfo, RECT_UVS, ETMQuadType.UnderLine);
        // }
    }

    static refreshStrikeInfo(comp: TextMeshLabel, index: number, layout: LayoutResult) {       
        const font = comp.font; 
        let strikeInfo = comp.strikeInfos[index];
        let startChar = comp.charInfos[strikeInfo.startIndex];
        let width = strikeInfo.length;
        let height = Math.max(4, startChar.style.fontSize * font.strikeThickness);
        let offsetX = startChar.x + startChar.offsetX;
        let baseY = startChar.baseY + startChar.y + strikeInfo.height * 0.5;
        let offsetY = baseY - comp.font.strikeOffset;
        let skewFactor = 0;
    
        let uvs = strikeInfo.charInfo.char.uvs;
        // if(strikeInfo.endIndex - strikeInfo.startIndex > 0) {
        //     let uDist = uvs[2] - uvs[0];
        //     let vDist = uvs[5] - uvs[1];
        //     let newUVs = new Float32Array(uvs.slice());
        //     newUVs[2] = newUVs[6] = uvs[0] + uDist * 0.4;  
        //     let endWidth = Math.min(width * 0.4, startChar.realWidth*0.4);
        //     let startX = offsetX;
        //     this.appendQuad(comp, endWidth, height, startX, offsetY, skewFactor, strikeInfo.charInfo, newUVs);

        //     newUVs[0] = newUVs[4] = newUVs[2];
        //     newUVs[2] = newUVs[6] = uvs[0] + uDist * 0.6;
        //     let centWidth = width - endWidth * 2;  
        //     startX += endWidth;  
        //     this.appendQuad(comp, centWidth, height, startX, offsetY, skewFactor, strikeInfo.charInfo, newUVs);

        //     newUVs[0] = newUVs[4] = newUVs[2]; 
        //     newUVs[2] = newUVs[6] = uvs[2];    
        //     startX += centWidth;
        //     this.appendQuad(comp, endWidth, height, startX, offsetY, skewFactor, strikeInfo.charInfo, newUVs);
        // }else{  
            // 方形边框
            let uDist = uvs[2] - uvs[0];
            RECT_UVS[1] = uvs[1];
            RECT_UVS[3] = uvs[3];
            RECT_UVS[5] = uvs[5];
            RECT_UVS[7] = uvs[7];
            RECT_UVS[0] = RECT_UVS[4] = uvs[0] + uDist * 0.4;
            RECT_UVS[2] = RECT_UVS[6] = uvs[0] + uDist * 0.6;
            
            this.appendShadowQuad(comp, width, height, offsetX, offsetY, skewFactor, strikeInfo.charInfo, RECT_UVS);
            this.appendQuad(comp, width, height, offsetX, offsetY, skewFactor, strikeInfo.charInfo, RECT_UVS, ETMQuadType.DeleteLine);
        // }
    }

    private static getRectUVs(uvs: Float32Array) {
        let uDist = uvs[2] - uvs[0];
        let vDist = uvs[5] - uvs[1];
        let leftU = uvs[0] + uDist * 0.3;
        let topU = uvs[1] + vDist * 0.3;

        RECT_UVS[0] = RECT_UVS[4] = leftU; 
        RECT_UVS[2] = RECT_UVS[6] = leftU + uDist * 0.1; 

        RECT_UVS[1] = RECT_UVS[5] = topU; 
        RECT_UVS[3] = RECT_UVS[7] = topU + vDist * 0.1;

        return RECT_UVS;
    }

    static refreshBackgroundInfo(comp: TextMeshLabel, index: number, layout: LayoutResult) {       
        let backgroundInfo = comp.backgroundInfos[index];
        let startChar = comp.charInfos[backgroundInfo.startIndex];
        let width = backgroundInfo.length;
        let height = backgroundInfo.height;
        let offsetX = startChar.x + startChar.offsetX;
        let offsetY = startChar.startY - backgroundInfo.height;
        let skewFactor = 0;
    
        let uvs = backgroundInfo.charInfo.char.uvs;
        uvs = this.getRectUVs(uvs);
        this.appendShadowQuad(comp, width, height, offsetX, offsetY, skewFactor, backgroundInfo.charInfo, uvs);
        this.appendQuad(comp, width, height, offsetX, offsetY, skewFactor, backgroundInfo.charInfo, uvs, ETMQuadType.Background);
    }

    static refreshMaskInfo(comp: TextMeshLabel, index: number, layout: LayoutResult) {       
        let maskInfo = comp.maskInfos[index];
        let startChar = comp.charInfos[maskInfo.startIndex];
        let width = maskInfo.length;
        let height = maskInfo.height;
        let offsetX = startChar.x + startChar.offsetX;
        let offsetY = startChar.startY - maskInfo.height;
        let skewFactor = 0;
    
        let uvs = maskInfo.charInfo.char.uvs;
        uvs = this.getRectUVs(uvs);
        this.appendShadowQuad(comp, width, height, offsetX, offsetY, skewFactor, maskInfo.charInfo, uvs);
        this.appendQuad(comp, width, height, offsetX, offsetY, skewFactor, maskInfo.charInfo, uvs, ETMQuadType.Mask);
    }

    static updateRenderData (comp: TextMeshLabel, render: __private._cocos_2d_renderer_i_batcher__IBatcher) {
        if (!comp.renderData || !comp.font) {
            return;
        }
        
        if(comp.renderData.vertDirty) {  
            if(comp.dirtyFlag == 0) {
                return;
            }
            
            this.updateVertexData(comp);
            this.updateUVs(comp);
            this.updateColors(comp);
            this.updateOthers(comp);
            comp.updateMaterial();

            // if (JSB) {
            //     comp.renderEntity.nativeObj["vertDirty"] = true;
            //     // comp.renderData["renderDrawInfo"].fillRender2dBuffer(comp.renderData.data);
            // }

            comp.renderData!.vertDirty = false;
            comp.markForUpdateRenderData(false);

            // comp.clearDirtyFlag();
            // console.log("updateRenderData");
        }
    }
}
var RECT_UVS: Float32Array = new Float32Array(8);