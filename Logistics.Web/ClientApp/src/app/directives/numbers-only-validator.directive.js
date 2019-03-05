"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NumbersOnlyDirective = /** @class */ (function () {
    function NumbersOnlyDirective(_el) {
        this._el = _el;
        this.validRegEx = /[^1-9]+/;
        this.validator = this.numbersOnly();
    }
    NumbersOnlyDirective_1 = NumbersOnlyDirective;
    //@HostListener('input', ['$event']) onInputChange(event) {
    //  const initialValue = this._el.nativeElement.value;
    //  this._el.nativeElement.value = initialValue.replace(/[^1-9]+/, '');
    //  if (initialValue !== this._el.nativeElement.value) {
    //    event.stopPropagation();
    //  }
    //}
    NumbersOnlyDirective.prototype.validate = function (c) {
        return this.validator(c);
    };
    NumbersOnlyDirective.prototype.numbersOnly = function () {
        var _this = this;
        return function (c) {
            var isValid = _this.validRegEx.test(c.value);
            if (isValid) {
                return null;
            }
            else {
                return {
                    numbersonly: {
                        valid: false
                    }
                };
            }
        };
    };
    var NumbersOnlyDirective_1;
    NumbersOnlyDirective = NumbersOnlyDirective_1 = __decorate([
        core_1.Directive({
            selector: '[numbersOnly][ngModel]',
            providers: [{
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: NumbersOnlyDirective_1,
                    multi: true
                }]
        })
    ], NumbersOnlyDirective);
    return NumbersOnlyDirective;
}());
exports.NumbersOnlyDirective = NumbersOnlyDirective;
//# sourceMappingURL=numbers-only-validator.directive.js.map