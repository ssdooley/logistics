import { Inventory } from './inventory';
import { User } from './user';

export class InventoryVerification {
  id: number;
  inventoryId: number;
  userId: number;
  remarks: string;
  verificationDate: Date;
  inventory: Inventory;
  user: User;
}
