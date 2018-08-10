import { Approver } from './approver';
import { FundUser } from './fund-user';
import { HandReceipt } from './hand-receipt';
import { HandReceiptVerification } from './hand-receipt-verification';
import { Inventory } from './inventory';
import { InventoryVerification } from './inventory-verification';
import { ItemDecommission } from './item-decommission';
import { ItemDecommissionVerification } from './item-decommission-verification';
import { ItemGroup } from './item-group';
import { ItemGroupApproval } from './item-group-approval';
import { ItemReceipt } from './item-receipt';
import { LogUser } from './log-user';
import { Order } from './order';
import { PropertyCustodian } from './property-custodian';
import { Request } from './request';
import { Transfer } from './transfer';
import { TransferReceipt } from './transfer-receipt';

export class User {
  id: number;
  guid: string;
  username: string;
  email: string;
  isAdmin: boolean;
  isDeleted: boolean;

  approvers: Approver[];
  fundUsers: FundUser[];
  handReceipts: HandReceipt[];
  logHandReceiptVerifications: HandReceiptVerification[];
  recordHandReceiptVerification: HandReceiptVerification[];
  inventories: Inventory [];
  inventoryVerifications: InventoryVerification[];
  itemDecommissions: ItemDecommission[];
  itemDecommissionVerifications: ItemDecommissionVerification[];
  itemGroups: ItemGroup[];
  itemGroupApprovals: ItemGroupApproval[];
  itemReceipts: ItemReceipt[];
  logUsers: LogUser[];
  orders: Order[];
  propertyCustodians: PropertyCustodian[];
  requests: Request[];
  transfers: Transfer[];
  transferReceipts: TransferReceipt[];
}
