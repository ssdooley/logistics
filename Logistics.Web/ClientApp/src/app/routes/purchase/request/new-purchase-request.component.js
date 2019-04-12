"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../../../services");
var models_1 = require("../../../models");
var dialogs_1 = require("../../../dialogs");
var NewPurchaseRequestComponent = /** @class */ (function () {
    function NewPurchaseRequestComponent(dialog, service, priorityService, siteService, regulationService, attachmentService, snacker) {
        this.dialog = dialog;
        this.service = service;
        this.priorityService = priorityService;
        this.siteService = siteService;
        this.regulationService = regulationService;
        this.attachmentService = attachmentService;
        this.snacker = snacker;
        this.selectedPriority = new models_1.Priority();
        this.selectedSite = new models_1.Site();
        this.itemsArray = new Array();
        this.regCount = 0;
        this.newRequest = new models_1.Request();
        this.uploading = false;
        this.colorWarn = 'warn';
        this.colorPrimary = 'primary';
    }
    NewPurchaseRequestComponent.prototype.ngOnInit = function () {
        this.service.getPurchaseRequests();
        this.priorityService.getPriorities();
        this.siteService.getSites();
        this.regulationService.getAuthorizedRegulations();
        this.attachmentService.getAttachments();
    };
    NewPurchaseRequestComponent.prototype.addPurchaseRequest = function (formData) {
        this.service.addPurchaseRequest(this.newRequest, formData);
    };
    NewPurchaseRequestComponent.prototype.addMission = function (event) {
        this.newRequest.mission = event.name;
        console.log(this.newRequest.mission);
    };
    NewPurchaseRequestComponent.prototype.addJustification = function () {
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
    NewPurchaseRequestComponent.prototype.addItems = function () {
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
    NewPurchaseRequestComponent.prototype.editItem = function (item) {
        var _this = this;
        this.dialog.open(dialogs_1.EditItemsDialog, { data: item, width: '850px' })
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                _this.removeItem(item);
                _this.newRequest.requestItems.push(result);
                _this.itemsArray.push(result);
            }
            if (!result) {
                console.log("No Items came back from the dialog");
            }
        });
    };
    NewPurchaseRequestComponent.prototype.exportToExcel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.exportRequests()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewPurchaseRequestComponent.prototype.removeItem = function (item) {
        //this.newRequest.requestItems.splice(item);
        console.log(item);
        var index = this.newRequest.requestItems.indexOf(item);
        console.log(index);
        this.newRequest.requestItems.splice(index, 1);
    };
    NewPurchaseRequestComponent.prototype.fileChange = function (files) {
        var fileNames = new Array();
        if (this.service.fileNames.value.length > 0 && files[0].length == 1) {
            this.snacker.sendErrorMessage("If you wish to upload multiple files, they must be selected at the same time");
        }
        if (files[0].length > 1 && this.service.fileNames.value.length > 0
            || this.service.fileNames.value.length == 0) {
            for (var i = 0; i < files[0].length; i++) {
                fileNames.push(files[0].item(i).name);
                console.log(files[0]);
            }
            this.service.fileNames.next(fileNames);
            this.service.files.next(files[1]);
        }
    };
    NewPurchaseRequestComponent.prototype.uploadFiles = function () {
        if ((this.files && this.files.length > 0) && this.formData) {
            this.uploading = true;
            var res = this.attachmentService.uploadRequestAttachments(this.newRequest.id, this.formData);
            console.log(this.formData);
            this.uploading = false;
            if (res) {
                this.clearFiles();
            }
        }
    };
    NewPurchaseRequestComponent.prototype.clearFiles = function () {
        this.files = null;
        this.formData = null;
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], NewPurchaseRequestComponent.prototype, "fileInput", void 0);
    NewPurchaseRequestComponent = __decorate([
        core_1.Component({
            selector: 'new-purchase-request',
            templateUrl: 'new-purchase-request.component.html',
            styleUrls: ['new-purchase-request.component.css'],
            providers: [services_1.PurchaseRequestService, services_1.PriorityService, services_1.SiteService, services_1.AuthorizedRegulationService, services_1.AttachmentService]
        })
    ], NewPurchaseRequestComponent);
    return NewPurchaseRequestComponent;
}());
exports.NewPurchaseRequestComponent = NewPurchaseRequestComponent;
//# sourceMappingURL=new-purchase-request.component.js.map