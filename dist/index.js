"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var CdnImage = /** @class */ (function (_super) {
    __extends(CdnImage, _super);
    function CdnImage(props) {
        return _super.call(this, props) || this;
    }
    CdnImage.prototype.roundNumber = function (number) {
        return Math.ceil(number / 100) * 100;
    };
    CdnImage.prototype.ensureUriEncoding = function (uri) {
        try {
            if (uri === decodeURI(uri)) {
                return encodeURI(uri);
            }
        }
        catch (error) {
            return encodeURI(uri);
        }
        return uri;
    };
    CdnImage.prototype.generateSourceUrl = function (source) {
        if (typeof source === "number") {
            return source;
        }
        else if (!source || !source.uri) {
            console.warn("No URI Provided for CdnImage");
            return source;
        }
        var style = react_native_1.StyleSheet.flatten(this.props.style);
        var url = this.ensureUriEncoding(source.uri);
        var height = style.height
            ? "&h=" + this.roundNumber(+style.height)
            : "&h=500";
        var width = style.width
            ? "&w=" + this.roundNumber(+style.width)
            : "&w=500";
        var normalize = "&normalize=true";
        var imageFormat = "&imageFormat=" + this.props.imageFormat;
        return __assign(__assign({}, source), { uri: "https://europe-west1-redmind-cdn.cloudfunctions.net/api/images?url=" + url + height + width + normalize + imageFormat });
    };
    CdnImage.prototype.render = function () {
        var modifiedProps = __assign(__assign({}, this.props), { source: this.generateSourceUrl(this.props.source) });
        if (this.props.debug) {
            console.log("CdnImage input", this.props);
            console.log("CdnImage Output", modifiedProps);
        }
        return <react_native_fast_image_1.default {...modifiedProps}/>;
    };
    CdnImage.defaultProps = {
        normalize: true,
        imageFormat: "webp",
        debug: false
    };
    return CdnImage;
}(React.Component));
exports.CdnImage = CdnImage;
