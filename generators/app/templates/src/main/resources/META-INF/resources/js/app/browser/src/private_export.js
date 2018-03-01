define(["require", "exports", "./dsl/animation", "./dsl/style_normalization/animation_style_normalizer", "./dsl/style_normalization/web_animations_style_normalizer", "./render/animation_driver", "./render/animation_engine_next", "./render/web_animations/web_animations_driver", "./render/web_animations/web_animations_player"], function (require, exports, animation_1, animation_style_normalizer_1, web_animations_style_normalizer_1, animation_driver_1, animation_engine_next_1, web_animations_driver_1, web_animations_player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ɵAnimation = animation_1.Animation;
    exports.ɵAnimationStyleNormalizer = animation_style_normalizer_1.AnimationStyleNormalizer;
    exports.ɵNoopAnimationStyleNormalizer = animation_style_normalizer_1.NoopAnimationStyleNormalizer;
    exports.ɵWebAnimationsStyleNormalizer = web_animations_style_normalizer_1.WebAnimationsStyleNormalizer;
    exports.ɵNoopAnimationDriver = animation_driver_1.NoopAnimationDriver;
    exports.ɵAnimationEngine = animation_engine_next_1.AnimationEngine;
    exports.ɵWebAnimationsDriver = web_animations_driver_1.WebAnimationsDriver;
    exports.ɵsupportsWebAnimations = web_animations_driver_1.supportsWebAnimations;
    exports.ɵWebAnimationsPlayer = web_animations_player_1.WebAnimationsPlayer;
});
//# sourceMappingURL=private_export.js.map