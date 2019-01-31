"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var attachment_1 = require("../../models/attachment");
var AttachmentCardComponent = /** @class */ (function () {
    function AttachmentCardComponent() {
        this.file = new attachment_1.Attachment();
    }
    __decorate([
        core_1.Input()
    ], AttachmentCardComponent.prototype, "file", void 0);
    AttachmentCardComponent = __decorate([
        core_1.Component({
            selector: 'attachment-card',
            templateUrl: 'attachment-card.component.html',
            styleUrls: ['attachment-card.component.css']
        })
    ], AttachmentCardComponent);
    return AttachmentCardComponent;
}());
exports.AttachmentCardComponent = AttachmentCardComponent;
//# sourceMappingURL=attachment-card.component.js.map