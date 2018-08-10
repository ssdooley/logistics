import { Inventory } from './inventory';
import { Item } from './item';

export class InventoryItem {
  id: number;
  inventoryId: number;
  itemId: number;
  isAccounted: boolean;
  isMissing: boolean;
  remarks: string;
  inventory: Inventory;
  item: Item;
}
