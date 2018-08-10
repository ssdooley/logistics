import { Item } from './item';
import { ItemDecommissionVerification } from './item-decommission-verification';
import { User } from './user';

export class ItemDecommission {
  id: number;
  itemId: number;
  userId: number;
  remarks: string;
  isVerified: boolean;
  decommissionDate: Date;
  item: Item;
  itemDecommissionVerification: ItemDecommissionVerification;
  user: User;
}
