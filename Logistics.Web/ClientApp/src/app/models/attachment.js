"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Attachment = /** @class */ (function () {
    function Attachment() {
    }
    return Attachment;
}());
exports.Attachment = Attachment;
var OrderAttachment = /** @class */ (function (_super) {
    __extends(OrderAttachment, _super);
    function OrderAttachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OrderAttachment;
}(Attachment));
exports.OrderAttachment = OrderAttachment;
var RequestAttachment = /** @class */ (function (_super) {
    __extends(RequestAttachment, _super);
    function RequestAttachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestAttachment;
}(Attachment));
exports.RequestAttachment = RequestAttachment;
//# sourceMappingURL=attachment.js.map