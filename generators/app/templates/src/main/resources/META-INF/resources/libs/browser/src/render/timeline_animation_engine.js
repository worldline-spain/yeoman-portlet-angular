define(["require", "exports", "@angular/animations", "../dsl/animation_ast_builder", "../dsl/animation_timeline_builder", "../dsl/element_instruction_map", "./shared"], function (require, exports, animations_1, animation_ast_builder_1, animation_timeline_builder_1, element_instruction_map_1, shared_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EMPTY_INSTRUCTION_MAP = new element_instruction_map_1.ElementInstructionMap();
    var TimelineAnimationEngine = (function () {
        function TimelineAnimationEngine(_driver, _normalizer) {
            this._driver = _driver;
            this._normalizer = _normalizer;
            this._animations = {};
            this._playersById = {};
            this.players = [];
        }
        TimelineAnimationEngine.prototype.register = function (id, metadata) {
            var errors = [];
            var ast = animation_ast_builder_1.buildAnimationAst(metadata, errors);
            if (errors.length) {
                throw new Error("Unable to build the animation due to the following errors: " + errors.join("\n"));
            }
            else {
                this._animations[id] = ast;
            }
        };
        TimelineAnimationEngine.prototype._buildPlayer = function (i, preStyles, postStyles) {
            var element = i.element;
            var keyframes = shared_1.normalizeKeyframes(this._driver, this._normalizer, element, i.keyframes, preStyles, postStyles);
            return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, []);
        };
        TimelineAnimationEngine.prototype.create = function (id, element, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var errors = [];
            var ast = this._animations[id];
            var instructions;
            var autoStylesMap = new Map();
            if (ast) {
                instructions = animation_timeline_builder_1.buildAnimationTimelines(this._driver, element, ast, {}, {}, options, EMPTY_INSTRUCTION_MAP, errors);
                instructions.forEach(function (inst) {
                    var styles = shared_1.getOrSetAsInMap(autoStylesMap, inst.element, {});
                    inst.postStyleProps.forEach(function (prop) { return styles[prop] = null; });
                });
            }
            else {
                errors.push('The requested animation doesn\'t exist or has already been destroyed');
                instructions = [];
            }
            if (errors.length) {
                throw new Error("Unable to create the animation due to the following errors: " + errors.join("\n"));
            }
            autoStylesMap.forEach(function (styles, element) {
                Object.keys(styles).forEach(function (prop) { styles[prop] = _this._driver.computeStyle(element, prop, animations_1.AUTO_STYLE); });
            });
            var players = instructions.map(function (i) {
                var styles = autoStylesMap.get(i.element);
                return _this._buildPlayer(i, {}, styles);
            });
            var player = shared_1.optimizeGroupPlayer(players);
            this._playersById[id] = player;
            player.onDestroy(function () { return _this.destroy(id); });
            this.players.push(player);
            return player;
        };
        TimelineAnimationEngine.prototype.destroy = function (id) {
            var player = this._getPlayer(id);
            player.destroy();
            delete this._playersById[id];
            var index = this.players.indexOf(player);
            if (index >= 0) {
                this.players.splice(index, 1);
            }
        };
        TimelineAnimationEngine.prototype._getPlayer = function (id) {
            var player = this._playersById[id];
            if (!player) {
                throw new Error("Unable to find the timeline player referenced by " + id);
            }
            return player;
        };
        TimelineAnimationEngine.prototype.listen = function (id, element, eventName, callback) {
            // triggerName, fromState, toState are all ignored for timeline animations
            var baseEvent = shared_1.makeAnimationEvent(element, '', '', '');
            shared_1.listenOnPlayer(this._getPlayer(id), eventName, baseEvent, callback);
            return function () { };
        };
        TimelineAnimationEngine.prototype.command = function (id, element, command, args) {
            if (command == 'register') {
                this.register(id, args[0]);
                return;
            }
            if (command == 'create') {
                var options = (args[0] || {});
                this.create(id, element, options);
                return;
            }
            var player = this._getPlayer(id);
            switch (command) {
                case 'play':
                    player.play();
                    break;
                case 'pause':
                    player.pause();
                    break;
                case 'reset':
                    player.reset();
                    break;
                case 'restart':
                    player.restart();
                    break;
                case 'finish':
                    player.finish();
                    break;
                case 'init':
                    player.init();
                    break;
                case 'setPosition':
                    player.setPosition(parseFloat(args[0]));
                    break;
                case 'destroy':
                    this.destroy(id);
                    break;
            }
        };
        return TimelineAnimationEngine;
    }());
    exports.TimelineAnimationEngine = TimelineAnimationEngine;
});
//# sourceMappingURL=timeline_animation_engine.js.map