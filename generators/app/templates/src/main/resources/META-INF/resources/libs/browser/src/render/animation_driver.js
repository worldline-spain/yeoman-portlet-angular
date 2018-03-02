define(["require", "exports", "@angular/animations", "./shared"], function (require, exports, animations_1, shared_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @experimental
     */
    var NoopAnimationDriver = (function () {
        function NoopAnimationDriver() {
        }
        NoopAnimationDriver.prototype.matchesElement = function (element, selector) {
            return shared_1.matchesElement(element, selector);
        };
        NoopAnimationDriver.prototype.containsElement = function (elm1, elm2) { return shared_1.containsElement(elm1, elm2); };
        NoopAnimationDriver.prototype.query = function (element, selector, multi) {
            return shared_1.invokeQuery(element, selector, multi);
        };
        NoopAnimationDriver.prototype.computeStyle = function (element, prop, defaultValue) {
            return defaultValue || '';
        };
        NoopAnimationDriver.prototype.animate = function (element, keyframes, duration, delay, easing, previousPlayers) {
            if (previousPlayers === void 0) { previousPlayers = []; }
            return new animations_1.NoopAnimationPlayer();
        };
        return NoopAnimationDriver;
    }());
    exports.NoopAnimationDriver = NoopAnimationDriver;
    /**
     * @experimental
     */
    var AnimationDriver = (function () {
        function AnimationDriver() {
        }
        return AnimationDriver;
    }());
    AnimationDriver.NOOP = new NoopAnimationDriver();
    exports.AnimationDriver = AnimationDriver;
});
//# sourceMappingURL=animation_driver.js.map