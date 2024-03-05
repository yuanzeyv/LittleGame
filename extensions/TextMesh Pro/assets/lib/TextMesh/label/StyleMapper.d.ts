import { EScriptType } from "./types";
export declare var StyleMapper: {
    tagMap: {
        br: string;
    };
    sup: {
        field: string;
        value: EScriptType;
    };
    sub: {
        field: string;
        value: EScriptType;
    };
    u: {
        field: string;
        value: boolean;
    };
    s: {
        field: string;
        value: boolean;
    };
    i: {
        field: string;
        value: boolean;
    };
    b: {
        field: string;
        value: number;
    };
    bg: {
        field: string;
        value: boolean;
    };
    "color-lt": {
        field: string;
    };
    "color-lb": {
        field: string;
    };
    "color-rt": {
        field: string;
    };
    "color-rb": {
        field: string;
    };
    color: {
        field: string;
        value: number;
        attributes: {
            lt: {
                mapper: string;
            };
            lb: {
                mapper: string;
            };
            rt: {
                mapper: string;
            };
            rb: {
                mapper: string;
            };
        };
    };
    "shadow-color": {
        field: string;
    };
    "shadow-x": {
        field: string;
    };
    "shadow-y": {
        field: string;
    };
    "shadow-blur": {
        field: string;
    };
    shadow: {
        field: string;
        value: number;
        attributes: {
            color: {
                mapper: string;
            };
            x: {
                mapper: string;
            };
            y: {
                mapper: string;
            };
            blur: {
                mapper: string;
            };
        };
    };
    "stroke-color": {
        field: string;
    };
    "stroke-blur": {
        field: string;
    };
    stroke: {
        field: string;
        attributes: {
            color: {
                mapper: string;
            };
            blur: {
                mapper: string;
            };
        };
    };
    "outline-color": {
        field: string;
    };
    "outline-blur": {
        field: string;
    };
    outline: {
        field: string;
        attributes: {
            color: {
                mapper: string;
            };
            blur: {
                mapper: string;
            };
        };
    };
    dilate: {
        field: string;
    };
    "background-color": {
        field: string;
    };
    background: {
        field: string;
        value: boolean;
        attributes: {
            color: {
                mapper: string;
            };
        };
    };
    "mask-color": {
        field: string;
    };
    mask: {
        field: string;
        value: boolean;
        attributes: {
            color: {
                mapper: string;
            };
        };
    };
    "font-size": {
        field: string;
    };
    font: {
        field: string;
        value: boolean;
        attributes: {
            size: {
                mapper: string;
            };
        };
    };
};
