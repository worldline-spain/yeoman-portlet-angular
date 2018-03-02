/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @experimental Animation support is experimental.
     */
    var AnimationStyleNormalizer = (function () {
        function AnimationStyleNormalizer() {
        }
        return AnimationStyleNormalizer;
    }());
    exports.AnimationStyleNormalizer = AnimationStyleNormalizer;
    /**
     * @experimental Animation support is experimental.
     */
    var NoopAnimationStyleNormalizer = (function () {
        function NoopAnimationStyleNormalizer() {
        }
        NoopAnimationStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) { return propertyName; };
        NoopAnimationStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) {
            return value;
        };
        return NoopAnimationStyleNormalizer;
    }());
    exports.NoopAnimationStyleNormalizer = NoopAnimationStyleNormalizer;
});
//# sourceMappingURL=animation_style_normalizer.js.map