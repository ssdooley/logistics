"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("../../services");
var models_1 = require("../../models");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var RequestItemsDialog = /** @class */ (function () {
    function RequestItemsDialog(dialog, data, service, snacker, formService, form) {
        this.dialog = dialog;
        this.data = data;
        this.service = service;
        this.snacker = snacker;
        this.formService = formService;
        this.form = form;
        this.newItem = new models_1.RequestItem();
        this.formErrors = {
            partNumber: '',
            name: '',
            qnty: '',
            cost: '',
        };
        this.costPattern = "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$";
    }
    RequestItemsDialog.prototype.ngOnInit = function () {
        this.buildForm();
        //this.service.getRequestItems(this.data.id);
    };
    RequestItemsDialog.prototype.existRequestItems = function () {
        this.dialog.close();
    };
    RequestItemsDialog.prototype.signUp = function (data) {
        // mark all fields as touched
        this.formService.markFormGroupTouched(this.itemsForm);
        // right before we submit our form to the server we check if the form is valid
        // if not, we pass the form to the validateform function again. Now with check dirty false
        // this means we check every form field independent of wether it's touched
        if (this.itemsForm.valid) {
            this.newItem.partNumber = data.partNumber;
            this.snacker.sendSuccessMessage('Succesfully submitted a valid form PartNumber: ' + this.newItem.partNumber);
            this.itemsForm.reset();
        }
        else {
            this.formErrors = this.formService.validateForm(this.itemsForm, this.formErrors, false);
            this.snacker.sendErrorMessage('The form is not Valid');
        }
    };
    // build the user edit form
    RequestItemsDialog.prototype.buildForm = function () {
        var _this = this;
        this.itemsForm = this.form.group({
            partNumber: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            qnty: ['', [forms_1.Validators.required, services_1.CustomValidators.validateCharacters]],
            cost: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.costPattern)]]
        });
        // on each value change we call the validateForm function
        // We only validate form controls that are dirty, meaning they are touched
        // the result is passed to the formErrors object
        this.itemsForm.valueChanges.subscribe(function (data) {
            _this.formErrors = _this.formService.validateForm(_this.itemsForm, _this.formErrors, true);
        });
    };
    RequestItemsDialog.prototype.addRequestItem = function (data) {
        if (this.itemsForm.invalid) {
            this.formErrors = this.formService.validateForm(this.itemsForm, this.formErrors, false);
            this.snacker.sendErrorMessage("Form is Invalid");
            return;
        }
        if (!this.itemsForm.invalid) {
            this.newItem.partNumber = data.partNumber;
            this.newItem.name = data.name;
            this.newItem.quantity = data.qnty;
            this.newItem.cost = data.cost;
            this.dialog.close(this.newItem);
        }
    };
    RequestItemsDialog = __decorate([
        core_1.Component({
            selector: 'request-items.dialog',
            templateUrl: 'request-items.dialog.html',
            providers: [services_1.PurchaseRequestService]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], RequestItemsDialog);
    return RequestItemsDialog;
}());
exports.RequestItemsDialog = RequestItemsDialog;
//# sourceMappingURL=request-items.dialog.js.map