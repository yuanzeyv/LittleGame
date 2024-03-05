import { game } from "cc";
import { TextStyle } from "./TextStyle";

export class StyleManager {
    static TMF_STYLE_CHANGED = "tmf_style_changed";

    private static _styles: { [key: string]: TextStyle } = {};

    private static _onStyleChanged() {
        game.emit(StyleManager.TMF_STYLE_CHANGED);
    }

    static removeAll() {
        this._styles = {};

        this._onStyleChanged();
    }

    static registByStyle(key: string, style: TextStyle) {
        this._styles[key] = style;

        this._onStyleChanged();
    }

    static registByStyles(key: string[], style: TextStyle[]) {
        for (let i = 0; i < key.length; i++) {
            this._styles[key[i]] = style[i];
        }

        this._onStyleChanged();
    }

    static registByKeyJson(key: string, style: string) {
        let textStyle = new TextStyle();
        try {
            textStyle.parseFromJsonStr(style);
            this._styles[key] = textStyle;
    
            this._onStyleChanged();
        }catch(e) {
            console.error(e);
        }
    }

    static registByJson(styles: string) {
        try {
            let json = JSON.parse(styles);
            for (let key in json) {
                let textStyle = new TextStyle();
                textStyle.parseFromJson(json[key]);
                this._styles[key] = textStyle;
            }
    
            this._onStyleChanged();
        }catch(e) {
            console.error(e);
        }
    }

    static getStyle(key: string): TextStyle {
        return this._styles[key];
    }
}