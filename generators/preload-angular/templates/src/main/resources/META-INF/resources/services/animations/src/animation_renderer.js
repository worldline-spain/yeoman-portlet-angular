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
define(["require", "exports", "../../browser/src/browser", "@angular/core"], function (require, exports, browser_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ANIMATION_PREFIX = '@';
    var DISABLE_ANIMATIONS_FLAG = '@.disabled';
    var AnimationRendererFactory = (function () {
        function AnimationRendererFactory(delegate, engine, _zone) {
            this.delegate = delegate;
            this.engine = engine;
            this._zone = _zone;
            this._currentId = 0;
            this._microtaskId = 1;
            this._animationCallbacksBuffer = [];
            this._rendererCache = new Map();
            this._cdRecurDepth = 0;
            engine.onRemovalComplete = function (element, delegate) {
                // Note: if an component element has a leave animation, and the component
                // a host leave animation, the view engine will call `removeChild` for the parent
                // component renderer as well as for the child component renderer.
                // Therefore, we need to check if we already removed the element.
                if (delegate && delegate.parentNode(element)) {
                    delegate.removeChild(element.parentNode, element);
                }
            };
        }
        AnimationRendererFactory.prototype.createRenderer = function (hostElement, type) {
            var _this = this;
            var EMPTY_NAMESPACE_ID = '';
            // cache the delegates to find out which cached delegate can
            // be used by which cached renderer
            var delegate = this.delegate.createRenderer(hostElement, type);
            if (!hostElement || !type || !type.data || !type.data['animation']) {
                var renderer = this._rendererCache.get(delegate);
                if (!renderer) {
                    renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                    // only cache this result when the base renderer is used
                    this._rendererCache.set(delegate, renderer);
                }
                return renderer;
            }
            var componentId = type.id;
            var namespaceId = type.id + '-' + this._currentId;
            this._currentId++;
            this.engine.register(namespaceId, hostElement);
            var animationTriggers = type.data['animation'];
            animationTriggers.forEach(function (trigger) { return _this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger); });
            return new AnimationRenderer(this, namespaceId, delegate, this.engine);
        };
        AnimationRendererFactory.prototype.begin = function () {
            this._cdRecurDepth++;
            if (this.delegate.begin) {
                this.delegate.begin();
            }
        };
        AnimationRendererFactory.prototype._scheduleCountTask = function () {
            var _this = this;
            Zone.current.scheduleMicroTask('incremenet the animation microtask', function () { return _this._microtaskId++; });
        };
        /* @internal */
        AnimationRendererFactory.prototype.scheduleListenerCallback = function (count, fn, data) {
            var _this = this;
            if (count >= 0 && count < this._microtaskId) {
                this._zone.run(function () { return fn(data); });
                return;
            }
            if (this._animationCallbacksBuffer.length == 0) {
                Promise.resolve(null).then(function () {
                    _this._zone.run(function () {
                        _this._animationCallbacksBuffer.forEach(function (tuple) {
                            var fn = tuple[0], data = tuple[1];
                            fn(data);
                        });
                        _this._animationCallbacksBuffer = [];
                    });
                });
            }
            this._animationCallbacksBuffer.push([fn, data]);
        };
        AnimationRendererFactory.prototype.end = function () {
            var _this = this;
            this._cdRecurDepth--;
            // this is to prevent animations from running twice when an inner
            // component does CD when a parent component insted has inserted it
            if (this._cdRecurDepth == 0) {
                this._zone.runOutsideAngular(function () {
                    _this._scheduleCountTask();
                    _this.engine.flush(_this._microtaskId);
                });
            }
            if (this.delegate.end) {
                this.delegate.end();
            }
        };
        AnimationRendererFactory.prototype.whenRenderingDone = function () { return this.engine.whenRenderingDone(); };
        return AnimationRendererFactory;
    }());
    AnimationRendererFactory = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.RendererFactory2, browser_1.ɵAnimationEngine, core_1.NgZone])
    ], AnimationRendererFactory);
    exports.AnimationRendererFactory = AnimationRendererFactory;
    var BaseAnimationRenderer = (function () {
        function BaseAnimationRenderer(namespaceId, delegate, engine) {
            this.namespaceId = namespaceId;
            this.delegate = delegate;
            this.engine = engine;
            this.destroyNode = this.delegate.destroyNode ? function (n) { return delegate.destroyNode(n); } : null;
        }
        Object.defineProperty(BaseAnimationRenderer.prototype, "data", {
            get: function () { return this.delegate.data; },
            enumerable: true,
            configurable: true
        });
        BaseAnimationRenderer.prototype.destroy = function () {
            this.engine.destroy(this.namespaceId, this.delegate);
            this.delegate.destroy();
        };
        BaseAnimationRenderer.prototype.createElement = function (name, namespace) {
            return this.delegate.createElement(name, namespace);
        };
        BaseAnimationRenderer.prototype.createComment = function (value) { return this.delegate.createComment(value); };
        BaseAnimationRenderer.prototype.createText = function (value) { return this.delegate.createText(value); };
        BaseAnimationRenderer.prototype.appendChild = function (parent, newChild) {
            this.delegate.appendChild(parent, newChild);
            this.engine.onInsert(this.namespaceId, newChild, parent, false);
        };
        BaseAnimationRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
            this.delegate.insertBefore(parent, newChild, refChild);
            this.engine.onInsert(this.namespaceId, newChild, parent, true);
        };
        BaseAnimationRenderer.prototype.removeChild = function (parent, oldChild) {
            this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
        };
        BaseAnimationRenderer.prototype.selectRootElement = function (selectorOrNode) { return this.delegate.selectRootElement(selectorOrNode); };
        BaseAnimationRenderer.prototype.parentNode = function (node) { return this.delegate.parentNode(node); };
        BaseAnimationRenderer.prototype.nextSibling = function (node) { return this.delegate.nextSibling(node); };
        BaseAnimationRenderer.prototype.setAttribute = function (el, name, value, namespace) {
            this.delegate.setAttribute(el, name, value, namespace);
        };
        BaseAnimationRenderer.prototype.removeAttribute = function (el, name, namespace) {
            this.delegate.removeAttribute(el, name, namespace);
        };
        BaseAnimationRenderer.prototype.addClass = function (el, name) { this.delegate.addClass(el, name); };
        BaseAnimationRenderer.prototype.removeClass = function (el, name) { this.delegate.removeClass(el, name); };
        BaseAnimationRenderer.prototype.setStyle = function (el, style, value, flags) {
            this.delegate.setStyle(el, style, value, flags);
        };
        BaseAnimationRenderer.prototype.removeStyle = function (el, style, flags) {
            this.delegate.removeStyle(el, style, flags);
        };
        BaseAnimationRenderer.prototype.setProperty = function (el, name, value) {
            if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
                this.disableAnimations(el, !!value);
            }
            else {
                this.delegate.setProperty(el, name, value);
            }
        };
        BaseAnimationRenderer.prototype.setValue = function (node, value) { this.delegate.setValue(node, value); };
        BaseAnimationRenderer.prototype.listen = function (target, eventName, callback) {
            return this.delegate.listen(target, eventName, callback);
        };
        BaseAnimationRenderer.prototype.disableAnimations = function (element, value) {
            this.engine.disableAnimations(element, value);
        };
        return BaseAnimationRenderer;
    }());
    exports.BaseAnimationRenderer = BaseAnimationRenderer;
    var AnimationRenderer = (function (_super) {
        __extends(AnimationRenderer, _super);
        function AnimationRenderer(factory, namespaceId, delegate, engine) {
            var _this = _super.call(this, namespaceId, delegate, engine) || this;
            _this.factory = factory;
            _this.namespaceId = namespaceId;
            return _this;
        }
        AnimationRenderer.prototype.setProperty = function (el, name, value) {
            if (name.charAt(0) == ANIMATION_PREFIX) {
                if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                    value = value === undefined ? true : !!value;
                    this.disableAnimations(el, value);
                }
                else {
                    this.engine.process(this.namespaceId, el, name.substr(1), value);
                }
            }
            else {
                this.delegate.setProperty(el, name, value);
            }
        };
        AnimationRenderer.prototype.listen = function (target, eventName, callback) {
            var _this = this;
            if (eventName.charAt(0) == ANIMATION_PREFIX) {
                var element = resolveElementFromTarget(target);
                var name_1 = eventName.substr(1);
                var phase = '';
                // @listener.phase is for trigger animation callbacks
                // @@listener is for animation builder callbacks
                if (name_1.charAt(0) != ANIMATION_PREFIX) {
                    _a = parseTriggerCallbackName(name_1), name_1 = _a[0], phase = _a[1];
                }
                return this.engine.listen(this.namespaceId, element, name_1, phase, function (event) {
                    var countId = event['_data'] || -1;
                    _this.factory.scheduleListenerCallback(countId, callback, event);
                });
            }
            return this.delegate.listen(target, eventName, callback);
            var _a;
        };
        return AnimationRenderer;
    }(BaseAnimationRenderer));
    exports.AnimationRenderer = AnimationRenderer;
    function resolveElementFromTarget(target) {
        switch (target) {
            case 'body':
                return document.body;
            case 'document':
                return document;
            case 'window':
                return window;
            default:
                return target;
        }
    }
    function parseTriggerCallbackName(triggerName) {
        var dotIndex = triggerName.indexOf('.');
        var trigger = triggerName.substring(0, dotIndex);
        var phase = triggerName.substr(dotIndex + 1);
        return [trigger, phase];
    }
});
//# sourceMappingURL=animation_renderer.js.map