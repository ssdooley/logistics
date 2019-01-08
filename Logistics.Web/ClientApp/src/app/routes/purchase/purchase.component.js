"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../../services");
var models_1 = require("../../models");
var PurchaseComponent = /** @class */ (function () {
    function PurchaseComponent(dialog, service) {
        this.dialog = dialog;
        this.service = service;
        this.selectedPriority = new models_1.Priority();
        this.selectedSite = new models_1.Site();
        this.selectedMission = ['Red', 'Blue'];
    }
    PurchaseComponent.prototype.ngOnInit = function () {
        this.service.getPurchaseRequests();
        this.service.getRequestItems();
    };
    PurchaseComponent = __decorate([
        core_1.Component({
            selector: 'purchase',
            templateUrl: 'purchase.component.html',
            providers: [services_1.PurchaseRequestService]
        })
    ], PurchaseComponent);
    return PurchaseComponent;
}());
exports.PurchaseComponent = PurchaseComponent;
//# sourceMappingURL=purchase.component.js.map