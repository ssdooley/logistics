import { Inventory } from './inventory';
import { HardwareItem, SerializedItem } from './item';
import { PropertyCustodian } from './property-custodian';
import { Site } from './site';
import { Transfer } from './transfer';

export class PropertyRecord {
  id: number;
  siteId: number;
  name: string;
  site: Site;
  hardwareItems: HardwareItem[];
  inventories: Inventory[];
  propertyCustodians: PropertyCustodian[];
  serializedItems: SerializedItem[];
  destinationTransfers: Transfer[];
  originTransfers: Transfer[];
}
