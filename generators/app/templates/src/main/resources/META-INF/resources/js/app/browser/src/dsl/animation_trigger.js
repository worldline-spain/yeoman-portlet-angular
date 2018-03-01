define(["require", "exports", "./animation_transition_factory"], function (require, exports, animation_transition_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @experimental Animation support is experimental.
     */
    function buildTrigger(name, ast) {
        return new AnimationTrigger(name, ast);
    }
    exports.buildTrigger = buildTrigger;
    /**
    * @experimental Animation support is experimental.
    */
    var AnimationTrigger = (function () {
        function AnimationTrigger(name, ast) {
            var _this = this;
            this.name = name;
            this.ast = ast;
            this.transitionFactories = [];
            this.states = {};
            ast.states.forEach(function (ast) {
                var defaultParams = (ast.options && ast.options.params) || {};
                _this.states[ast.name] = new animation_transition_factory_1.AnimationStateStyles(ast.style, defaultParams);
            });
            balanceProperties(this.states, 'true', '1');
            balanceProperties(this.states, 'false', '0');
            ast.transitions.forEach(function (ast) {
                _this.transitionFactories.push(new animation_transition_factory_1.AnimationTransitionFactory(name, ast, _this.states));
            });
            this.fallbackTransition = createFallbackTransition(name, this.states);
        }
        Object.defineProperty(AnimationTrigger.prototype, "containsQueries", {
            get: function () { return this.ast.queryCount > 0; },
            enumerable: true,
            configurable: true
        });
        AnimationTrigger.prototype.matchTransition = function (currentState, nextState) {
            var entry = this.transitionFactories.find(function (f) { return f.match(currentState, nextState); });
            return entry || null;
        };
        AnimationTrigger.prototype.matchStyles = function (currentState, params, errors) {
            return this.fallbackTransition.buildStyles(currentState, params, errors);
        };
        return AnimationTrigger;
    }());
    exports.AnimationTrigger = AnimationTrigger;
    function createFallbackTransition(triggerName, states) {
        var matchers = [function (fromState, toState) { return true; }];
        var animation = { type: 2 /* Sequence */, steps: [], options: null };
        var transition = {
            type: 1 /* Transition */,
            animation: animation,
            matchers: matchers,
            options: null,
            queryCount: 0,
            depCount: 0
        };
        return new animation_transition_factory_1.AnimationTransitionFactory(triggerName, transition, states);
    }
    function balanceProperties(obj, key1, key2) {
        if (obj.hasOwnProperty(key1)) {
            if (!obj.hasOwnProperty(key2)) {
                obj[key2] = obj[key1];
            }
        }
        else if (obj.hasOwnProperty(key2)) {
            obj[key1] = obj[key2];
        }
    }
});
//# sourceMappingURL=animation_trigger.js.map