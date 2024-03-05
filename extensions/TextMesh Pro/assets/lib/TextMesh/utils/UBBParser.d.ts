declare type ValueType = string | number | boolean;
declare type TagType = "node" | "text" | "root";
export declare class TagNode {
    type: TagType;
    name: string;
    value: ValueType;
    attributes: {
        [key: string]: ValueType;
    };
    text: string;
    children: TagNode[];
    _parent?: TagNode;
    _closed: boolean;
    constructor(name?: string);
}
export declare class UBBParser {
    private _text;
    private _root;
    private _currentNode;
    private _tagInfo;
    lastColor: string;
    lastSize: string;
    linkUnderline: boolean;
    linkColor: string;
    static inst: UBBParser;
    constructor();
    private exception;
    protected addTextNode(text: string): void;
    protected addNode(name: string, value: ValueType): void;
    protected addAttribute(name: string, value: ValueType): void;
    protected setNodeText(value: string): void;
    protected closeNode(name: string): boolean;
    private isValidChar;
    private getTagName;
    private getTagValue;
    private getAttribute;
    protected getText(startPos: number, tag_s: string, tag_e: string): number;
    protected getTail(startPos: number, tag_s: string, tag_e: string): number;
    parse(text: string, ubb?: boolean): TagNode;
}
export {};
