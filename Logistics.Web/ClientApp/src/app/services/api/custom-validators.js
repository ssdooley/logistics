"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
// setup simple regex for white listed character
// const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
// const validCharacters = /[^[1-9]\d*$]/;
var validCharacters = /[^1-9]+/;
var CustomValidators = /** @class */ (function (_super) {
    __extends(CustomValidators, _super);
    function CustomValidators() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // create static method for your validation
    CustomValidators.validateCharacters = function (control) {
        // first check if the control has a value
        if (control.value && control.value.length > 0) {
            // match the control value against the regular expression
            var matches = control.value.match(validCharacters);
            // if there are matches return an object, else return null.
            return matches && matches.length ? { invalid_characters: matches } : null;
        }
        else {
            return null;
        }
    };
    return CustomValidators;
}(forms_1.Validators));
exports.CustomValidators = CustomValidators;
//# sourceMappingURL=custom-validators.js.map