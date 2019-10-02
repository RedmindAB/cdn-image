import * as React from "react";
import { StyleSheet } from "react-native";
import FastImage, {
  FastImageProperties,
  FastImageSource
} from "react-native-fast-image";

export interface CdnImageProps extends FastImageProperties {
  imageFormat: "jpg" | "png" | "webp";
  normalize: boolean;
  debug: boolean;
}
export type CdnImageState = {};

export class CdnImage extends React.Component<CdnImageProps, CdnImageState> {
  static defaultProps: Partial<CdnImageProps> = {
    normalize: true,
    imageFormat: "webp",
    debug: false
  };

  constructor(props: CdnImageProps) {
    super(props);
  }

  generateSourceUrl(
    source: FastImageSource | number
  ): FastImageSource | number {
    if (typeof source === "number") {
      return source;
    }
    const style = StyleSheet.flatten(this.props.style);
    const url = source;
    const height = style.height ? `&h=${style.height}` : "";
    const width = style.width ? `&w=${style.width}` : "";
    const normalize = "&normalize=true";
    const imageFormat = `&imageFormat=${this.props.imageFormat}`;
    return {
      ...source,
      uri: `https://europe-west1-redmind-cdn.cloudfunctions.net/api/images?url=${url}${height}${width}${normalize}${imageFormat}`
    };
  }

  render() {
    const modifiedProps = {
      ...this.props,
      source: this.generateSourceUrl(this.props.source)
    } as FastImageProperties;
    if (this.props.debug) {
      console.log("CdnImage input", this.props);
      console.log("CdnImage Output", modifiedProps);
    }
    return <FastImage {...modifiedProps} />;
  }
}
