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
var JustificationDialog = /** @class */ (function () {
    function JustificationDialog(dialog, data, service, requestService) {
        this.dialog = dialog;
        this.data = data;
        this.service = service;
        this.requestService = requestService;
        this.selectedJustification = new models_1.AuthorizedRegulation();
        this.justification = [];
        this.newReg = new models_1.AuthorizedRegulation();
    }
    JustificationDialog.prototype.ngOnInit = function () {
        this.service.getAuthorizedRegulations();
    };
    JustificationDialog.prototype.exitJustification = function () {
        this.dialog.close();
    };
    JustificationDialog.prototype.addJustification = function (reg) {
        this.test = this.newReg.name + " : " + this.newReg.reference;
        this.newReg.name = reg.name;
        this.newReg.reference = reg.reference;
        this.regString = this.justification.toString();
        this.dialog.close(this.newReg.name.toString() + " : " + this.newReg.reference.toString());
    };
    JustificationDialog = __decorate([
        core_1.Component({
            selector: 'justification',
            templateUrl: 'justifications.dialog.html',
            providers: [services_1.AuthorizedRegulationService]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], JustificationDialog);
    return JustificationDialog;
}());
exports.JustificationDialog = JustificationDialog;
//# sourceMappingURL=justifications.dialog.js.map