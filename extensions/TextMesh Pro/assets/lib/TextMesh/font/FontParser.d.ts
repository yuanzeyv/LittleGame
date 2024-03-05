export declare type TMFontInfo = {
    id?: number;
    version?: string;
    font?: string;
    atlas?: string;
    charset?: string;
    fontFamily?: string;
    fontSize?: number;
    padding?: number;
    padTrim?: number;
    atlasWidth?: number;
    atlasHeight?: number;
    dynamic?: number;
    staticChannels?: number;
    underLineOffset?: number;
    keepUnlderLineSpace?: number;
    underLineThickness?: number;
    strikeOffset?: number;
    strikeThickness?: number;
    scriptThickness?: number;
    chars: {
        [code: string]: TMFCharInfo;
    };
};
export declare type TMFCharInfo = {
    channelID?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    size?: number;
    glyphWidth?: number;
    glyphHeight?: number;
    glyphAdvance?: number;
    glyphLeft?: number;
    glyphRight?: number;
    ascent?: number;
    descent?: number;
};
export declare class FontParser {
    private static _sid;
    private static _fonts;
    static parse(uuid: string, data: string): TMFontInfo;
}
