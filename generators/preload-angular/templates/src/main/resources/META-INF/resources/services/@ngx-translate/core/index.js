var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core", "./src/translate.loader", "./src/translate.service", "./src/missing-translation-handler", "./src/translate.parser", "./src/translate.directive", "./src/translate.pipe", "./src/translate.store", "./src/translate.service", "./src/translate.loader", "./src/translate.service", "./src/missing-translation-handler", "./src/translate.parser", "./src/translate.directive", "./src/translate.pipe"], function (require, exports, core_1, translate_loader_1, translate_service_1, missing_translation_handler_1, translate_parser_1, translate_directive_1, translate_pipe_1, translate_store_1, translate_service_2, translate_loader_2, translate_service_3, missing_translation_handler_2, translate_parser_2, translate_directive_2, translate_pipe_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(translate_loader_2);
    __export(translate_service_3);
    __export(missing_translation_handler_2);
    __export(translate_parser_2);
    __export(translate_directive_2);
    __export(translate_pipe_2);
    var TranslateModule = TranslateModule_1 = (function () {
        function TranslateModule() {
        }
        /**
         * Use this method in your root module to provide the TranslateService
         * @param {TranslateModuleConfig} config
         * @returns {ModuleWithProviders}
         */
        TranslateModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: TranslateModule_1,
                providers: [
                    config.loader || { provide: translate_loader_1.TranslateLoader, useClass: translate_loader_1.TranslateFakeLoader },
                    config.parser || { provide: translate_parser_1.TranslateParser, useClass: translate_parser_1.TranslateDefaultParser },
                    config.missingTranslationHandler || { provide: missing_translation_handler_1.MissingTranslationHandler, useClass: missing_translation_handler_1.FakeMissingTranslationHandler },
                    translate_store_1.TranslateStore,
                    { provide: translate_service_2.USE_STORE, useValue: config.isolate },
                    translate_service_1.TranslateService
                ]
            };
        };
        /**
         * Use this method in your other (non root) modules to import the directive/pipe
         * @param {TranslateModuleConfig} config
         * @returns {ModuleWithProviders}
         */
        TranslateModule.forChild = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: TranslateModule_1,
                providers: [
                    config.loader || { provide: translate_loader_1.TranslateLoader, useClass: translate_loader_1.TranslateFakeLoader },
                    config.parser || { provide: translate_parser_1.TranslateParser, useClass: translate_parser_1.TranslateDefaultParser },
                    config.missingTranslationHandler || { provide: missing_translation_handler_1.MissingTranslationHandler, useClass: missing_translation_handler_1.FakeMissingTranslationHandler },
                    { provide: translate_service_2.USE_STORE, useValue: config.isolate },
                    translate_service_1.TranslateService
                ]
            };
        };
        return TranslateModule;
    }());
    TranslateModule = TranslateModule_1 = __decorate([
        core_1.NgModule({
            declarations: [
                translate_pipe_1.TranslatePipe,
                translate_directive_1.TranslateDirective
            ],
            exports: [
                translate_pipe_1.TranslatePipe,
                translate_directive_1.TranslateDirective
            ]
        })
    ], TranslateModule);
    exports.TranslateModule = TranslateModule;
    var TranslateModule_1;
});
//# sourceMappingURL=index.js.map