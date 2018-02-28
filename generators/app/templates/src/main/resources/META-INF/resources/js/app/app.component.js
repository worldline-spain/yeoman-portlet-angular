var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppComponent = (function () {
        function AppComponent() {
            this.caption = 'hola mutual!';
            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };
        }
        return AppComponent;
    }());
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: '/o/<%= title %>/js/app/app.html'
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    exports.AppComponent = AppComponent;
});
//# sourceMappingURL=app.component.js.map