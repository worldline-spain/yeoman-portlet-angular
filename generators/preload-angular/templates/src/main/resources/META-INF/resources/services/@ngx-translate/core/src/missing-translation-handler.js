var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MissingTranslationHandler = (function () {
        function MissingTranslationHandler() {
        }
        return MissingTranslationHandler;
    }());
    exports.MissingTranslationHandler = MissingTranslationHandler;
    /**
     * This handler is just a placeholder that does nothing, in case you don't need a missing translation handler at all
     */
    var FakeMissingTranslationHandler = (function () {
        function FakeMissingTranslationHandler() {
        }
        FakeMissingTranslationHandler.prototype.handle = function (params) {
            return params.key;
        };
        return FakeMissingTranslationHandler;
    }());
    FakeMissingTranslationHandler = __decorate([
        core_1.Injectable()
    ], FakeMissingTranslationHandler);
    exports.FakeMissingTranslationHandler = FakeMissingTranslationHandler;
});
//# sourceMappingURL=missing-translation-handler.js.map