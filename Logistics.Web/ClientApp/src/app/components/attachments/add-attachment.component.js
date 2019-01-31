"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AddAttachmentComponent = /** @class */ (function () {
    function AddAttachmentComponent() {
        this.selected = new core_1.EventEmitter();
        this.upload = new core_1.EventEmitter();
        this.clear = new core_1.EventEmitter();
        this.uploading = false;
    }
    __decorate([
        core_1.Output()
    ], AddAttachmentComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output()
    ], AddAttachmentComponent.prototype, "upload", void 0);
    __decorate([
        core_1.Output()
    ], AddAttachmentComponent.prototype, "clear", void 0);
    __decorate([
        core_1.Input()
    ], AddAttachmentComponent.prototype, "uploading", void 0);
    __decorate([
        core_1.Input()
    ], AddAttachmentComponent.prototype, "files", void 0);
    AddAttachmentComponent = __decorate([
        core_1.Component({
            selector: 'add-attachment',
            templateUrl: 'add-attachment.component.html',
            styleUrls: ['add-attachment.component.css']
        })
    ], AddAttachmentComponent);
    return AddAttachmentComponent;
}());
exports.AddAttachmentComponent = AddAttachmentComponent;
//# sourceMappingURL=add-attachment.component.js.map