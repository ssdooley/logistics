import { ItemGroup } from './item-group';

export class RequestItem {
  id: number;
  itemGroupId?: number;
  requestId: number;
  name: string;
  partNumber: string;
  cost: number;
  quantity: number;
  itemGroup?: ItemGroup;
  request: Request;
}
