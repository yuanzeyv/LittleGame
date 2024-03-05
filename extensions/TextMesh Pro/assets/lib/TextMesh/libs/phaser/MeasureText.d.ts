import { TextStyle } from "./TextStyle";
export declare type Measure = {
    ascent: number;
    descent: number;
    fontSize: number;
};
export declare class MeasureText {
    static create(textStyle: TextStyle): Measure;
}
