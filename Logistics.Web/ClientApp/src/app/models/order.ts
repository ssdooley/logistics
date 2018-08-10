import { OrderAttachment } from './attachment';
import { FundTransaction } from './fund-transaction';
import { Item } from './item';
import { ItemGroup } from './item-group';
import { User } from './user';
import { Vendor } from './vendor';

export class Order {
  id: number;
  itemGroupId: number;
  userId: number;
  vendorId: number;
  cost: number;
  tranckingNumber: string;
  remarks: string;
  orderDate: Date;
  isReceived: boolean;
  itemGroup: ItemGroup;
  user: User;
  vendor: Vendor;
  fundTransactions: FundTransaction[];
  items: Item[];
  orderAttachments: OrderAttachment[];
}
