define(["require", "exports", "../../util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebAnimationsPlayer = (function () {
        function WebAnimationsPlayer(element, keyframes, options, previousPlayers) {
            if (previousPlayers === void 0) { previousPlayers = []; }
            var _this = this;
            this.element = element;
            this.keyframes = keyframes;
            this.options = options;
            this.previousPlayers = previousPlayers;
            this._onDoneFns = [];
            this._onStartFns = [];
            this._onDestroyFns = [];
            this._initialized = false;
            this._finished = false;
            this._started = false;
            this._destroyed = false;
            this.time = 0;
            this.parentPlayer = null;
            this.previousStyles = {};
            this.currentSnapshot = {};
            this._duration = options['duration'];
            this._delay = options['delay'] || 0;
            this.time = this._duration + this._delay;
            if (util_1.allowPreviousPlayerStylesMerge(this._duration, this._delay)) {
                previousPlayers.forEach(function (player) {
                    var styles = player.currentSnapshot;
                    Object.keys(styles).forEach(function (prop) { return _this.previousStyles[prop] = styles[prop]; });
                });
            }
        }
        WebAnimationsPlayer.prototype._onFinish = function () {
            if (!this._finished) {
                this._finished = true;
                this._onDoneFns.forEach(function (fn) { return fn(); });
                this._onDoneFns = [];
            }
        };
        WebAnimationsPlayer.prototype.init = function () {
            this._buildPlayer();
            this._preparePlayerBeforeStart();
        };
        WebAnimationsPlayer.prototype._buildPlayer = function () {
            var _this = this;
            if (this._initialized)
                return;
            this._initialized = true;
            var keyframes = this.keyframes.map(function (styles) { return util_1.copyStyles(styles, false); });
            var previousStyleProps = Object.keys(this.previousStyles);
            if (previousStyleProps.length) {
                var startingKeyframe_1 = keyframes[0];
                var missingStyleProps_1 = [];
                previousStyleProps.forEach(function (prop) {
                    if (!startingKeyframe_1.hasOwnProperty(prop)) {
                        missingStyleProps_1.push(prop);
                    }
                    startingKeyframe_1[prop] = _this.previousStyles[prop];
                });
                if (missingStyleProps_1.length) {
                    var self_1 = this;
                    var _loop_1 = function () {
                        var kf = keyframes[i];
                        missingStyleProps_1.forEach(function (prop) {
                            kf[prop] = _computeStyle(self_1.element, prop);
                        });
                    };
                    // tslint:disable-next-line
                    for (var i = 1; i < keyframes.length; i++) {
                        _loop_1();
                    }
                }
            }
            this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
            this._finalKeyframe = keyframes.length ? keyframes[keyframes.length - 1] : {};
            this._player.addEventListener('finish', function () { return _this._onFinish(); });
        };
        WebAnimationsPlayer.prototype._preparePlayerBeforeStart = function () {
            // this is required so that the player doesn't start to animate right away
            if (this._delay) {
                this._resetDomPlayerState();
            }
            else {
                this._player.pause();
            }
        };
        /** @internal */
        WebAnimationsPlayer.prototype._triggerWebAnimation = function (element, keyframes, options) {
            // jscompiler doesn't seem to know animate is a native property because it's not fully
            // supported yet across common browsers (we polyfill it for Edge/Safari) [CL #143630929]
            return element['animate'](keyframes, options);
        };
        Object.defineProperty(WebAnimationsPlayer.prototype, "domPlayer", {
            get: function () { return this._player; },
            enumerable: true,
            configurable: true
        });
        WebAnimationsPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
        WebAnimationsPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
        WebAnimationsPlayer.prototype.onDestroy = function (fn) { this._onDestroyFns.push(fn); };
        WebAnimationsPlayer.prototype.play = function () {
            this._buildPlayer();
            if (!this.hasStarted()) {
                this._onStartFns.forEach(function (fn) { return fn(); });
                this._onStartFns = [];
                this._started = true;
            }
            this._player.play();
        };
        WebAnimationsPlayer.prototype.pause = function () {
            this.init();
            this._player.pause();
        };
        WebAnimationsPlayer.prototype.finish = function () {
            this.init();
            this._onFinish();
            this._player.finish();
        };
        WebAnimationsPlayer.prototype.reset = function () {
            this._resetDomPlayerState();
            this._destroyed = false;
            this._finished = false;
            this._started = false;
        };
        WebAnimationsPlayer.prototype._resetDomPlayerState = function () {
            if (this._player) {
                this._player.cancel();
            }
        };
        WebAnimationsPlayer.prototype.restart = function () {
            this.reset();
            this.play();
        };
        WebAnimationsPlayer.prototype.hasStarted = function () { return this._started; };
        WebAnimationsPlayer.prototype.destroy = function () {
            if (!this._destroyed) {
                this._destroyed = true;
                this._resetDomPlayerState();
                this._onFinish();
                this._onDestroyFns.forEach(function (fn) { return fn(); });
                this._onDestroyFns = [];
            }
        };
        WebAnimationsPlayer.prototype.setPosition = function (p) { this._player.currentTime = p * this.time; };
        WebAnimationsPlayer.prototype.getPosition = function () { return this._player.currentTime / this.time; };
        Object.defineProperty(WebAnimationsPlayer.prototype, "totalTime", {
            get: function () { return this._delay + this._duration; },
            enumerable: true,
            configurable: true
        });
        WebAnimationsPlayer.prototype.beforeDestroy = function () {
            var _this = this;
            var styles = {};
            if (this.hasStarted()) {
                Object.keys(this._finalKeyframe).forEach(function (prop) {
                    if (prop != 'offset') {
                        styles[prop] =
                            _this._finished ? _this._finalKeyframe[prop] : _computeStyle(_this.element, prop);
                    }
                });
            }
            this.currentSnapshot = styles;
        };
        return WebAnimationsPlayer;
    }());
    exports.WebAnimationsPlayer = WebAnimationsPlayer;
    function _computeStyle(element, prop) {
        return window.getComputedStyle(element)[prop];
    }
});
//# sourceMappingURL=web_animations_player.js.map