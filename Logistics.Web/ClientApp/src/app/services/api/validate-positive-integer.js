"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validatePositiveInt(c) {
    var positiveInt_RegExp = /^[1-9]\d*$/;
    return positiveInt_RegExp.test(c.value) ? null : {
        validatePositiveInt: {
            valid: false
        }
    };
}
//# sourceMappingURL=validate-positive-integer.js.map