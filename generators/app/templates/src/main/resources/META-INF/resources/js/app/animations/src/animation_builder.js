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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "@angular/animations", "@angular/core", "@angular/platform-browser"], function (require, exports, animations_1, core_1, platform_browser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BrowserAnimationBuilder = (function (_super) {
        __extends(BrowserAnimationBuilder, _super);
        function BrowserAnimationBuilder(rootRenderer, doc) {
            var _this = _super.call(this) || this;
            _this._nextAnimationId = 0;
            var typeData = {
                id: '0',
                encapsulation: core_1.ViewEncapsulation.None,
                styles: [],
                data: { animation: [] }
            };
            _this._renderer = rootRenderer.createRenderer(doc.body, typeData);
            return _this;
        }
        BrowserAnimationBuilder.prototype.build = function (animation) {
            var id = this._nextAnimationId.toString();
            this._nextAnimationId++;
            var entry = Array.isArray(animation) ? animations_1.sequence(animation) : animation;
            issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
            return new BrowserAnimationFactory(id, this._renderer);
        };
        return BrowserAnimationBuilder;
    }(animations_1.AnimationBuilder));
    BrowserAnimationBuilder = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [core_1.RendererFactory2, Object])
    ], BrowserAnimationBuilder);
    exports.BrowserAnimationBuilder = BrowserAnimationBuilder;
    var BrowserAnimationFactory = (function (_super) {
        __extends(BrowserAnimationFactory, _super);
        function BrowserAnimationFactory(_id, _renderer) {
            var _this = _super.call(this) || this;
            _this._id = _id;
            _this._renderer = _renderer;
            return _this;
        }
        BrowserAnimationFactory.prototype.create = function (element, options) {
            return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
        };
        return BrowserAnimationFactory;
    }(animations_1.AnimationFactory));
    exports.BrowserAnimationFactory = BrowserAnimationFactory;
    var RendererAnimationPlayer = (function () {
        function RendererAnimationPlayer(id, element, options, _renderer) {
            this.id = id;
            this.element = element;
            this._renderer = _renderer;
            this.parentPlayer = null;
            this._started = false;
            this.totalTime = 0;
            this._command('create', options);
        }
        RendererAnimationPlayer.prototype._listen = function (eventName, callback) {
            return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
        };
        RendererAnimationPlayer.prototype._command = function (command) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
        };
        RendererAnimationPlayer.prototype.onDone = function (fn) { this._listen('done', fn); };
        RendererAnimationPlayer.prototype.onStart = function (fn) { this._listen('start', fn); };
        RendererAnimationPlayer.prototype.onDestroy = function (fn) { this._listen('destroy', fn); };
        RendererAnimationPlayer.prototype.init = function () { this._command('init'); };
        RendererAnimationPlayer.prototype.hasStarted = function () { return this._started; };
        RendererAnimationPlayer.prototype.play = function () {
            this._command('play');
            this._started = true;
        };
        RendererAnimationPlayer.prototype.pause = function () { this._command('pause'); };
        RendererAnimationPlayer.prototype.restart = function () { this._command('restart'); };
        RendererAnimationPlayer.prototype.finish = function () { this._command('finish'); };
        RendererAnimationPlayer.prototype.destroy = function () { this._command('destroy'); };
        RendererAnimationPlayer.prototype.reset = function () { this._command('reset'); };
        RendererAnimationPlayer.prototype.setPosition = function (p) { this._command('setPosition', p); };
        RendererAnimationPlayer.prototype.getPosition = function () { return 0; };
        return RendererAnimationPlayer;
    }());
    exports.RendererAnimationPlayer = RendererAnimationPlayer;
    function issueAnimationCommand(renderer, element, id, command, args) {
        return renderer.setProperty(element, "@@" + id + ":" + command, args);
    }
});
//# sourceMappingURL=animation_builder.js.map