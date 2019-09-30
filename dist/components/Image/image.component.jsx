"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
class CdnImage extends react_1.Component {
    generateSourceUrl(source) {
        if (typeof source === "number") {
            return source;
        }
        const style = this.props.style;
        const url = source;
        const height = style.height ? `&h=${style.height}` : "";
        const width = style.width ? `&w=${style.width}` : "";
        if (height || width) {
            const normalize = "&normalize=true";
            return Object.assign(Object.assign({}, source), { uri: `https://europe-west1-redmind-cdn.cloudfunctions.net/api/images?url=${url}${height}${width}${normalize}` });
        }
        return source;
    }
    render() {
        const modifiedProps = Object.assign(Object.assign({}, this.props), { source: this.generateSourceUrl(this.props.source) });
        return <react_native_fast_image_1.default {...modifiedProps}/>;
    }
}
exports.CdnImage = CdnImage;
CdnImage.defaulProps = {
    normalize: true,
    imageFormat: "webp"
};
