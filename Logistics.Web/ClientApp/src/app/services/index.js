"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_service_1 = require("./core.service");
var identity_service_1 = require("./identity.service");
var object_map_service_1 = require("./object-map.service");
var sidepanel_service_1 = require("./sidepanel.service");
var snacker_service_1 = require("./snacker.service");
var theme_service_1 = require("./theme.service");
var authorizedRegulation_service_1 = require("./api/authorizedRegulation.service");
var purchase_request_service_1 = require("./api/purchase-request.service");
var attachment_service_1 = require("./attachment.service");
var form_1 = require("./api/form");
var custom_validators_1 = require("./api/custom-validators");
exports.Services = [
    core_service_1.CoreService,
    identity_service_1.IdentityService,
    object_map_service_1.ObjectMapService,
    sidepanel_service_1.SidepanelService,
    snacker_service_1.SnackerService,
    theme_service_1.ThemeService,
    purchase_request_service_1.PurchaseRequestService,
    authorizedRegulation_service_1.AuthorizedRegulationService,
    attachment_service_1.AttachmentService,
    form_1.FormService,
    custom_validators_1.CustomValidators
];
__export(require("./core.service"));
__export(require("./identity.service"));
__export(require("./object-map.service"));
__export(require("./sidepanel.service"));
__export(require("./snacker.service"));
__export(require("./theme.service"));
__export(require("./api/item-category.service"));
__export(require("./api/log-user.service"));
__export(require("./api/manufacturer.service"));
__export(require("./api/priority.service"));
__export(require("./api/site.service"));
__export(require("./api/vendor.service"));
__export(require("./api/authorizedRegulation.service"));
__export(require("./api/purchase-request.service"));
__export(require("./attachment.service"));
__export(require("./api/form"));
__export(require("./api/custom-validators"));
//# sourceMappingURL=index.js.map