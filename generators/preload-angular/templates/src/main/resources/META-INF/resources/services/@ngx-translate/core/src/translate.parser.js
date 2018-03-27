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
define(["require", "exports", "@angular/core", "./util"], function (require, exports, core_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TranslateParser = (function () {
        function TranslateParser() {
        }
        return TranslateParser;
    }());
    exports.TranslateParser = TranslateParser;
    var TranslateDefaultParser = (function (_super) {
        __extends(TranslateDefaultParser, _super);
        function TranslateDefaultParser() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
            return _this;
        }
        TranslateDefaultParser.prototype.interpolate = function (expr, params) {
            var _this = this;
            if (typeof expr !== 'string' || !params) {
                return expr;
            }
            return expr.replace(this.templateMatcher, function (substring, b) {
                var r = _this.getValue(params, b);
                return util_1.isDefined(r) ? r : substring;
            });
        };
        TranslateDefaultParser.prototype.getValue = function (target, key) {
            var keys = key.split('.');
            key = '';
            do {
                key += keys.shift();
                if (util_1.isDefined(target) && util_1.isDefined(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                    target = target[key];
                    key = '';
                }
                else if (!keys.length) {
                    target = undefined;
                }
                else {
                    key += '.';
                }
            } while (keys.length);
            return target;
        };
        return TranslateDefaultParser;
    }(TranslateParser));
    TranslateDefaultParser = __decorate([
        core_1.Injectable()
    ], TranslateDefaultParser);
    exports.TranslateDefaultParser = TranslateDefaultParser;
});
//# sourceMappingURL=translate.parser.js.map