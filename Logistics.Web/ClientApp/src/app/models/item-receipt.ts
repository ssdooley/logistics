import { Item } from './item';
import { User } from './user';

export class ItemReceipt {
  id: number;
  itemId: number;
  userId: number;
  remarks: string;
  receiptDate: Date;
  item: Item;
  user: User;
}
