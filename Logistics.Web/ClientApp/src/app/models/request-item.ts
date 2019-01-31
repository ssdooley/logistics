import { Request } from './request'
import { ItemGroup } from './item-group';

export class RequestItem {
  id: number;
  name: string;
  partNumber: string;
  cost: number;
  quantity: number;

  request: Request;
  itemGroup?: ItemGroup;  
}
