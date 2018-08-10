import { FundingAccount } from './funding-account';
import { ItemGroupApproval } from './item-group-approval';
import { ItemGroupCategory } from './item-group-category';
import { Order } from './order';
import { Request } from './request';
import { RequestItem } from './request-item';
import { Site } from './site';
import { User } from './user';

export class ItemGroup {
  id: number;
  fundingAccountId: number;
  itemGroupCategoryId: number;
  requestId: number;
  siteId: number;
  userId: number;
  fundingAccount: FundingAccount;
  itemGroupCategory: ItemGroupCategory;
  request: Request;
  site: Site;
  user: User;
  itemGroupApprovals: ItemGroupApproval[];
  orders: Order[];
  requestItems: RequestItem[];
}
