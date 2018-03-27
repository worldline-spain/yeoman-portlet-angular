var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../util", "./animation_style_normalizer"], function (require, exports, util_1, animation_style_normalizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebAnimationsStyleNormalizer = (function (_super) {
        __extends(WebAnimationsStyleNormalizer, _super);
        function WebAnimationsStyleNormalizer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WebAnimationsStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) {
            return util_1.dashCaseToCamelCase(propertyName);
        };
        WebAnimationsStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) {
            var unit = '';
            var strVal = value.toString().trim();
            if (DIMENSIONAL_PROP_MAP[normalizedProperty] && value !== 0 && value !== '0') {
                if (typeof value === 'number') {
                    unit = 'px';
                }
                else {
                    var valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
                        errors.push("Please provide a CSS unit value for " + userProvidedProperty + ":" + value);
                    }
                }
            }
            return strVal + unit;
        };
        return WebAnimationsStyleNormalizer;
    }(animation_style_normalizer_1.AnimationStyleNormalizer));
    exports.WebAnimationsStyleNormalizer = WebAnimationsStyleNormalizer;
    var DIMENSIONAL_PROP_MAP = makeBooleanMap('width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'
        .split(','));
    function makeBooleanMap(keys) {
        var map = {};
        keys.forEach(function (key) { return map[key] = true; });
        return map;
    }
});
//# sourceMappingURL=web_animations_style_normalizer.js.map