var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "./Liferay.constants"], function (require, exports, core_1, Liferay_constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LiferayServiceImpl = (function () {
        function LiferayServiceImpl() {
            try {
                this.liferay = Liferay;
            }
            catch (e) {
                this.liferay = undefined;
            }
        }
        LiferayServiceImpl.prototype.getUserLiferay = function () {
            if (this.liferay) {
                return this.liferay.ThemeDisplay.getUserName();
            }
            return Liferay_constants_1.LIFERAY_SERVICE_CONSTATNS.DEFAULT_USER;
        };
        LiferayServiceImpl.prototype.getLanguageLiferay = function () {
            if (this.liferay) {
                return this.liferay.ThemeDisplay.getLanguageId();
            }
            return Liferay_constants_1.LIFERAY_SERVICE_CONSTATNS.DEFAULT_LANGUAGE;
        };
        return LiferayServiceImpl;
    }());
    LiferayServiceImpl = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LiferayServiceImpl);
    exports.LiferayServiceImpl = LiferayServiceImpl;
});
//# sourceMappingURL=Liferay.serviceImpl.js.map