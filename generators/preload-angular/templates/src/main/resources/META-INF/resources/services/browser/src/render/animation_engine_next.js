define(["require", "exports", "../dsl/animation_ast_builder", "../dsl/animation_trigger", "./shared", "./timeline_animation_engine", "./transition_animation_engine"], function (require, exports, animation_ast_builder_1, animation_trigger_1, shared_1, timeline_animation_engine_1, transition_animation_engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimationEngine = (function () {
        function AnimationEngine(driver, normalizer) {
            var _this = this;
            this._triggerCache = {};
            // this method is designed to be overridden by the code that uses this engine
            this.onRemovalComplete = function (element, context) { };
            this._transitionEngine = new transition_animation_engine_1.TransitionAnimationEngine(driver, normalizer);
            this._timelineEngine = new timeline_animation_engine_1.TimelineAnimationEngine(driver, normalizer);
            this._transitionEngine.onRemovalComplete = function (element, context) {
                return _this.onRemovalComplete(element, context);
            };
        }
        AnimationEngine.prototype.registerTrigger = function (componentId, namespaceId, hostElement, name, metadata) {
            var cacheKey = componentId + '-' + name;
            var trigger = this._triggerCache[cacheKey];
            if (!trigger) {
                var errors = [];
                var ast = animation_ast_builder_1.buildAnimationAst(metadata, errors);
                if (errors.length) {
                    throw new Error("The animation trigger \"" + name + "\" has failed to build due to the following errors:\n - " + errors.join("\n - "));
                }
                trigger = animation_trigger_1.buildTrigger(name, ast);
                this._triggerCache[cacheKey] = trigger;
            }
            this._transitionEngine.registerTrigger(namespaceId, name, trigger);
        };
        AnimationEngine.prototype.register = function (namespaceId, hostElement) {
            this._transitionEngine.register(namespaceId, hostElement);
        };
        AnimationEngine.prototype.destroy = function (namespaceId, context) {
            this._transitionEngine.destroy(namespaceId, context);
        };
        AnimationEngine.prototype.onInsert = function (namespaceId, element, parent, insertBefore) {
            this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
        };
        AnimationEngine.prototype.onRemove = function (namespaceId, element, context) {
            this._transitionEngine.removeNode(namespaceId, element, context);
        };
        AnimationEngine.prototype.disableAnimations = function (element, disable) {
            this._transitionEngine.markElementAsDisabled(element, disable);
        };
        AnimationEngine.prototype.process = function (namespaceId, element, property, value) {
            if (property.charAt(0) == '@') {
                var _a = shared_1.parseTimelineCommand(property), id = _a[0], action = _a[1];
                var args = value;
                this._timelineEngine.command(id, element, action, args);
            }
            else {
                this._transitionEngine.trigger(namespaceId, element, property, value);
            }
        };
        AnimationEngine.prototype.listen = function (namespaceId, element, eventName, eventPhase, callback) {
            // @@listen
            if (eventName.charAt(0) == '@') {
                var _a = shared_1.parseTimelineCommand(eventName), id = _a[0], action = _a[1];
                return this._timelineEngine.listen(id, element, action, callback);
            }
            return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
        };
        AnimationEngine.prototype.flush = function (microtaskId) {
            if (microtaskId === void 0) { microtaskId = -1; }
            this._transitionEngine.flush(microtaskId);
        };
        Object.defineProperty(AnimationEngine.prototype, "players", {
            get: function () {
                return this._transitionEngine.players
                    .concat(this._timelineEngine.players);
            },
            enumerable: true,
            configurable: true
        });
        AnimationEngine.prototype.whenRenderingDone = function () { return this._transitionEngine.whenRenderingDone(); };
        return AnimationEngine;
    }());
    exports.AnimationEngine = AnimationEngine;
});
//# sourceMappingURL=animation_engine_next.js.map