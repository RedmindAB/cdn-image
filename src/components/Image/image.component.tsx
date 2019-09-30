import react, { Component } from "react";
import { Platform, ImageStyle } from "react-native";
import FastImage, {
  FastImageProperties,
  FastImageSource
} from "react-native-fast-image";

export interface CdnImageProps extends FastImageProperties {
  imageFormat: "jpg" | "png" | "webp";
  normalize: boolean;
}
export type CdnImageState = {};

export class CdnImage extends Component<CdnImageProps, CdnImageState> {
  static defaultProps: Partial<CdnImageProps> = {
    normalize: true,
    imageFormat: "webp"
  };

  generateSourceUrl(
    source: FastImageSource | number
  ): FastImageSource | number {
    if (typeof source === "number") {
      return source;
    }
    const style = this.props.style as ImageStyle;
    const url = source;
    const height = style.height ? `&h=${style.height}` : "";
    const width = style.width ? `&w=${style.width}` : "";
    if (height || width) {
      const normalize = "&normalize=true";
      return {
        ...source,
        uri: `https://europe-west1-redmind-cdn.cloudfunctions.net/api/images?url=${url}${height}${width}${normalize}`
      };
    }
    return source;
  }

  render() {
    const modifiedProps = {
      ...this.props,
      source: this.generateSourceUrl(this.props.source)
    } as FastImageProperties;
    return <FastImage {...modifiedProps} />;
  }
}
