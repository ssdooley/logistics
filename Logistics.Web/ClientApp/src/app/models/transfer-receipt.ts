import { Transfer } from './transfer';
import { User } from './user';

export class TransferReceipt {
  id: number;
  transferId: number;
  userId: number;
  remarks: string;
  receiptDate: Date;
  transfer: Transfer;
  user: User;
}
