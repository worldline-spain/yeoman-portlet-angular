define(["require", "exports", "@angular/platform-browser-dynamic", "./app/app.module", "./app/dynamic.loader", "./app/app.component"], function (require, exports, platform_browser_dynamic_1, app_module_1, dynamic_loader_1, app_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(rootId) {
        platform_browser_dynamic_1.platformBrowserDynamic()
            .bootstrapModule(app_module_1.AppModule)
            .then(function (injector) {
            var dynamicLoader = new dynamic_loader_1.DynamicLoader(injector);
            dynamicLoader.loadComponent(app_component_1.AppComponent, rootId);
        });
    }
    exports.default = default_1;
});
//# sourceMappingURL=main.js.map