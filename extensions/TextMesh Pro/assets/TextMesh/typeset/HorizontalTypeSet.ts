import { TextMeshLabel } from "../label/TextMeshLabel";
import { EScriptType, ETextHorizontalAlign, ETextOverflow, ETextVerticalAlign } from "../label/types";
import { CharInfo } from "../label/CharInfo";
import { isCJK } from "../libs/hanzi/isCJK";
import { LayoutResult } from "../types/ITypeSet";
import { ItalicSkewFactor } from "../utils/Const";
import { director, v3, Vec2, Vec3 } from "cc";
import { HitTestResult } from "../types/types";
import { ALLBIAODIAN, LINEBREAKING, LINELEADING } from "../libs/hanzi/code";
import { BaseTypeSet } from "./BaseTypeSet";

const vec3_temp1 = v3();
const vec3_temp = v3();

export class HorizontalTypeSet extends BaseTypeSet {
    hitTest(comp: TextMeshLabel, touchPos: Vec2): HitTestResult {
        let utr = comp.uiTransform;
        var camera = director.root!.batcher2D.getFirstRenderCamera(comp.node);
        
        vec3_temp.set(touchPos.x, touchPos.y, 0);
        camera.screenToWorld(vec3_temp1, vec3_temp);
        utr.convertToNodeSpaceAR(vec3_temp1, vec3_temp);

        let x = vec3_temp.x - comp.globalOffsetX;
        let y = vec3_temp.y - comp.globalOffsetY;

        let layout = comp.layoutResult;
        let ey = 0;
        let sy = ey;
        let yIdx = -1;
        for(let li=0;li<layout.lines.length;li++) {
            ey = ey - layout.linesHeight[li];
            if(y <= sy && y >= ey) {
                yIdx = li;
                break;
            }
            sy = ey;
        }
        if(yIdx >= 0) {
            let line = layout.lines[yIdx];
            
            this.hitTestResult.result = false;
            for(let ci=line[0];ci<=line[1];ci++) {
                let char = comp.charInfos[ci];
                if(x >= char.x + char.offsetX && x <= char.x + char.offsetX + char.w + char.sw) {
                    this.hitTestResult.result = true;
                    this.hitTestResult.accurate = false;
                    this.hitTestResult.charInfo = char;
                    if(y >= char.y + char.offsetY && y <= char.y + char.offsetY + char.h + comp.lineSpace) {
                        this.hitTestResult.accurate = true;
                    }
                    return this.hitTestResult;
                }
            }
        }
        
        return null;
    }

    private processRTL(comp: TextMeshLabel, from: number, to: number) {
        // if(comp.RTL) {
            let chars = comp.charInfos;
            let allWords: number[][] = [];
            let word: number[] = [];
            let lastWhitSpaceIdx = -1;
            for(let i=from;i<=to;i++) {
                let last = i == to;
                let charInfo = chars[i];

                if(ALLBIAODIAN.indexOf(charInfo.char.code) >= 0) {
                    if(lastWhitSpaceIdx < 0) {
                        allWords.push(word);
                        word = [];
                        lastWhitSpaceIdx = i;
                    }
                    word.push(i);
                }else{
                    if(lastWhitSpaceIdx >= 0) {
                        allWords.push(word);
                        word = [];
                        lastWhitSpaceIdx = -1;
                    }
                    word.push(i);
                }

                if(last) {
                    word.push(i);
                    allWords.push(word);
                } 
            }

            let width = 0;
            allWords.reverse();
            let len = allWords.length;
            for(let i=0;i<len;i++) {
                let word = allWords[i];
                for(let j=0;j<word.length;j++) {
                    let char = comp.charInfos[word[j]];
                    char.x = width;
                    width += char.w;
                    if(char.style.italic && j+1<word.length) {
                        let nchar = comp.charInfos[word[j+1]];
                        if(!nchar.style.italic) {
                            width += char.sw;
                        }
                    }
                }
            }
        // }
    }

    layout(comp: TextMeshLabel): LayoutResult {
        if(!comp.font) {
            return null;
        }

        this.reset();
        
        let result:LayoutResult = null; 
        switch(comp.overflow) {
            case ETextOverflow.None:
                result = this.updateInResizeWidthMode(comp);
                break;
            case ETextOverflow.Clamp:
                result = this.updateInClampMode(comp);
                break;
            case ETextOverflow.ResizeHeight:
                result = this.updateInResizeHeightMode(comp);
                break;
            case ETextOverflow.Shrink:
                result = this.updateInShrinkMode(comp);
                break;
        }

        if(comp.charInfos.length > 0)  {
            this.updateGloabl(comp);
            this.horizontalLayout(comp, result);
            this.verticalLayout(comp, result);
            this.layoutSlots(comp, result);
        }

        return result;
    }

    private updateGloabl(comp: TextMeshLabel) {
        let trans = comp.uiTransform;
        comp.localOffsetX = 0;
        comp.localOffsetY = 0;
        comp.globalOffsetX = -trans.width * trans.anchorX;
        comp.globalOffsetY = trans.height * (1 - trans.anchorY);
    }

    private updateInClampMode(comp: TextMeshLabel): LayoutResult {
        return this.updateInWarpMode(comp, 1, false);
    }

    private preProcessVertex(comp: TextMeshLabel, charInfo: CharInfo, scale: number) {
        let hasCalced = charInfo.cjk != null;
        if(hasCalced) {
            return;
        }

        charInfo.cjk = isCJK(charInfo.char.code);
        let ratio = charInfo.slot ? 1 : charInfo.style.realFontSize / comp.font.fontSize * scale;
        let scaleX = charInfo.scale = ratio * comp.aspect;
        
        let isBreak = charInfo.char.code == "\n";
        let isSpace = charInfo.char.code == " ";
        if(isBreak || isSpace) {
            charInfo.visibleChar = false;
            charInfo.w = charInfo.realWidth = isBreak ? 0 : charInfo.char.width * scaleX;
            charInfo.h = charInfo.realHeight = charInfo.style.realFontSize;
            charInfo.sw = 0;
            charInfo.sw1 = 0;
            charInfo.glyphLeft = charInfo.glyphRight = 0;
            charInfo.descent = 0;
            charInfo.offsetX = charInfo.offsetY = 0;
            return;
        }

        let width = charInfo.char.width;
        let height = charInfo.char.height;
        let glyphWidth = charInfo.char.glyphWidth;
        let glyphHeight = charInfo.char.glyphHeight;
        let descent = charInfo.char.descent;
        let ascent = charInfo.char.ascent;
        let glyphAdvance = charInfo.char.glyphAdvance;
        let glyphLeft = charInfo.char.glyphLeft;

        if(charInfo.slot) {
            width = charInfo.slot.width;
            height = charInfo.slot.height;
            glyphWidth = width;
            glyphHeight = height;
            descent = 0;
            charInfo.glyphLeft = 0;
            charInfo.glyphRight = 0;

            if(charInfo.slot.fixed) {
                scaleX = 1;
                ratio = 1;
            }
        }else{            
            charInfo.glyphLeft = glyphLeft * scaleX;
            if(glyphAdvance < glyphWidth) {
                charInfo.glyphRight = (glyphWidth - glyphAdvance - glyphLeft) * scaleX;
            }else{
                charInfo.glyphRight = 0;
            }
        }
        charInfo.ascent = ascent * ratio;
        charInfo.descent = descent * ratio;        
        charInfo.fixedY = (height - glyphHeight) * ratio;
        
        // 计算真实宽高
        if(!charInfo.rotate) {
            charInfo.realWidth = width * scaleX;
            charInfo.realHeight = height * ratio;
            charInfo.offsetY = -descent * ratio;

            if(charInfo.slot) {
                charInfo.w = charInfo.realWidth;
                charInfo.h = charInfo.realHeight;
            }else{
                charInfo.w = glyphAdvance * scaleX;
                charInfo.h = glyphHeight * ratio;
            } 
        }else{
            charInfo.realWidth = height * scaleX;
            charInfo.realHeight = width * ratio;
            charInfo.offsetY = -descent * ratio;

            if(charInfo.slot) {
                charInfo.w = charInfo.realHeight;
                charInfo.h = charInfo.realWidth;
            }else{
                charInfo.w = glyphHeight * scaleX;
                charInfo.h = glyphAdvance * ratio;
            }
        }       

        if(comp.equalWidth) {
            let w = charInfo.w;
            charInfo.w = comp.fontSize;
            charInfo.glyphLeft = -(comp.fontSize - w) * 0.5;
            charInfo.glyphRight = 0;
        }

        charInfo.sw = 0;
        if(charInfo.style.italic) {
            charInfo.sw = charInfo.realHeight * ItalicSkewFactor;
            charInfo.sw1 = charInfo.descent * ItalicSkewFactor;
        }
    }

    private calcNextBreakInfo(comp: TextMeshLabel,index: number, currentX: number, maxWidth: number, scale: number, autoBreak: boolean) {
        const chars = comp.charInfos;
        currentX += chars[index].glyphLeft;

        if(!comp.multiline) {
            autoBreak = false;
        }

        let totalWidth = currentX;
        let oldTotalWidth = totalWidth;
        let oldIndex = -1;
        let oldHeight = 0;
        let oldDescent = 0;
        let oldAscent = 0;
        let oldMaxHeight = 0;
        let continueSpace = 0;
        let letterSpace = comp.letterSpace;

        for(let vi=index;vi<chars.length;vi++) {
            let preChar = vi-1>=0 ? chars[vi-1] : null;
            let charInfo = chars[vi];       
     
            this.preProcessVertex(comp, charInfo, scale); 
            if(charInfo.visibleChar) {
                let height = 0;
                height = charInfo.h; 
                this.breakLineInfo.lineHeight = Math.max(height, this.breakLineInfo.lineHeight);
                this.breakLineInfo.maxDescent = Math.max(charInfo.descent, this.breakLineInfo.maxDescent);
                this.breakLineInfo.maxAscent = Math.max(charInfo.ascent, this.breakLineInfo.maxAscent);
                this.breakLineInfo.maxHeight = Math.max(this.breakLineInfo.maxHeight, charInfo.realHeight);
            }
            
            let isBreak = charInfo.char.code == "\n";
            if(isBreak && vi == index) {
                this.breakLineInfo.index = vi;
                break;
            }

            let isSpace = charInfo.char.code == " ";
            if(isSpace) {
                continueSpace++;
            }else{
                continueSpace = 0;
            }

            // 行宽超过最大宽度
            if(autoBreak && continueSpace != 1 && totalWidth + charInfo.w + charInfo.sw + letterSpace + charInfo.glyphRight > maxWidth) {
                let useOld = oldIndex >= 0;
                // 下一行再显示
                this.breakLineInfo.index = useOld ? oldIndex : vi - 1;
                totalWidth = oldTotalWidth;
                if(!useOld) {
                    totalWidth += charInfo.sw + charInfo.glyphRight;
                }
                if(vi == index) {
                    this.breakLineInfo.index = vi;
                }else{
                    this.breakLineInfo.lineHeight = oldHeight;
                    this.breakLineInfo.maxDescent = oldDescent;
                    this.breakLineInfo.maxAscent = oldAscent;
                    this.breakLineInfo.maxHeight = oldMaxHeight;
                }
                break;
            }

            // 判断宽带后完成后，判断是否需要清除单词换行信息
            if(isSpace || preChar && (preChar.cjk != charInfo.cjk || preChar.cjk && charInfo.cjk)) {
                oldIndex = -1;
            }

            // 更新old信息
            totalWidth += charInfo.w;
            oldHeight = this.breakLineInfo.lineHeight;
            oldDescent = this.breakLineInfo.maxDescent;
            oldAscent = this.breakLineInfo.maxAscent;
            oldMaxHeight = this.breakLineInfo.maxHeight;

            // 检查单词换行
            let isBreaking = LINEBREAKING.indexOf(charInfo.char.code) >= 0;
            let isLeading = LINELEADING.indexOf(charInfo.char.code) >= 0;
            let charDifference = comp.breakWestern && preChar && preChar.cjk != charInfo.cjk;
            if(vi != index && !isLeading && comp.autoWarp && (isBreaking || charDifference)) {
                let offset = 0;
                let offsetWidth = 0;
                let usePreChar = isSpace || charDifference;
                // 右对齐，末尾空格在下一行显示
                if(usePreChar && !(comp.horizontalAlign == ETextHorizontalAlign.Right && vi > index)) {
                    offset = -1;
                    offsetWidth = -charInfo.w;
                }
                
                // 单词结束，表示可以在当前行显示
                oldIndex = vi + offset;
                oldTotalWidth = totalWidth + offsetWidth;
                oldHeight = this.breakLineInfo.lineHeight;
                oldDescent = this.breakLineInfo.maxDescent;
                oldAscent = this.breakLineInfo.maxAscent;
                oldMaxHeight = this.breakLineInfo.maxHeight;
            }

            if(vi+1 < chars.length) {
                totalWidth += letterSpace;
                
                let nextChar2 = chars[vi+1];
                this.preProcessVertex(comp, nextChar2, scale);

                isBreak = nextChar2.char.code == "\n";
                totalWidth += this.getWidthExt(charInfo, nextChar2);

                // 如果最后一个字符遇到前置字符，提前换行
                if(isBreak ||
                    autoBreak && 
                    (totalWidth + nextChar2.w + nextChar2.sw + nextChar2.glyphRight > maxWidth) && 
                    LINELEADING.indexOf(nextChar2.char.code) >= 0) {
                    let useOld = oldIndex >= 0;
                    // 下一行再显示
                    this.breakLineInfo.index = useOld ? oldIndex : vi;
                    if(isBreak) {
                        this.breakLineInfo.index++;
                    }
                    totalWidth = oldTotalWidth;
                    if(useOld) {
                        totalWidth += charInfo.sw + charInfo.glyphRight;
                        this.breakLineInfo.index = oldIndex;
                    }

                    this.breakLineInfo.lineHeight = oldHeight;
                    this.breakLineInfo.maxDescent = oldDescent;
                    this.breakLineInfo.maxAscent = oldAscent;
                    this.breakLineInfo.maxHeight = oldMaxHeight;
                    break;
                }
            }else{
                this.breakLineInfo.index = vi;
                totalWidth += charInfo.sw;
                break;
            }
        }

        this.breakLineInfo.lineIndex++;
        return this.breakLineInfo;
    }    

    private getWidthExt(preChar: CharInfo, charInfo: CharInfo) {
        if(preChar) {
            if(preChar.style.scriptType != EScriptType.SuperScript && charInfo.style.scriptType == EScriptType.SuperScript) {
                return preChar.sw;
            }else if(preChar.style.scriptType != EScriptType.SubScript && charInfo.style.scriptType == EScriptType.SubScript){
                return preChar.sw1;
            }

            if(!charInfo.style.italic && preChar.style.italic) {
                return preChar.sw;
            }
        }
        return 0;
    }

    private updateInWarpMode(comp: TextMeshLabel, scale = 1, autoBreak = true): LayoutResult {
        // 初始化
        comp.globalOffsetX = comp.globalOffsetY = 0;

        this.breakLineInfo.lineIndex = 0;

        const trans = comp.uiTransform!;
        let maxWidth = trans.width - comp.padding.left - comp.padding.right;

        let lineHeight = 0;
        let maxHeight = 0;

        let chars = comp.charInfos;
        let totalX = comp.padding.left;
        let baseY = -comp.padding.top;
        let startY = baseY;
        // 当前行起始索引，from,to
        let line:[number, number] = [0, 0];
        // 所有行
        let lines:number[][] = [line];
        // 是否新行
        let newLine = true;
        let boundHeight = 0;
        let boundWidth = 0;
        let lastMaxDescent = 0;
        
        let linesHeight: number[] = [];
        let linesWidth: number[] = [];

        for(let i=0;i<chars.length;i++) {            
            let charInfo = chars[i];  

            if(newLine) {
                // 获取下一行数据
                this.calcNextBreakInfo(comp, i, totalX, maxWidth, scale, autoBreak);
            }            

            maxHeight = this.breakLineInfo.maxHeight;
            lineHeight = this.breakLineInfo.lineHeight;

            // 需要在每行计算后下移
            if(newLine) {
                newLine = false;

                let offsetHeight = 0;
                if(lines.length > 1) {
                    offsetHeight = comp.lineSpace;
                }                

                let sy = ((maxHeight - lineHeight) + this.breakLineInfo.maxAscent);
                startY = baseY;
                baseY = baseY - sy - offsetHeight;
            }

            line[1] = i;
            charInfo.line = lines.length - 1;
            charInfo.inline = line[1] - line[0];

            let lastChar = i == chars.length - 1;

            if(this.breakLineInfo.index >= 0 && i == this.breakLineInfo.index) {
                newLine = true;
            }

            let preChar: CharInfo;
            if(line[0] == i) {
                // 第一个字符需要向左偏移glyphLeft， 防止左边被截断
                totalX += charInfo.glyphLeft;
            }else{
                preChar = chars[i-1];
            }
            
            // 换行时需要纠正下x的位置
            let isBreak = charInfo.char.code == "\n";
            // 非行首换行
            if(isBreak && line[0] < i && i > 0) {
                totalX = preChar.x + preChar.realWidth + preChar.sw;
            }
            // 处理上标偏移
            else {
                totalX += this.getWidthExt(preChar, charInfo);
            }

            // 向左偏移glyphLeft
            charInfo.x = totalX - charInfo.glyphLeft;
            charInfo.baseY = baseY;
            charInfo.y = -charInfo.descent;
            charInfo.startY = startY;
            
            // 上标
            if(charInfo.style.scriptType == EScriptType.SuperScript) {                
                charInfo.y += (lineHeight - charInfo.h);
            }            
            
            for(let iu = 0;iu < this.beginUpdateHandlers.length;iu++) {
                this.beginUpdateHandlers[iu].call(this, comp, i, newLine);
            }

            // 当前行宽
            totalX = totalX + charInfo.w + comp.letterSpace * scale;
            if(newLine || lastChar) {
                let lineWidth = this.getWidth(comp, line[0], line[1]);

                // 行宽度需要考虑倾斜宽度
                linesWidth.push(lineWidth);
                linesHeight.push(maxHeight);

                boundHeight += maxHeight;
                if(lines.length > 1) {
                    boundHeight += comp.lineSpace;
                }

                boundWidth = Math.max(lineWidth, boundWidth);               
                if(i + 1 < chars.length) {
                    totalX = comp.padding.left;
                    line = [i + 1, 0];
                    lines.push(line);
                }                
                
                // 添加下划线高度
                if(lastChar && this.underLineInfo.startIndex >= 0 && charInfo.font.keepUnlderLineSpace){
                    let startChar = chars[this.underLineInfo.startIndex];
                    let unlderLineOffset = Math.max(0, startChar.style.fontSize * comp.font.underLineThickness - startChar.style.fontSize * comp.font.underLineOffset);
                    boundHeight += unlderLineOffset;
                }

                for(let iu = 0;iu < this.endUpdateHandlers.length;iu++) {
                    this.endUpdateHandlers[iu].call(this, comp, i);
                }
                
                lineHeight = 0;
                lastMaxDescent = this.breakLineInfo.maxDescent;

                this.breakLineInfo.index = -1;
                this.breakLineInfo.lineHeight = 0;
                this.breakLineInfo.maxDescent = 0;
                this.breakLineInfo.maxHeight = 0;
                this.breakLineInfo.maxAscent = 0;
            }
        }

        return {
            lines,
            maxWidth: boundWidth,
            maxHeight: boundHeight,
            linesHeight,
            linesWidth,
            lastMaxDescent,
        };
    }

    private updateInResizeHeightMode(comp: TextMeshLabel): LayoutResult {
        let result = this.updateInWarpMode(comp);
        const trans = comp.uiTransform!;
        let offsetY = (result.maxHeight - trans.height) * trans.anchorY;
        trans.height = result.maxHeight;
        comp.globalOffsetY += offsetY;
        return result;
    }

    private updateInResizeWidthMode(comp: TextMeshLabel): LayoutResult {
        let result = this.updateInWarpMode(comp, 1, false);
        const trans = comp.uiTransform!;
        trans.width = result.maxWidth;
        trans.height = comp.fixedLineHeight ? comp.lineHeight : result.maxHeight;
        return result;
    }

    private updateInShrinkMode(comp: TextMeshLabel): LayoutResult {
        let result = this.updateInWarpMode(comp);        
        const trans = comp.uiTransform!;
        let scale = 1;
        if(result.lines.length <= 1) {
            if(result.maxWidth > trans.width) {
                scale = trans.width / result.maxWidth;
            }
        }else {
            if(result.maxHeight > trans.height) {
                scale = trans.height / result.maxHeight;
            }
        }

        if(scale != 1) {
            for(let i=0;i<comp.charInfos.length;i++) {
                comp.charInfos[i].cjk = null;
            }

            comp._clearAdditions();
            result = this.updateInWarpMode(comp, scale, true);
        }

        return result;
    }

    private horizontalLayout(comp: TextMeshLabel, result: LayoutResult) {
        if(comp.horizontalAlign == ETextHorizontalAlign.Left) {
            return;
        }

        let align = 0;
        if(comp.horizontalAlign == ETextHorizontalAlign.Center) {
            align = 0.5;
        }else if(comp.horizontalAlign == ETextHorizontalAlign.Right) {
            align = 1;
        }

        const trans = comp.uiTransform!;
        for(let i=0;i<result.lines.length;i++) {
            let line = result.lines[i];
            let endIdx = line[1];
            let offsetX = (trans.width - result.linesWidth[i]) * align;
            for(let wi=line[0];wi<=endIdx;wi++) {
                let v = comp.charInfos[wi];
                v.x += offsetX;
            }
        }
    }

    private verticalLayout(comp: TextMeshLabel, result: LayoutResult) {
        if(comp.overflow == ETextOverflow.ResizeHeight || comp.verticalAlign == ETextVerticalAlign.Top) {
            return;
        }

        const trans = comp.uiTransform!;
        let align = 0;
        if(comp.fixedLineHeight) {
            if(comp.verticalAlign == ETextVerticalAlign.Middle) {
                align = 0.5;
            }else if(comp.verticalAlign == ETextVerticalAlign.Bottom) {
                align = 1;
            }
        }

        let realMaxHeight = result.maxHeight + comp.padding.bottom;
        comp.localOffsetY = (realMaxHeight - trans.height) * align;
        comp.globalOffsetY += comp.localOffsetY;
    }

    private layoutSlots(comp: TextMeshLabel, result: LayoutResult) {
        for(let i=0;i<comp.slots.length;i++) {
            let slot = comp.slots[i];
            let char = comp.charInfos[slot.index];
            let trans = slot.node._uiProps.uiTransformComp;
            trans.width = char.w;
            trans.height = char.h;

            let lineHeight = result.linesHeight[char.line];

            let x = char.x + trans.width * slot.dx;
            let y =  char.baseY + char.y + (trans.height - lineHeight + comp.lineSpace) * slot.dy;
            char.x = x;
            char.y = y;
            slot.node.position = new Vec3(
                x + comp.globalOffsetX + comp.slotOffsetX, 
                y + comp.globalOffsetY + comp.slotOffsetY, 
                0
            );

            // console.log("layoutSlots", slot.node.position);
        }
    }
}