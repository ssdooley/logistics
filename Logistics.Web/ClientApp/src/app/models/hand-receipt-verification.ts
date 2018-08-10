import { HandReceipt } from './hand-receipt';
import { User } from './user';

export class HandReceiptVerification {
  id: number;
  handReceiptId: number;
  logUserId: number;
  recordUserId?: number;
  remarks: string;
  dateModified: Date;
  dateVerified: Date;
  handReceipt: HandReceipt;
  logUser: User;
  recordUser: User;
}
