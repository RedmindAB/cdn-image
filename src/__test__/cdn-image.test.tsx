import * as React from "react";
import { StyleSheet } from "react-native";
import { CdnImage, CdnImageProps } from "../index";
import render, { ReactTestRendererJSON } from "react-test-renderer";
import { URL } from "url";

const getFastImage = (result: ReactTestRendererJSON | null) => {
  expect(result).not.toBeNull();
  return result!.children![0] as ReactTestRendererJSON;
};

const styles = StyleSheet.create({
  smallImage: {
    height: 10,
    width: 10
  },
  _99: {
    height: 99,
    width: 99
  },
  _101: {
    height: 101,
    width: 101
  }
});

const props = {
  style: styles.smallImage,
  source: { uri: "testuri" }
} as CdnImageProps;

describe("CdnImage", () => {
  describe("Render", () => {
    test("should not crash", () => {
      const spy = jest.spyOn(global.console, "warn");
      render.create(<CdnImage />);
      expect(spy).toHaveBeenCalledWith("No URI Provided for CdnImage");
    });

    test("should render FastImage", () => {
      const props = {
        style: styles.smallImage,
        source: { uri: "testuri" }
      } as CdnImageProps;
      const result = render.create(<CdnImage {...props} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.type).toEqual("FastImageView");
    });
  });

  describe("default props", () => {
    test("should default to WEBP image", () => {
      const result = render.create(<CdnImage {...props} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.props.imageFormat).toEqual("webp");
    });

    test("should default to normalize=true", () => {
      const result = render.create(<CdnImage {...props} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.props.normalize).toEqual(true);
    });
    test("should use Redmind-CDN if uri is given", () => {
      const result = render.create(<CdnImage {...props} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.props.source.uri).toContain(
        "https://europe-west1-redmind-cdn.cloudfunctions.net/api/images?"
      );
    });
    test.skip("should default if source is number", () => {
      const newProps = { ...props, debug: true, source: 123 };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage).toEqual(123);
    });
  });

  describe("size rounding", () => {
    test("should always round hight to upper hundreadth", () => {
      const newProps = { ...props, style: styles._99 };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      const url = new URL(fastImage.props.source.uri);
      expect(url.searchParams.get("h")).toEqual("100");
      expect(url.searchParams.get("w")).toEqual("100");
    });

    test("should round 101 to 200", () => {
      const newProps = { ...props, style: styles._101 };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      const url = new URL(fastImage.props.source.uri);
      expect(url.searchParams.get("w")).toEqual("200");
      expect(url.searchParams.get("h")).toEqual("200");
    });

    test("should default to 500px if no size is given", () => {
      const newProps = { ...props, style: {} };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      const url = new URL(fastImage.props.source.uri);
      expect(url.searchParams.get("w")).toEqual("500");
      expect(url.searchParams.get("h")).toEqual("500");
    });
  });

  describe("the URL query param", () => {
    test("should encode if malformed encoding", () => {
      const uri = "https://my-domain.com/%åäö";
      const newProps = { ...props, source: { uri } };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.props.source.uri).toContain(encodeURI(uri));
    });

    test("should work with URL that do not need encoding", () => {
      const uri = "https://my-domain.com";
      const newProps = { ...props, source: { uri } };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.props.source.uri).toContain(encodeURI(uri));
      expect(fastImage.props.source.uri).toContain(uri);
    });

    test("should work with URL that is already encoded", () => {
      const uri = encodeURI("https://my-domain.com/%åäö");
      const newProps = { ...props, source: { uri } };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.props.source.uri).toContain(uri);
    });

    test("should work with URL that needs encoding", () => {
      const uri = "https://my-domain.com/åäö";
      const newProps = { ...props, source: { uri } };
      const result = render.create(<CdnImage {...newProps} />).toJSON();
      const fastImage = getFastImage(result);
      expect(fastImage.props.source.uri).toContain(encodeURI(uri));
    });
  });
});
