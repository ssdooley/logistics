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
var material_1 = require("@angular/material");
var EditItemsDialog = /** @class */ (function () {
    function EditItemsDialog(dialog, data, service, snacker) {
        this.dialog = dialog;
        this.data = data;
        this.service = service;
        this.snacker = snacker;
        this.newItem = new models_1.RequestItem();
        this.costPattern = "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$";
        this.numPattern = "^[1-9]+$";
    }
    EditItemsDialog.prototype.ngOnInit = function () {
        this.newItem = this.data;
    };
    EditItemsDialog.prototype.existRequestItems = function () {
        this.dialog.close();
    };
    EditItemsDialog.prototype.onSubmit = function (f) {
        //console.log(f.value);
        //console.log(f.valid);
    };
    EditItemsDialog.prototype.addRequestItem = function () {
        this.dialog.close(this.newItem);
    };
    EditItemsDialog = __decorate([
        core_1.Component({
            selector: 'edit-items.dialog',
            templateUrl: 'edit-items.dialog.html',
            providers: [services_1.PurchaseRequestService]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], EditItemsDialog);
    return EditItemsDialog;
}());
exports.EditItemsDialog = EditItemsDialog;
//# sourceMappingURL=edit-items.dialog.js.map