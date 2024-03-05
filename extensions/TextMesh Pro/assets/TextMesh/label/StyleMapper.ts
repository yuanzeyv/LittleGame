import { EScriptType } from "./types";

export var StyleMapper = {   
    "tagMap": {
        "br": "\n",
    },
    "sup": {
        field: "_$scriptType",
        value: EScriptType.SuperScript,
    },
    "sub": {
        field: "_$scriptType",
        value: EScriptType.SubScript,
    },
    "u": {
        field: "_$underline",
        value: true,
    },
    "s": {
        field: "_$strike",
        value: true,
    },
    "i": {
        field: "_$italic",
        value: true,
    },
    "b": {
        field: "_$dilate",
        value: 0.6,
    },
    "bg": {
        field: "_$background",
        value: true,
    }, 

    "color-lt": {
        field: "_$colorLT",
    },
    "color-lb": {
        field: "_$colorLB",
    },
    "color-rt": {
        field: "_$colorRT",
    },
    "color-rb": {
        field: "_$colorRB",
    },
    "color": {
        field: "_$color",
        value: 0xffffff,
        attributes: {
            "lt": {
                mapper: "color-lt",
            },
            "lb": {
                mapper: "color-lb",
            },
            "rt": {
                mapper: "color-rt",
            },
            "rb": {
                mapper: "color-rb",
            },
        }
    },

    "shadow-color": {
        field: "_$shadowColor",
    },  
    "shadow-x": {
        field: "_$shadowX",
    },
    "shadow-y": {
        field: "_$shadowY",
    },
    "shadow-blur": {
        field: "_$shadowBlur",
    },
    "shadow": {
        field: "_$shadow",
        value: 0.1,
        attributes: {
            color: {
                mapper: "shadow-color",
            },
            x: {
                mapper: "shadow-x",
            },
            y: {
                mapper: "shadow-y",
            },
            blur: {
                mapper: "shadow-blur",
                // field: "_$shadowBlur",
            }
        }
    },
    
    "stroke-color": {
        field: "_$strokeColor",
    },
    "stroke-blur": {
        field: "_$strokeBlur",
    },
    "stroke": {
        field: "_$stroke",
        attributes: {
            color: {
                mapper: "stroke-color",
            },
            blur: {
                mapper: "stroke-blur",
            }
        }
    },

    "outline-color": {
        field: "_$strokeColor",
    },
    "outline-blur": {
        field: "_$strokeBlur",
    },
    "outline": {
        field: "_$stroke",
        attributes: {
            color: {
                mapper: "stroke-color",
            },
            blur: {
                mapper: "stroke-blur",
            }
        }
    },

    "dilate": {
        field: "_$dilate",
    },
    "background-color": {
        field: "_$backgroundColor",
    },
    "background": {
        field: "_$background",
        value: true,
        attributes: {
            color: {
                mapper: "background-color",
            },
        },
    },
    "mask-color": {
        field: "_$maskColor",
    },
    "mask": {
        field: "_$mask",
        value: true,
        attributes: {
            color: {
                mapper: "mask-color",
            },
        },
    },

    "font-size": {
        field: "_$fontSize",
    },   
    "font": {
        field: "_$font",
        value: true,
        attributes: {
            size: {
                mapper: "font-size",
            },
        },
    },
}