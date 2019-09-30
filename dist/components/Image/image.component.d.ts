import { Component } from "react";
import { FastImageProperties, FastImageSource } from "react-native-fast-image";
export interface CdnImageProps extends FastImageProperties {
    imageFormat: "jpg" | "png" | "webp";
    normalize: boolean;
}
export declare type CdnImageState = {};
export declare class CdnImage extends Component<CdnImageProps, CdnImageState> {
    static defaulProps: Partial<CdnImageProps>;
    generateSourceUrl(source: FastImageSource | number): FastImageSource | number;
    render(): JSX.Element;
}
