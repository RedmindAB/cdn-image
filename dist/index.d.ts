import * as React from "react";
import { FastImageProperties, FastImageSource } from "react-native-fast-image";
export interface CdnImageProps extends FastImageProperties {
    imageFormat: "jpg" | "png" | "webp";
    normalize: boolean;
}
export declare type CdnImageState = {};
export declare class CdnImage extends React.Component<CdnImageProps, CdnImageState> {
    static defaultProps: Partial<CdnImageProps>;
    constructor(props: CdnImageProps);
    generateSourceUrl(source: FastImageSource | number): FastImageSource | number;
    render(): JSX.Element;
}
