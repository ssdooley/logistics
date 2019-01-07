"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ADUser = /** @class */ (function () {
    function ADUser() {
    }
    Object.defineProperty(ADUser.prototype, "filter", {
        get: function () { return "" + this.displayName; },
        enumerable: true,
        configurable: true
    });
    return ADUser;
}());
exports.ADUser = ADUser;
//# sourceMappingURL=adUser.js.map