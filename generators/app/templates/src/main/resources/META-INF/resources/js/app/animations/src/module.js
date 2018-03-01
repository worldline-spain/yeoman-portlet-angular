var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core", "@angular/platform-browser", "./providers"], function (require, exports, core_1, platform_browser_1, providers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @experimental Animation support is experimental.
     */
    var BrowserAnimationsModule = (function () {
        function BrowserAnimationsModule() {
        }
        return BrowserAnimationsModule;
    }());
    BrowserAnimationsModule = __decorate([
        core_1.NgModule({
            exports: [platform_browser_1.BrowserModule],
            providers: providers_1.BROWSER_ANIMATIONS_PROVIDERS,
        })
    ], BrowserAnimationsModule);
    exports.BrowserAnimationsModule = BrowserAnimationsModule;
    /**
     * @experimental Animation support is experimental.
     */
    var NoopAnimationsModule = (function () {
        function NoopAnimationsModule() {
        }
        return NoopAnimationsModule;
    }());
    NoopAnimationsModule = __decorate([
        core_1.NgModule({
            exports: [platform_browser_1.BrowserModule],
            providers: providers_1.BROWSER_NOOP_ANIMATIONS_PROVIDERS,
        })
    ], NoopAnimationsModule);
    exports.NoopAnimationsModule = NoopAnimationsModule;
});
//# sourceMappingURL=module.js.map