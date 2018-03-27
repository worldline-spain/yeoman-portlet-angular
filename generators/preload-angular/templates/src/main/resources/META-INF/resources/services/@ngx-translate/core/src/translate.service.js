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
define(["require", "exports", "@angular/core", "rxjs/Observable", "./translate.store", "./translate.loader", "./missing-translation-handler", "./translate.parser", "./util", "rxjs/add/observable/of", "rxjs/add/operator/share", "rxjs/add/operator/map", "rxjs/add/operator/merge", "rxjs/add/operator/toArray", "rxjs/add/operator/take"], function (require, exports, core_1, Observable_1, translate_store_1, translate_loader_1, missing_translation_handler_1, translate_parser_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USE_STORE = new core_1.OpaqueToken('USE_STORE');
    var TranslateService = (function () {
        /**
         *
         * @param store an instance of the store (that is supposed to be unique)
         * @param currentLoader An instance of the loader currently used
         * @param parser An instance of the parser currently used
         * @param missingTranslationHandler A handler for missing translations.
         * @param isolate whether this service should use the store or not
         */
        function TranslateService(store, currentLoader, parser, missingTranslationHandler, isolate) {
            if (isolate === void 0) { isolate = false; }
            this.store = store;
            this.currentLoader = currentLoader;
            this.parser = parser;
            this.missingTranslationHandler = missingTranslationHandler;
            this.isolate = isolate;
            this.pending = false;
            this._onTranslationChange = new core_1.EventEmitter();
            this._onLangChange = new core_1.EventEmitter();
            this._onDefaultLangChange = new core_1.EventEmitter();
            this._langs = [];
            this._translations = {};
            this._translationRequests = {};
        }
        Object.defineProperty(TranslateService.prototype, "onTranslationChange", {
            /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
             *     // do something
             * });
             * @type {EventEmitter<TranslationChangeEvent>}
             */
            get: function () {
                return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "onLangChange", {
            /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
             *     // do something
             * });
             * @type {EventEmitter<LangChangeEvent>}
             */
            get: function () {
                return this.isolate ? this._onLangChange : this.store.onLangChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "onDefaultLangChange", {
            /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
             *     // do something
             * });
             * @type {EventEmitter<DefaultLangChangeEvent>}
             */
            get: function () {
                return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "defaultLang", {
            /**
             * The default lang to fallback when translations are missing on the current lang
             */
            get: function () {
                return this.isolate ? this._defaultLang : this.store.defaultLang;
            },
            set: function (defaultLang) {
                if (this.isolate) {
                    this._defaultLang = defaultLang;
                }
                else {
                    this.store.defaultLang = defaultLang;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "currentLang", {
            /**
             * The lang currently used
             * @type {string}
             */
            get: function () {
                return this.isolate ? this._currentLang : this.store.currentLang;
            },
            set: function (currentLang) {
                if (this.isolate) {
                    this._currentLang = currentLang;
                }
                else {
                    this.store.currentLang = currentLang;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "langs", {
            /**
             * an array of langs
             * @type {Array}
             */
            get: function () {
                return this.isolate ? this._langs : this.store.langs;
            },
            set: function (langs) {
                if (this.isolate) {
                    this._langs = langs;
                }
                else {
                    this.store.langs = langs;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TranslateService.prototype, "translations", {
            /**
             * a list of translations per lang
             * @type {{}}
             */
            get: function () {
                return this.isolate ? this._translations : this.store.translations;
            },
            set: function (translations) {
                if (this.isolate) {
                    this._currentLang = translations;
                }
                else {
                    this.store.translations = translations;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the default language to use as a fallback
         * @param lang
         */
        TranslateService.prototype.setDefaultLang = function (lang) {
            var _this = this;
            if (lang === this.defaultLang) {
                return;
            }
            var pending = this.retrieveTranslations(lang);
            if (typeof pending !== "undefined") {
                // on init set the defaultLang immediately
                if (!this.defaultLang) {
                    this.defaultLang = lang;
                }
                pending.take(1)
                    .subscribe(function (res) {
                    _this.changeDefaultLang(lang);
                });
            }
            else {
                this.changeDefaultLang(lang);
            }
        };
        /**
         * Gets the default language used
         * @returns string
         */
        TranslateService.prototype.getDefaultLang = function () {
            return this.defaultLang;
        };
        /**
         * Changes the lang currently used
         * @param lang
         * @returns {Observable<*>}
         */
        TranslateService.prototype.use = function (lang) {
            var _this = this;
            var pending = this.retrieveTranslations(lang);
            if (typeof pending !== "undefined") {
                // on init set the currentLang immediately
                if (!this.currentLang) {
                    this.currentLang = lang;
                }
                pending.take(1)
                    .subscribe(function (res) {
                    _this.changeLang(lang);
                });
                return pending;
            }
            else {
                this.changeLang(lang);
                return Observable_1.Observable.of(this.translations[lang]);
            }
        };
        /**
         * Retrieves the given translations
         * @param lang
         * @returns {Observable<*>}
         */
        TranslateService.prototype.retrieveTranslations = function (lang) {
            var pending;
            // if this language is unavailable, ask for it
            if (typeof this.translations[lang] === "undefined") {
                this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
                pending = this._translationRequests[lang];
            }
            return pending;
        };
        /**
         * Gets an object of translations for a given language with the current loader
         * @param lang
         * @returns {Observable<*>}
         */
        TranslateService.prototype.getTranslation = function (lang) {
            var _this = this;
            this.pending = true;
            this.loadingTranslations = this.currentLoader.getTranslation(lang).share();
            this.loadingTranslations.take(1)
                .subscribe(function (res) {
                _this.translations[lang] = res;
                _this.updateLangs();
                _this.pending = false;
            }, function (err) {
                _this.pending = false;
            });
            return this.loadingTranslations;
        };
        /**
         * Manually sets an object of translations for a given language
         * @param lang
         * @param translations
         * @param shouldMerge
         */
        TranslateService.prototype.setTranslation = function (lang, translations, shouldMerge) {
            if (shouldMerge === void 0) { shouldMerge = false; }
            if (shouldMerge && this.translations[lang]) {
                Object.assign(this.translations[lang], translations);
            }
            else {
                this.translations[lang] = translations;
            }
            this.updateLangs();
            this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
        };
        /**
         * Returns an array of currently available langs
         * @returns {any}
         */
        TranslateService.prototype.getLangs = function () {
            return this.langs;
        };
        /**
         * @param langs
         * Add available langs
         */
        TranslateService.prototype.addLangs = function (langs) {
            var _this = this;
            langs.forEach(function (lang) {
                if (_this.langs.indexOf(lang) === -1) {
                    _this.langs.push(lang);
                }
            });
        };
        /**
         * Update the list of available langs
         */
        TranslateService.prototype.updateLangs = function () {
            this.addLangs(Object.keys(this.translations));
        };
        /**
         * Returns the parsed result of the translations
         * @param translations
         * @param key
         * @param interpolateParams
         * @returns {any}
         */
        TranslateService.prototype.getParsedResult = function (translations, key, interpolateParams) {
            var res;
            if (key instanceof Array) {
                var result = {}, observables = false;
                for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                    var k = key_1[_i];
                    result[k] = this.getParsedResult(translations, k, interpolateParams);
                    if (typeof result[k].subscribe === "function") {
                        observables = true;
                    }
                }
                if (observables) {
                    var mergedObs = void 0;
                    for (var _a = 0, key_2 = key; _a < key_2.length; _a++) {
                        var k = key_2[_a];
                        var obs = typeof result[k].subscribe === "function" ? result[k] : Observable_1.Observable.of(result[k]);
                        if (typeof mergedObs === "undefined") {
                            mergedObs = obs;
                        }
                        else {
                            mergedObs = mergedObs.merge(obs);
                        }
                    }
                    return mergedObs.toArray().map(function (arr) {
                        var obj = {};
                        arr.forEach(function (value, index) {
                            obj[key[index]] = value;
                        });
                        return obj;
                    });
                }
                return result;
            }
            if (translations) {
                res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
            }
            if (typeof res === "undefined" && this.defaultLang && this.defaultLang !== this.currentLang) {
                res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
            }
            if (typeof res === "undefined") {
                var params = { key: key, translateService: this };
                if (typeof interpolateParams !== 'undefined') {
                    params.interpolateParams = interpolateParams;
                }
                res = this.missingTranslationHandler.handle(params);
            }
            return typeof res !== "undefined" ? res : key;
        };
        /**
         * Gets the translated value of a key (or an array of keys)
         * @param key
         * @param interpolateParams
         * @returns {any} the translated key, or an object of translated keys
         */
        TranslateService.prototype.get = function (key, interpolateParams) {
            var _this = this;
            if (!util_1.isDefined(key) || !key.length) {
                throw new Error("Parameter \"key\" required");
            }
            // check if we are loading a new translation to use
            if (this.pending) {
                return Observable_1.Observable.create(function (observer) {
                    var onComplete = function (res) {
                        observer.next(res);
                        observer.complete();
                    };
                    var onError = function (err) {
                        observer.error(err);
                    };
                    _this.loadingTranslations.subscribe(function (res) {
                        res = _this.getParsedResult(res, key, interpolateParams);
                        if (typeof res.subscribe === "function") {
                            res.subscribe(onComplete, onError);
                        }
                        else {
                            onComplete(res);
                        }
                    }, onError);
                });
            }
            else {
                var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
                if (typeof res.subscribe === "function") {
                    return res;
                }
                else {
                    return Observable_1.Observable.of(res);
                }
            }
        };
        /**
         * Returns a translation instantly from the internal state of loaded translation.
         * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
         * @param key
         * @param interpolateParams
         * @returns {string}
         */
        TranslateService.prototype.instant = function (key, interpolateParams) {
            if (!util_1.isDefined(key) || !key.length) {
                throw new Error("Parameter \"key\" required");
            }
            var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            if (typeof res.subscribe !== "undefined") {
                if (key instanceof Array) {
                    var obj_1 = {};
                    key.forEach(function (value, index) {
                        obj_1[key[index]] = key[index];
                    });
                    return obj_1;
                }
                return key;
            }
            else {
                return res;
            }
        };
        /**
         * Sets the translated value of a key
         * @param key
         * @param value
         * @param lang
         */
        TranslateService.prototype.set = function (key, value, lang) {
            if (lang === void 0) { lang = this.currentLang; }
            this.translations[lang][key] = value;
            this.updateLangs();
            this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
        };
        /**
         * Changes the current lang
         * @param lang
         */
        TranslateService.prototype.changeLang = function (lang) {
            this.currentLang = lang;
            this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
            // if there is no default lang, use the one that we just set
            if (!this.defaultLang) {
                this.changeDefaultLang(lang);
            }
        };
        /**
         * Changes the default lang
         * @param lang
         */
        TranslateService.prototype.changeDefaultLang = function (lang) {
            this.defaultLang = lang;
            this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
        };
        /**
         * Allows to reload the lang file from the file
         * @param lang
         * @returns {Observable<any>}
         */
        TranslateService.prototype.reloadLang = function (lang) {
            this.resetLang(lang);
            return this.getTranslation(lang);
        };
        /**
         * Deletes inner translation
         * @param lang
         */
        TranslateService.prototype.resetLang = function (lang) {
            this._translationRequests[lang] = undefined;
            this.translations[lang] = undefined;
        };
        /**
         * Returns the language code name from the browser, e.g. "de"
         *
         * @returns string
         */
        TranslateService.prototype.getBrowserLang = function () {
            if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
                return undefined;
            }
            var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
            browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
            if (browserLang.indexOf('-') !== -1) {
                browserLang = browserLang.split('-')[0];
            }
            if (browserLang.indexOf('_') !== -1) {
                browserLang = browserLang.split('_')[0];
            }
            return browserLang;
        };
        /**
         * Returns the culture language code name from the browser, e.g. "de-DE"
         *
         * @returns string
         */
        TranslateService.prototype.getBrowserCultureLang = function () {
            if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
                return undefined;
            }
            var browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
            browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
            return browserCultureLang;
        };
        return TranslateService;
    }());
    TranslateService = __decorate([
        core_1.Injectable(),
        __param(4, core_1.Inject(exports.USE_STORE)),
        __metadata("design:paramtypes", [translate_store_1.TranslateStore,
            translate_loader_1.TranslateLoader,
            translate_parser_1.TranslateParser,
            missing_translation_handler_1.MissingTranslationHandler, Boolean])
    ], TranslateService);
    exports.TranslateService = TranslateService;
});
//# sourceMappingURL=translate.service.js.map