"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var confirm_dialog_1 = require("./confirm.dialog");
var user_bin_dialog_1 = require("./bins/admin/user-bin.dialog");
var site_bin_dialog_1 = require("./bins/admin/site-bin.dialog");
var priority_bin_dialog_1 = require("./bins/admin/priority-bin.dialog");
var item_category_bin_dialog_1 = require("./bins/admin/item-category-bin.dialog");
var manufacturer_bin_dialog_1 = require("./bins/admin/manufacturer-bin.dialog");
var vendor_bin_dialog_1 = require("./bins/admin/vendor-bin.dialog");
var vendor_update_dialog_1 = require("./updates/vendor-update.dialog");
var authorized_regulation_bin_dialog_1 = require("./bins/admin/authorized-regulation-bin.dialog");
var justifications_dialog_1 = require("./justifications/justifications.dialog");
var request_items_dialog_1 = require("./request-items/request-items.dialog");
var edit_items_dialog_1 = require("./request-items/edit-items.dialog");
exports.Dialogs = [
    confirm_dialog_1.ConfirmDialog,
    user_bin_dialog_1.UserBinDialog,
    site_bin_dialog_1.SiteBinDialog,
    priority_bin_dialog_1.PriorityBinDialog,
    item_category_bin_dialog_1.ItemCategoryBinDialog,
    manufacturer_bin_dialog_1.ManufacturerBinDialog,
    vendor_bin_dialog_1.VendorBinDialog,
    vendor_update_dialog_1.VendorUpdateDialog,
    authorized_regulation_bin_dialog_1.AuthorizedRegulationBinDialog,
    justifications_dialog_1.JustificationDialog,
    request_items_dialog_1.RequestItemsDialog,
    edit_items_dialog_1.EditItemsDialog
];
__export(require("./confirm.dialog"));
__export(require("./bins/admin/user-bin.dialog"));
__export(require("./bins/admin/site-bin.dialog"));
__export(require("./bins/admin/priority-bin.dialog"));
__export(require("./bins/admin/item-category-bin.dialog"));
__export(require("./bins/admin/manufacturer-bin.dialog"));
__export(require("./bins/admin/vendor-bin.dialog"));
__export(require("./updates/vendor-update.dialog"));
__export(require("./bins/admin/authorized-regulation-bin.dialog"));
__export(require("./justifications/justifications.dialog"));
__export(require("./request-items/request-items.dialog"));
__export(require("./request-items/edit-items.dialog"));
//# sourceMappingURL=index.js.map