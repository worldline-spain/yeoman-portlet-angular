define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TranslateStore = (function () {
        function TranslateStore() {
            /**
             * The lang currently used
             * @type {string}
             */
            this.currentLang = this.defaultLang;
            /**
             * a list of translations per lang
             * @type {{}}
             */
            this.translations = {};
            /**
             * an array of langs
             * @type {Array}
             */
            this.langs = [];
            /**
             * An EventEmitter to listen to translation change events
             * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
             *     // do something
             * });
             * @type {EventEmitter<TranslationChangeEvent>}
             */
            this.onTranslationChange = new core_1.EventEmitter();
            /**
             * An EventEmitter to listen to lang change events
             * onLangChange.subscribe((params: LangChangeEvent) => {
             *     // do something
             * });
             * @type {EventEmitter<LangChangeEvent>}
             */
            this.onLangChange = new core_1.EventEmitter();
            /**
             * An EventEmitter to listen to default lang change events
             * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
             *     // do something
             * });
             * @type {EventEmitter<DefaultLangChangeEvent>}
             */
            this.onDefaultLangChange = new core_1.EventEmitter();
        }
        return TranslateStore;
    }());
    exports.TranslateStore = TranslateStore;
});
//# sourceMappingURL=translate.store.js.map