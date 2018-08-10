import { InventoryItem } from './inventory-item';
import { InventoryVerification } from './inventory-verification';
import { PropertyRecord } from './property-record';
import { User } from './user';

export class Inventory {
  id: number;
  propertyRecordId: number;
  userId: number;
  dateStarted: Date;
  remarks: string;
  inventoryVerification: InventoryVerification;
  propertyRecord: PropertyRecord;
  user: User;
  inventoryItems: InventoryItem[];
}
