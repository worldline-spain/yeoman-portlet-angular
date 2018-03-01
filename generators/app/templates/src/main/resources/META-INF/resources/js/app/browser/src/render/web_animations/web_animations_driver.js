define(["require", "exports", "../shared", "./web_animations_player"], function (require, exports, shared_1, web_animations_player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebAnimationsDriver = (function () {
        function WebAnimationsDriver() {
        }
        WebAnimationsDriver.prototype.matchesElement = function (element, selector) {
            return shared_1.matchesElement(element, selector);
        };
        WebAnimationsDriver.prototype.containsElement = function (elm1, elm2) { return shared_1.containsElement(elm1, elm2); };
        WebAnimationsDriver.prototype.query = function (element, selector, multi) {
            return shared_1.invokeQuery(element, selector, multi);
        };
        WebAnimationsDriver.prototype.computeStyle = function (element, prop, defaultValue) {
            return window.getComputedStyle(element)[prop];
        };
        WebAnimationsDriver.prototype.animate = function (element, keyframes, duration, delay, easing, previousPlayers) {
            if (previousPlayers === void 0) { previousPlayers = []; }
            var fill = delay == 0 ? 'both' : 'forwards';
            var playerOptions = { duration: duration, delay: delay, fill: fill };
            // we check for this to avoid having a null|undefined value be present
            // for the easing (which results in an error for certain browsers #9752)
            if (easing) {
                playerOptions['easing'] = easing;
            }
            var previousWebAnimationPlayers = previousPlayers.filter(function (player) { return player instanceof web_animations_player_1.WebAnimationsPlayer; });
            return new web_animations_player_1.WebAnimationsPlayer(element, keyframes, playerOptions, previousWebAnimationPlayers);
        };
        return WebAnimationsDriver;
    }());
    exports.WebAnimationsDriver = WebAnimationsDriver;
    function supportsWebAnimations() {
        return typeof Element !== 'undefined' && typeof Element.prototype['animate'] === 'function';
    }
    exports.supportsWebAnimations = supportsWebAnimations;
});
//# sourceMappingURL=web_animations_driver.js.map