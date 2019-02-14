"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
function getFormValidationErrors(controls) {
    var errors = [];
    Object.keys(controls).forEach(function (key) {
        var control = controls[key];
        if (control instanceof forms_1.FormGroup) {
            errors = errors.concat(getFormValidationErrors(control.controls));
        }
        var controlErrors = controls[key].errors;
        if (controlErrors !== null) {
            Object.keys(controlErrors).forEach(function (keyError) {
                errors.push({
                    control_name: key,
                    error_name: keyError,
                    error_value: controlErrors[keyError]
                });
            });
        }
    });
    return errors;
}
exports.getFormValidationErrors = getFormValidationErrors;
//# sourceMappingURL=get-form-validation-errors.js.map