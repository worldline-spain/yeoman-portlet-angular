var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "./translate.service", "./util"], function (require, exports, core_1, translate_service_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TranslatePipe = (function () {
        function TranslatePipe(translate, _ref) {
            this.translate = translate;
            this._ref = _ref;
            this.value = '';
        }
        TranslatePipe.prototype.updateValue = function (key, interpolateParams, translations) {
            var _this = this;
            var onTranslation = function (res) {
                _this.value = res !== undefined ? res : key;
                _this.lastKey = key;
                _this._ref.markForCheck();
            };
            if (translations) {
                var res = this.translate.getParsedResult(translations, key, interpolateParams);
                if (typeof res.subscribe === 'function') {
                    res.subscribe(onTranslation);
                }
                else {
                    onTranslation(res);
                }
            }
            this.translate.get(key, interpolateParams).subscribe(onTranslation);
        };
        TranslatePipe.prototype.transform = function (query) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!query || query.length === 0) {
                return query;
            }
            // if we ask another time for the same key, return the last value
            if (util_1.equals(query, this.lastKey) && util_1.equals(args, this.lastParams)) {
                return this.value;
            }
            var interpolateParams;
            if (util_1.isDefined(args[0]) && args.length) {
                if (typeof args[0] === 'string' && args[0].length) {
                    // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                    // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                    var validArgs = args[0]
                        .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                        .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                    try {
                        interpolateParams = JSON.parse(validArgs);
                    }
                    catch (e) {
                        throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                    }
                }
                else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                    interpolateParams = args[0];
                }
            }
            // store the query, in case it changes
            this.lastKey = query;
            // store the params, in case they change
            this.lastParams = args;
            // set the value
            this.updateValue(query, interpolateParams);
            // if there is a subscription to onLangChange, clean it
            this._dispose();
            // subscribe to onTranslationChange event, in case the translations change
            if (!this.onTranslationChange) {
                this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                    if (_this.lastKey && event.lang === _this.translate.currentLang) {
                        _this.lastKey = null;
                        _this.updateValue(query, interpolateParams, event.translations);
                    }
                });
            }
            // subscribe to onLangChange event, in case the language changes
            if (!this.onLangChange) {
                this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                    if (_this.lastKey) {
                        _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                        _this.updateValue(query, interpolateParams, event.translations);
                    }
                });
            }
            // subscribe to onDefaultLangChange event, in case the default language changes
            if (!this.onDefaultLangChange) {
                this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(function () {
                    if (_this.lastKey) {
                        _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                        _this.updateValue(query, interpolateParams);
                    }
                });
            }
            return this.value;
        };
        /**
         * Clean any existing subscription to change events
         * @private
         */
        TranslatePipe.prototype._dispose = function () {
            if (typeof this.onTranslationChange !== 'undefined') {
                this.onTranslationChange.unsubscribe();
                this.onTranslationChange = undefined;
            }
            if (typeof this.onLangChange !== 'undefined') {
                this.onLangChange.unsubscribe();
                this.onLangChange = undefined;
            }
            if (typeof this.onDefaultLangChange !== 'undefined') {
                this.onDefaultLangChange.unsubscribe();
                this.onDefaultLangChange = undefined;
            }
        };
        TranslatePipe.prototype.ngOnDestroy = function () {
            this._dispose();
        };
        return TranslatePipe;
    }());
    TranslatePipe = __decorate([
        core_1.Injectable(),
        core_1.Pipe({
            name: 'translate',
            pure: false // required to update the value when the promise is resolved
        }),
        __metadata("design:paramtypes", [translate_service_1.TranslateService, core_1.ChangeDetectorRef])
    ], TranslatePipe);
    exports.TranslatePipe = TranslatePipe;
});
//# sourceMappingURL=translate.pipe.js.map