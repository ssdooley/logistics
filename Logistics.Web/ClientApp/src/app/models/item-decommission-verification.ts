import { ItemDecommission } from './item-decommission';
import { User } from './user';

export class ItemDecommissionVerification {
  id: number;
  itemDecommissionId: number;
  userId: number;
  remarks: string;
  verificationDate: Date;
  itemDecommission: ItemDecommission;
  user: User;
}
