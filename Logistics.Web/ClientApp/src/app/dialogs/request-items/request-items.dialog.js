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
var RequestItemsDialog = /** @class */ (function () {
    function RequestItemsDialog(dialog, data, service) {
        this.dialog = dialog;
        this.data = data;
        this.service = service;
        this.newItem = new models_1.RequestItem();
    }
    RequestItemsDialog.prototype.ngOnInit = function () {
        //this.service.getRequestItems(this.data.id);
    };
    RequestItemsDialog.prototype.existRequestItems = function () {
        this.dialog.close();
    };
    RequestItemsDialog.prototype.addRequestItem = function (item) {
        this.dialog.close(item);
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