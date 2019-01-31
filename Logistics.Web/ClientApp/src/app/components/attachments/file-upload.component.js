"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent() {
        this.allowMultiple = true;
        this.buttonColor = 'primary';
        this.inputLabel = 'Browse...';
        this.selected = new core_1.EventEmitter();
    }
    FileUploadComponent.prototype.fileChange = function (event) {
        var files = event.target.files;
        var fileList = new Array();
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append(files.item(i).name, files.item(i));
            fileList.push(files.item(i));
        }
        this.selected.emit([fileList, formData]);
        this.fileInput.nativeElement.value = null;
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], FileUploadComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "allowMultiple", void 0);
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "buttonColor", void 0);
    __decorate([
        core_1.Input()
    ], FileUploadComponent.prototype, "inputLabel", void 0);
    __decorate([
        core_1.Output()
    ], FileUploadComponent.prototype, "selected", void 0);
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'file-upload',
            templateUrl: 'file-upload.component.html',
            styleUrls: ['file-upload.component.css']
        })
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.component.js.map