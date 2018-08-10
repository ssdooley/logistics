import { HandReceiptItem } from './hand-receipt-item';
import { InventoryItem } from './inventory-item';
import { ItemCategory } from './item-category';
import { ItemDecommission } from './item-decommission';
import { ItemReceipt } from './item-receipt';
import { Manufacturer } from './manufacturer';
import { Order } from './order';
import { PropertyRecord } from './property-record';
import { Site } from './site';
import { TransferItem } from './transfer-item';

export class Item {
  id: number;
  orderId?: number;
  itemCategoryId: number;
  manufacturerId: number;
  model: string;
  nsn: string;
  itemType: string;
  isDecommissioned: boolean;
  itemCategory: ItemCategory;
  itemDecommission: ItemDecommission;
  manufacturer: Manufacturer;
  order?: Order;
  inventryItems: InventoryItem[];
  itemReceipts: ItemReceipt[];
  transferItems: TransferItem[];
}

export class SerializedItem extends Item {
  propertyRecordId: number;
  serialNumber: string;
  location: string;
  propertyRecord: PropertyRecord;
}

export class HardwareItem extends Item {
  propertyRecordId: number;
  serviceTag: string;
  macAddress: string;
  location: string;
  propertyRecord: PropertyRecord;
}

export class SoftwareItem extends Item {
  siteId: number;
  license: string;
  users: number;
  site: Site;
}

export class NsnItem extends Item {
  siteId: number;
  quantity: number;
  site: Site;
  handReceiptItems: HandReceiptItem[];
}
