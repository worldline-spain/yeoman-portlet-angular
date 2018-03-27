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
define(["require", "exports", "rxjs/Observable", "@angular/core"], function (require, exports, Observable_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TranslateLoader = (function () {
        function TranslateLoader() {
        }
        return TranslateLoader;
    }());
    exports.TranslateLoader = TranslateLoader;
    /**
     * This loader is just a placeholder that does nothing, in case you don't need a loader at all
     */
    var TranslateFakeLoader = (function (_super) {
        __extends(TranslateFakeLoader, _super);
        function TranslateFakeLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TranslateFakeLoader.prototype.getTranslation = function (lang) {
            return Observable_1.Observable.of({});
        };
        return TranslateFakeLoader;
    }(TranslateLoader));
    TranslateFakeLoader = __decorate([
        core_1.Injectable()
    ], TranslateFakeLoader);
    exports.TranslateFakeLoader = TranslateFakeLoader;
});
//# sourceMappingURL=translate.loader.js.map