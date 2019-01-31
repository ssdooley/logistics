import { ConfirmDialog } from './confirm.dialog';
import { UserBinDialog } from './bins/admin/user-bin.dialog';
import { SiteBinDialog } from './bins/admin/site-bin.dialog';
import { PriorityBinDialog } from './bins/admin/priority-bin.dialog';
import { ItemCategoryBinDialog } from './bins/admin/item-category-bin.dialog';
import { ManufacturerBinDialog } from './bins/admin/manufacturer-bin.dialog';
import { VendorBinDialog } from './bins/admin/vendor-bin.dialog';
import { VendorUpdateDialog } from './updates/vendor-update.dialog';
import { AuthorizedRegulationBinDialog } from './bins/admin/authorized-regulation-bin.dialog';
import { JustificationDialog } from './justifications/justifications.dialog';
import { RequestItemsDialog } from './request-items/request-items.dialog';

export const Dialogs = [
  ConfirmDialog,
  UserBinDialog,
  SiteBinDialog,
  PriorityBinDialog,
  ItemCategoryBinDialog,
  ManufacturerBinDialog,
  VendorBinDialog,
  VendorUpdateDialog,
  AuthorizedRegulationBinDialog,
  JustificationDialog,
  RequestItemsDialog
];

export * from './confirm.dialog';
export * from './bins/admin/user-bin.dialog';
export * from './bins/admin/site-bin.dialog';
export * from './bins/admin/priority-bin.dialog';
export * from './bins/admin/item-category-bin.dialog';
export * from './bins/admin/manufacturer-bin.dialog';
export * from './bins/admin/vendor-bin.dialog';
export * from './updates/vendor-update.dialog';
export * from './bins/admin/authorized-regulation-bin.dialog';
export * from './justifications/justifications.dialog';
export * from './request-items/request-items.dialog';
