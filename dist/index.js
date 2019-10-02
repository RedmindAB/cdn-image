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
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var CdnImage = /** @class */ (function (_super) {
    __extends(CdnImage, _super);
    function CdnImage(props) {
        return _super.call(this, props) || this;
    }
    CdnImage.prototype.generateSourceUrl = function (source) {
        if (typeof source === "number") {
            return source;
        }
        var style = this.props.style;
        var url = source;
        var height = style.height ? "&h=" + style.height : "";
        var width = style.width ? "&w=" + style.width : "";
        if (height.length > 0 || width.length > 0) {
            var normalize = "&normalize=true";
            return __assign(__assign({}, source), { uri: "https://europe-west1-redmind-cdn.cloudfunctions.net/api/images?url=" + url + height + width + normalize });
        }
        return source;
    };
    CdnImage.prototype.render = function () {
        var modifiedProps = __assign(__assign({}, this.props), { source: this.generateSourceUrl(this.props.source) });
        return <react_native_fast_image_1.default {...modifiedProps}/>;
    };
    CdnImage.defaultProps = {
        normalize: true,
        imageFormat: "webp"
    };
    return CdnImage;
}(React.Component));
exports.CdnImage = CdnImage;
