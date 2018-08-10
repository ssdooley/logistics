import { FundingAccount } from './funding-account';
import { Order } from './order';
import { User } from './user';

export class FundTransaction {
  id: number;
  fundingAccountid: number;
  orderId?: number;
  userId: number;
  label: string;
  amount: number;
  transactionDate: Date;
  fundingAccount: FundingAccount;
  order?: Order;
  user: User;
}
