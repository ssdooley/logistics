import { FundTransaction } from './fund-transaction';
import { FundUser } from './fund-user';
import { ItemGroup } from './item-group';

export class FundingAccount {
  id: number;
  name: string;
  fundTransactions: FundTransaction[];
  fundUsers: FundUser[];
  itemGroups: ItemGroup[];
}
