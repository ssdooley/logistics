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
var dialogs_1 = require("../../../dialogs");
var PurchaseRequestComponent = /** @class */ (function () {
    function PurchaseRequestComponent(dialog, service, priorityService, siteService, regulationService, attachmentService) {
        this.dialog = dialog;
        this.service = service;
        this.priorityService = priorityService;
        this.siteService = siteService;
        this.regulationService = regulationService;
        this.attachmentService = attachmentService;
        this.selectedPriority = new models_1.Priority();
        this.selectedSite = new models_1.Site();
        this.itemsArray = new Array();
        this.regCount = 0;
        this.newRequest = new models_1.Request();
        this.uploading = false;
    }
    PurchaseRequestComponent.prototype.ngOnInit = function () {
        this.service.getPurchaseRequests();
        this.priorityService.getPriorities();
        this.siteService.getSites();
        this.regulationService.getAuthorizedRegulations();
        this.attachmentService.getAttachments();
    };
    PurchaseRequestComponent.prototype.addPurchaseRequest = function () {
        this.service.addPurchaseRequest(this.newRequest);
    };
    PurchaseRequestComponent.prototype.addMission = function (event) {
        this.newRequest.mission = event.name;
        console.log(this.newRequest.mission);
    };
    PurchaseRequestComponent.prototype.addJustification = function () {
        var _this = this;
        this.dialog.open(dialogs_1.JustificationDialog, {
            data: this.service, width: '550px'
        })
            .afterClosed()
            .subscribe(function (result) {
            _this.test = result;
            if (_this.regCount > 0) {
                _this.regString.concat(result);
                _this.regCount++;
                var space = "\r\n";
                _this.regConcat = _this.regString.concat(space, _this.test);
                _this.regString = _this.regConcat;
                _this.newRequest.justifications = _this.regString;
            }
            if (_this.regCount <= 0) {
                _this.regString = result;
                _this.newRequest.justifications = _this.regString;
                _this.regCount++;
            }
        });
    };
    PurchaseRequestComponent.prototype.addItems = function () {
        var _this = this;
        this.dialog.open(dialogs_1.RequestItemsDialog, { data: this.service, width: '850px' })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.newRequest.requestItems.push(result);
                _this.itemsArray.push(result);
            }
            if (!result) {
                console.log("No Items came back from the dialog");
            }
        });
    };
    PurchaseRequestComponent.prototype.removeItem = function ($event) {
        this.newRequest.requestItems.splice($event);
        console.log($event);
    };
    PurchaseRequestComponent.prototype.filesChanged = function (data) {
        this.files = data[0];
        this.formData = data[1];
    };
    //uploadFiles()  {
    //  if ((this.files && this.files.length > 0) && this.formData) {
    //    this.uploading = true;
    //    const res = this.attachmentService.uploadRequestAttachments(this.newRequest.id, this.formData);
    //    console.log(this.formData);
    //    this.uploading = false;
    //    if (res) {
    //      this.clearFiles();
    //    }
    //  }
    //}
    PurchaseRequestComponent.prototype.clearFiles = function () {
        this.files = null;
        this.formData = null;
    };
    PurchaseRequestComponent = __decorate([
        core_1.Component({
            selector: 'purchase-request',
            templateUrl: 'purchase-request.component.html',
            styleUrls: ['purchase-request.component.css'],
            providers: [services_1.PurchaseRequestService, services_1.PriorityService, services_1.SiteService, services_1.AuthorizedRegulationService, services_1.AttachmentService]
        })
    ], PurchaseRequestComponent);
    return PurchaseRequestComponent;
}());
exports.PurchaseRequestComponent = PurchaseRequestComponent;
//# sourceMappingURL=purchase-request.component.js.map