var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "./util", "./translate.service"], function (require, exports, core_1, util_1, translate_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TranslateDirective = (function () {
        function TranslateDirective(translateService, element, _ref) {
            var _this = this;
            this.translateService = translateService;
            this.element = element;
            this._ref = _ref;
            // subscribe to onTranslationChange event, in case the translations of the current lang change
            if (!this.onTranslationChangeSub) {
                this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe(function (event) {
                    if (event.lang === _this.translateService.currentLang) {
                        _this.checkNodes(true, event.translations);
                    }
                });
            }
            // subscribe to onLangChange event, in case the language changes
            if (!this.onLangChangeSub) {
                this.onLangChangeSub = this.translateService.onLangChange.subscribe(function (event) {
                    _this.checkNodes(true, event.translations);
                });
            }
            // subscribe to onDefaultLangChange event, in case the default language changes
            if (!this.onDefaultLangChangeSub) {
                this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe(function (event) {
                    _this.checkNodes(true);
                });
            }
        }
        Object.defineProperty(TranslateDirective.prototype, "translate", {
            set: function (key) {
                if (key) {
                    this.key = key;
                    this.checkNodes();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateDirective.prototype, "translateParams", {
            set: function (params) {
                if (!util_1.equals(this.currentParams, params)) {
                    this.currentParams = params;
                    this.checkNodes(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        TranslateDirective.prototype.ngAfterViewChecked = function () {
            this.checkNodes();
        };
        TranslateDirective.prototype.checkNodes = function (forceUpdate, translations) {
            if (forceUpdate === void 0) { forceUpdate = false; }
            var nodes = this.element.nativeElement.childNodes;
            // if the element is empty
            if (!nodes.length) {
                // we add the key as content
                this.setContent(this.element.nativeElement, this.key);
                nodes = this.element.nativeElement.childNodes;
            }
            for (var i = 0; i < nodes.length; ++i) {
                var node = nodes[i];
                if (node.nodeType === 3) {
                    var key = void 0;
                    if (this.key) {
                        key = this.key;
                        if (forceUpdate) {
                            node.lastKey = null;
                        }
                    }
                    else {
                        var content = this.getContent(node).trim();
                        if (content.length) {
                            // we want to use the content as a key, not the translation value
                            if (content !== node.currentValue) {
                                key = content;
                                // the content was changed from the user, we'll use it as a reference if needed
                                node.originalContent = this.getContent(node);
                            }
                            else if (node.originalContent && forceUpdate) {
                                node.lastKey = null;
                                // the current content is the translation, not the key, use the last real content as key
                                key = node.originalContent.trim();
                            }
                        }
                    }
                    this.updateValue(key, node, translations);
                }
            }
        };
        TranslateDirective.prototype.updateValue = function (key, node, translations) {
            var _this = this;
            if (key) {
                if (node.lastKey === key && this.lastParams === this.currentParams) {
                    return;
                }
                this.lastParams = this.currentParams;
                var onTranslation = function (res) {
                    if (res !== key) {
                        node.lastKey = key;
                    }
                    if (!node.originalContent) {
                        node.originalContent = _this.getContent(node);
                    }
                    node.currentValue = util_1.isDefined(res) ? res : (node.originalContent || key);
                    // we replace in the original content to preserve spaces that we might have trimmed
                    _this.setContent(node, _this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
                    _this._ref.markForCheck();
                };
                if (util_1.isDefined(translations)) {
                    var res = this.translateService.getParsedResult(translations, key, this.currentParams);
                    if (typeof res.subscribe === "function") {
                        res.subscribe(onTranslation);
                    }
                    else {
                        onTranslation(res);
                    }
                }
                else {
                    this.translateService.get(key, this.currentParams).subscribe(onTranslation);
                }
            }
        };
        TranslateDirective.prototype.getContent = function (node) {
            return util_1.isDefined(node.textContent) ? node.textContent : node.data;
        };
        TranslateDirective.prototype.setContent = function (node, content) {
            if (util_1.isDefined(node.textContent)) {
                node.textContent = content;
            }
            else {
                node.data = content;
            }
        };
        TranslateDirective.prototype.ngOnDestroy = function () {
            if (this.onLangChangeSub) {
                this.onLangChangeSub.unsubscribe();
            }
            if (this.onDefaultLangChangeSub) {
                this.onDefaultLangChangeSub.unsubscribe();
            }
            if (this.onTranslationChangeSub) {
                this.onTranslationChangeSub.unsubscribe();
            }
        };
        return TranslateDirective;
    }());
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TranslateDirective.prototype, "translate", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TranslateDirective.prototype, "translateParams", null);
    TranslateDirective = __decorate([
        core_1.Directive({
            selector: '[translate],[ngx-translate]'
        }),
        __metadata("design:paramtypes", [translate_service_1.TranslateService, core_1.ElementRef, core_1.ChangeDetectorRef])
    ], TranslateDirective);
    exports.TranslateDirective = TranslateDirective;
});
//# sourceMappingURL=translate.directive.js.map