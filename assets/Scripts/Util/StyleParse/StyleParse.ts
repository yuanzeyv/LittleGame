
interface IStyle {
    color: string;//字体颜色
    fontSize: number;//字体大小
    isBold: number;//加粗
    isIncline: number;//倾斜
    isUnderline: number;//下划线
    isOutline: number;//是否需要描边
    outlineColor: string;//描边颜色
    outlineWidth: number;//描边宽度
} 
let posMap: Map<number, IStyle> = new Map<number, IStyle>();
posMap.set(1, { color: "#573A21", fontSize: 24, isBold: 0, isIncline: 0, isUnderline: 0, isOutline: 0, outlineColor: "#00ff00", outlineWidth: 2 });
posMap.set(2, { color: "#00ff00", fontSize: 26, isBold: 1, isIncline: 1, isUnderline: 1, isOutline: 1, outlineColor: "#ff0000", outlineWidth: 2 });
posMap.set(10, { color: "#A3865A", fontSize: 24, isBold: 0, isIncline: 0, isUnderline: 0, isOutline: 0, outlineColor: "#629F83", outlineWidth: 2 });
posMap.set(11, { color: "#FFFFFF", fontSize: 20, isBold: 1, isIncline: 0, isUnderline: 0, isOutline: 1, outlineColor: "#000000", outlineWidth: 1 });
posMap.set(12, { color: "#FFFFD2", fontSize: 22, isBold: 0, isIncline: 0, isUnderline: 0, isOutline: 0, outlineColor: "#629F83", outlineWidth: 2 });
posMap.set(13, { color: "#94A6B7", fontSize: 16, isBold: 0, isIncline: 0, isUnderline: 1, isOutline: 1, outlineColor: "#FF0000", outlineWidth: 2 });
posMap.set(888, { color: "#00ffff", fontSize: 24, isBold: 0, isIncline: 1, isUnderline: 0, isOutline: 0, outlineColor: "#00ff00", outlineWidth: 2 });
posMap.set(999, { color: "#30ff55", fontSize: 20, isBold: 0, isIncline: 0, isUnderline: 0, isOutline: 0, outlineColor: "#00ff00", outlineWidth: 2 });
posMap.set(3, { color: "#6A83A1", fontSize: 20, isBold: 1, isIncline: 0, isUnderline: 0, isOutline: 0, outlineColor: "#000000", outlineWidth: 2 });
const eventRegx = /^(click)(\s)*=|(param)(\s)*=/;
const imageAttrReg = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*align(\s)*=|(\s)*offset(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;



export class Parser {
    private _specialSymbolArray: Array<[RegExp, string]> = [];
    private _stack: any = [];
    private _resultObjectArray: any = [];

    constructor() {
        this._specialSymbolArray.push([/&lt;/g, '<']);
        this._specialSymbolArray.push([/&gt;/g, '>']);
        this._specialSymbolArray.push([/&amp;/g, '&']);
        this._specialSymbolArray.push([/&quot;/g, '"']);
        this._specialSymbolArray.push([/&apos;/g, '\'']);
    }
    public parse(htmlString: string) {
        this._resultObjectArray.length = 0;
        this._stack.length = 0;
        let startIndex = 0;
        const length = htmlString.length;
        while (startIndex < length) {
            let tagEndIndex = htmlString.indexOf('>', startIndex);
            let tagBeginIndex = -1;
            if (tagEndIndex >= 0) {
                tagBeginIndex = htmlString.lastIndexOf('<', tagEndIndex);
                const noTagBegin = tagBeginIndex < (startIndex - 1);
                if (noTagBegin) {
                    tagBeginIndex = htmlString.indexOf('<', tagEndIndex + 1);
                    tagEndIndex = htmlString.indexOf('>', tagBeginIndex + 1);
                }
            }
            if (tagBeginIndex < 0) {
                this._stack.pop();
                this._processResult(htmlString.substring(startIndex));
                startIndex = length;
            } else {
                let newStr = htmlString.substring(startIndex, tagBeginIndex);
                const tagStr = htmlString.substring(tagBeginIndex + 1, tagEndIndex);
                if (tagStr === '') newStr = htmlString.substring(startIndex, tagEndIndex + 1);
                this._processResult(newStr);
                if (tagEndIndex === -1) {
                    // cc.error('The HTML tag is invalid!');
                    tagEndIndex = tagBeginIndex;
                } else if (htmlString.charAt(tagBeginIndex + 1) === '/') {
                    this._stack.pop();
                } else {
                    this._addToStack(tagStr);
                }
                startIndex = tagEndIndex + 1;
            }
        } 
        return this._resultObjectArray;
    }

    
    private _processEventHandler (eventString: string) {
        const obj = {};
        let index = 0;
        let isValidTag = false;
        let eventNames = eventRegx.exec(eventString);
        while (eventNames) {
            let eventName = eventNames[0];
            let eventValue = '';
            isValidTag = false;
            eventString = eventString.substring(eventName.length).trim();
            if (eventString.charAt(0) === '"') {
                index = eventString.indexOf('"', 1);
                if (index > -1) {
                    eventValue = eventString.substring(1, index).trim();
                    isValidTag = true;
                }
                index++;
            } else if (eventString.charAt(0) === '\'') {
                index = eventString.indexOf('\'', 1);
                if (index > -1) {
                    eventValue = eventString.substring(1, index).trim();
                    isValidTag = true;
                }
                index++;
            } else {
                // skip the invalid attribute value
                const match = /(\S)+/.exec(eventString);
                if (match) {
                    eventValue = match[0];
                } else {
                    eventValue = '';
                }
                index = eventValue.length;
            }

            if (isValidTag) {
                eventName = eventName.substring(0, eventName.length - 1).trim();
                obj[eventName] = eventValue;
            }

            eventString = eventString.substring(index).trim();
            eventNames = eventRegx.exec(eventString);
        }

        return obj;
    }

    

    // find the right part of the first pair of following quotations.
    private getRightQuotationIndex (remainingArgument: string) {
        let leftQuot = -1;
        let rightQuot = -1;
        // Skip a pair of quotations for avoiding spaces in image name are detected.
        const leftSingleQuot = remainingArgument.indexOf('\'');
        const leftDoubleQuot = remainingArgument.indexOf('"');

        const useSingleQuot = leftSingleQuot  > -1 && (leftSingleQuot < leftDoubleQuot || leftDoubleQuot === -1);
        const useDoubleQuot = leftDoubleQuot > -1 && (leftDoubleQuot < leftSingleQuot || leftSingleQuot === -1);
        if (useSingleQuot) {
            leftQuot = leftSingleQuot;
            rightQuot = remainingArgument.indexOf('\'', leftQuot + 1 >= remainingArgument.length ? -1 : leftQuot + 1);
        } else if (useDoubleQuot) {
            leftQuot = leftDoubleQuot;
            rightQuot = remainingArgument.indexOf('"', leftQuot + 1 >= remainingArgument.length ? -1 : leftQuot + 1);
        }

        return rightQuot;
    }

    private _attributeToObject(attribute: string) {
        const obj:any = {};
        let tagName = '';
        let nextSpace = 0;
        let eventHanlderString = '';
        let header = /^id(\s)*=/.exec(attribute);
        if (header) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();
            if (attribute === '') {
                return obj;
            }
            nextSpace = attribute.indexOf(' ');
            obj.id = parseInt(attribute);
            if (nextSpace > -1) {
                eventHanlderString = attribute.substring(nextSpace + 1).trim();
                obj.event = this._processEventHandler(eventHanlderString);
            }
            return obj;
        }

        header = /^(br(\s)*\/)/.exec(attribute);
        if (header && header[0].length > 0) {
            tagName = header[0].trim();
            if (tagName.startsWith('br') && tagName[tagName.length - 1] === '/') {
                obj.isNewLine = true;
                this._resultObjectArray.push({ text: '', style: { isNewLine: true } });
                return obj;
            }
        }

        header = /^(img(\s)*src(\s)*=[^>]+\/)/.exec(attribute);
        let remainingArgument = '';
        let rightQuot = -1;
        if (header && header[0].length > 0) {
            tagName = header[0].trim();
            if (tagName.startsWith('img') && tagName[tagName.length - 1] === '/') {
                header = imageAttrReg.exec(attribute);
                let tagValue;
                let isValidImageTag = false;
                obj.img = {}
                while (header) {
                    // skip the invalid tags at first
                    attribute = attribute.substring(attribute.indexOf(header[0]));
                    tagName = attribute.substr(0, header[0].length);
                    const originTagNameLength = tagName.length;
                    tagName = tagName.replace(/[^a-zA-Z]/g, '').trim();
                    tagName = tagName.toLowerCase();

                    // remove space and = character
                    remainingArgument = attribute.substring(originTagNameLength).trim();
                    if (tagName === 'src') {
                        rightQuot = this.getRightQuotationIndex(remainingArgument);
                    } else {
                        rightQuot = -1;
                    }
                    nextSpace = remainingArgument.indexOf(' ', rightQuot + 1 >= remainingArgument.length ? -1 : rightQuot + 1);
                    tagValue = (nextSpace > -1) ? remainingArgument.substr(0, nextSpace) : remainingArgument;
                    attribute = remainingArgument.substring(nextSpace).trim();

                    if (tagValue.endsWith('/')) {
                        tagValue = tagValue.slice(0, -1);
                    }
                    if (tagName === 'src') {
                        switch (tagValue.charCodeAt(0)) {
                        case 34: // "
                        case 39: // '
                            isValidImageTag = true;
                            tagValue = tagValue.slice(1, -1);
                            break;
                        default:
                            break;
                        }
                        obj.img.isImage = true;
                        obj.img.src = tagValue;
                    } else if (tagName === 'height') {
                        obj.img.imageHeight = parseInt(tagValue);
                    } else if (tagName === 'width') {
                        obj.img.imageWidth = parseInt(tagValue);
                    } else if (tagName === 'align') {
                        switch (tagValue.charCodeAt(0)) {
                        case 34: // "
                        case 39: // ' 
                            tagValue = tagValue.slice(1, -1);
                            break;
                        default:
                            break;
                        }
                        obj.img.imageAlign = tagValue.toLowerCase();
                    } else if (tagName === 'offset') {
                        obj.img.imageOffset = tagValue;
                    } else if (tagName === 'click') {
                        obj.event = this._processEventHandler(`${tagName}=${tagValue}`);
                    }  
                    if (obj.event && tagName === 'param') {
                        obj.event[tagName] = tagValue.replace(/^"|"$/g, '');
                    } 
                    header = imageAttrReg.exec(attribute);
                } 
                if (isValidImageTag && obj.img.isImage) {
                    this._resultObjectArray.push({ text: '', style: obj });
                } 
                return {};
            }
        }

        header = /^(on)(\s)*/.exec(attribute);
        if (header && header[0].length > 0) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();
            switch (tagName[0]) {
            case 'u':
                obj.underline = true;
                break;
            case 'i':
                obj.italic = true;
                break;
            case 'b':
                obj.bold = true;
                break;
            default:
                break;
            }
            if (attribute === '')
                return obj; 

            obj.event = this._processEventHandler(attribute);
        }

        return obj;
    } 

    private _addToStack(attribute: string) {
        const obj = this._attributeToObject(attribute);

        if (this._stack.length === 0) {
            this._stack.push(obj);
        } else {
            if (obj.isNewLine || obj.isImage)
                return;
            // for nested tags
            const previousTagObj = this._stack[this._stack.length - 1];
            for (const key in previousTagObj) {
                if (!(obj[key])) {
                    obj[key] = previousTagObj[key];
                }
            }
            this._stack.push(obj);
        }
    }

    private _processResult(value: string) {
        if (value.length === 0)
            return;

        value = this._escapeSpecialSymbol(value);
        if (this._stack.length > 0) {
            this._resultObjectArray.push({ text: value, style: this._stack[this._stack.length - 1] });
        } else {
            this._resultObjectArray.push({ text: value });
        }
    }

    private _escapeSpecialSymbol(str: string) {
        for (const symbolArr of this._specialSymbolArray) {
            const key = symbolArr[0];
            const value = symbolArr[1];
            str = str.replace(key, value);
        }

        return str;
    }
}

//获取解析后的字符长度  
export function parseStyleStrLength(str: string): number {
    let format: [{ text: string, style: { id: number } }] = new Parser().parse(str);
    let count: number = 0;
    for (let i = 0; i < format.length; i++) {
        let element: { 
            text: string,
            style:{ id?: number,
                    isNewLine?:number,
                    event?:{click:string,param:string},
                    img?:{imageAlign?:string,imageHeight?:string,imageOffset?:string,imageWidth?:string,isImage?:boolean,src?:string}
                    }} = format[i];
        
        if(element.style.id) {//Id类型
            count += element.text.length; 
        }else if(element.style.img && element.style.img.isImage){//是否是图片
            count ++; 
        }   
    }
    return count;
}

//传出解析过后的字符串
export function parseStyle(str: string, count: number = 20000): string { 
    let format = new Parser().parse(str);
    let ret: string = "";
    for (let i = 0; i < format.length && count > 0; i++) {
        let element: { 
            text: string,
            style:{ id?: number,
                    isNewLine?:number,
                    event?:{click:string,param:string},
                    img?:{imageAlign?:string,imageHeight?:string,imageOffset?:string,imageWidth?:string,isImage?:boolean,src?:string}
                    }} = format[i];
                
        let result: string = element.text.substring(0, count);//
        let tempStr: string = result;
        if(element.style.isNewLine){//换行
            tempStr = `${tempStr}<br/>`;
        }else if(element.style.img && element.style.img.isImage){//是否是图片
            let str:string = "<img"
            if(element.style.img.src)
                str = `${str} src='${element.style.img.src}' `;
            if(element.style.img.imageAlign)
                str = `${str} align=${element.style.img.imageAlign}`;
            if(element.style.img.imageHeight)
                str = `${str} height=${element.style.img.imageHeight}`;
            if(element.style.img.imageWidth)
                str = `${str} width=${element.style.img.imageWidth}`;
            if(element.style.img.imageOffset)
                str = `${str} offset=${element.style.img.imageOffset}`;
            if(element.style.event && element.style.event.click){
                str = `${str} click='${element.style.event.click}'`; 
                if(element.style.event.param)
                    str =` param='${element.style.event.param || ""} `  
            }
            str = ` ${str} />` 
            tempStr = `${tempStr} ${str}`; 
            count -= 1;
        } else{
            let styleID: number = element.style?.id || 1;
            let style: IStyle | undefined = posMap.get(styleID);
            if (style != undefined) {
                if (style.color != "")
                    tempStr = `<color=${style.color}>${tempStr}</color>`;
                if (style.fontSize != -1)
                    tempStr = `<size=${style.fontSize}>${tempStr}</size>`;
                if (style.isBold != 0)
                    tempStr = `<b>${tempStr}</b>`;
                if (style.isIncline != 0)
                    tempStr = `<i>${tempStr}</i>`;
                if (style.isUnderline != 0)
                    tempStr = `<u>${tempStr}</u>`;
                if (style.isOutline != 0) {
                    tempStr = `<outline color=${style.outlineColor} width=${style.outlineWidth}>${tempStr}</outline>`;
                }
            }
            if(element.style.event){
                tempStr = `<on click='${element.style.event.click}' param='${element.style.event.param || ""}' >${tempStr}</on>`;
            }
            count -= result.length;
        }
        ret += tempStr;
    }
    return ret;
}