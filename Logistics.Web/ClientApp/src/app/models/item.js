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
var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());
exports.Item = Item;
var SerializedItem = /** @class */ (function (_super) {
    __extends(SerializedItem, _super);
    function SerializedItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SerializedItem;
}(Item));
exports.SerializedItem = SerializedItem;
var HardwareItem = /** @class */ (function (_super) {
    __extends(HardwareItem, _super);
    function HardwareItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HardwareItem;
}(Item));
exports.HardwareItem = HardwareItem;
var SoftwareItem = /** @class */ (function (_super) {
    __extends(SoftwareItem, _super);
    function SoftwareItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SoftwareItem;
}(Item));
exports.SoftwareItem = SoftwareItem;
var NsnItem = /** @class */ (function (_super) {
    __extends(NsnItem, _super);
    function NsnItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NsnItem;
}(Item));
exports.NsnItem = NsnItem;
//# sourceMappingURL=item.js.map