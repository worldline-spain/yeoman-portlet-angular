var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "../render/shared", "../util", "./animation_timeline_builder", "./animation_transition_instruction"], function (require, exports, shared_1, util_1, animation_timeline_builder_1, animation_transition_instruction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EMPTY_OBJECT = {};
    var AnimationTransitionFactory = (function () {
        function AnimationTransitionFactory(_triggerName, ast, _stateStyles) {
            this._triggerName = _triggerName;
            this.ast = ast;
            this._stateStyles = _stateStyles;
        }
        AnimationTransitionFactory.prototype.match = function (currentState, nextState) {
            return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState);
        };
        AnimationTransitionFactory.prototype.buildStyles = function (stateName, params, errors) {
            var backupStateStyler = this._stateStyles['*'];
            var stateStyler = this._stateStyles[stateName];
            var backupStyles = backupStateStyler ? backupStateStyler.buildStyles(params, errors) : {};
            return stateStyler ? stateStyler.buildStyles(params, errors) : backupStyles;
        };
        AnimationTransitionFactory.prototype.build = function (driver, element, currentState, nextState, currentOptions, nextOptions, subInstructions) {
            var errors = [];
            var transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT;
            var currentAnimationParams = currentOptions && currentOptions.params || EMPTY_OBJECT;
            var currentStateStyles = this.buildStyles(currentState, currentAnimationParams, errors);
            var nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT;
            var nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors);
            var queriedElements = new Set();
            var preStyleMap = new Map();
            var postStyleMap = new Map();
            var isRemoval = nextState === 'void';
            var animationOptions = { params: __assign({}, transitionAnimationParams, nextAnimationParams) };
            var timelines = animation_timeline_builder_1.buildAnimationTimelines(driver, element, this.ast.animation, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
            if (errors.length) {
                return animation_transition_instruction_1.createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, errors);
            }
            timelines.forEach(function (tl) {
                var elm = tl.element;
                var preProps = shared_1.getOrSetAsInMap(preStyleMap, elm, {});
                tl.preStyleProps.forEach(function (prop) { return preProps[prop] = true; });
                var postProps = shared_1.getOrSetAsInMap(postStyleMap, elm, {});
                tl.postStyleProps.forEach(function (prop) { return postProps[prop] = true; });
                if (elm !== element) {
                    queriedElements.add(elm);
                }
            });
            var queriedElementsList = util_1.iteratorToArray(queriedElements.values());
            return animation_transition_instruction_1.createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, queriedElementsList, preStyleMap, postStyleMap);
        };
        return AnimationTransitionFactory;
    }());
    exports.AnimationTransitionFactory = AnimationTransitionFactory;
    function oneOrMoreTransitionsMatch(matchFns, currentState, nextState) {
        return matchFns.some(function (fn) { return fn(currentState, nextState); });
    }
    var AnimationStateStyles = (function () {
        function AnimationStateStyles(styles, defaultParams) {
            this.styles = styles;
            this.defaultParams = defaultParams;
        }
        AnimationStateStyles.prototype.buildStyles = function (params, errors) {
            var finalStyles = {};
            var combinedParams = util_1.copyObj(this.defaultParams);
            Object.keys(params).forEach(function (key) {
                var value = params[key];
                if (value != null) {
                    combinedParams[key] = value;
                }
            });
            this.styles.styles.forEach(function (value) {
                if (typeof value !== 'string') {
                    var styleObj_1 = value;
                    Object.keys(styleObj_1).forEach(function (prop) {
                        var val = styleObj_1[prop];
                        if (val.length > 1) {
                            val = util_1.interpolateParams(val, combinedParams, errors);
                        }
                        finalStyles[prop] = val;
                    });
                }
            });
            return finalStyles;
        };
        return AnimationStateStyles;
    }());
    exports.AnimationStateStyles = AnimationStateStyles;
});
//# sourceMappingURL=animation_transition_factory.js.map