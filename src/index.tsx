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

  roundNumber(number: number) {
    return Math.ceil(number / 100) * 100;
  }

  ensureUriEncoding(uri: string) {
    try {
      if (uri === decodeURI(uri)) {
        return encodeURI(uri);
      }
    } catch (error) {
      return encodeURI(uri);
    }
    return uri;
  }

  generateSourceUrl(
    source: FastImageSource | number
  ): FastImageSource | number {
    if (typeof source === "number") {
      return source;
    } else if (!source || !source.uri) {
      console.warn("No URI Provided for CdnImage");
      return source;
    }
    const style = StyleSheet.flatten(this.props.style);
    const url = this.ensureUriEncoding(source.uri);
    const height = style.height
      ? `&h=${this.roundNumber(+style.height)}`
      : "&h=500";
    const width = style.width
      ? `&w=${this.roundNumber(+style.width)}`
      : "&w=500";
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
