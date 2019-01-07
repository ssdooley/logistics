"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PurchaseRequestService = /** @class */ (function () {
    function PurchaseRequestService(http, snacker) {
        var _this = this;
        this.http = http;
        this.snacker = snacker;
        this.requests = new rxjs_1.BehaviorSubject(null);
        this.requests$ = this.requests.asObservable();
        this.trackRequests = function (request) { return request.id; };
        this.getPurchaseRequests = function () { return _this.http.get('/api/request/getPurchaseRequests')
            .subscribe(function (data) { return _this.requests.next(data); }, function (err) { return _this.snacker.sendErrorMessage(err.error); }); };
        this.getPurchaseRequest = function (id) { return _this.http.get("api/request/getPurchaseRequest/" + id)
            .subscribe(function (data) { return _this.requests.next(data); }, function (err) { return _this.snacker.sendErrorMessage(err.error); }); };
    }
    PurchaseRequestService = __decorate([
        core_1.Injectable()
    ], PurchaseRequestService);
    return PurchaseRequestService;
}());
exports.PurchaseRequestService = PurchaseRequestService;
//# sourceMappingURL=purchase-request.service.js.map