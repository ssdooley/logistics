"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../../../services");
var models_1 = require("../../../models");
var AdminAuthorizedRegulationComponent = /** @class */ (function () {
    function AdminAuthorizedRegulationComponent(dialog, service) {
        this.dialog = dialog;
        this.service = service;
        this.saving = false;
        this.newAuthorizedRegulation = new models_1.AuthorizedRegulation();
    }
    AdminAuthorizedRegulationComponent.prototype.ngOnInit = function () {
        //this.service.getAuthorizedRegulations();
        console.log("from admin authorized regulation oninit");
    };
    AdminAuthorizedRegulationComponent = __decorate([
        core_1.Component({
            selector: 'admin-authorized-regulation',
            templateUrl: 'admin-authorized-regulation.component.html',
            providers: [services_1.AuthorizedRegulationService]
        })
    ], AdminAuthorizedRegulationComponent);
    return AdminAuthorizedRegulationComponent;
}());
exports.AdminAuthorizedRegulationComponent = AdminAuthorizedRegulationComponent;
//# sourceMappingURL=admin-authorized-regulation.component.js.map