import { HandReceiptItem } from './hand-receipt-item';
import { HandReceiptVerification } from './hand-receipt-verification';
import { Site } from './site';
import { User } from './user';

export class HandReceipt {
  id: number;
  siteId: number;
  userId: number;
  remarks: string;
  dateCreated: Date;
  site: Site;
  user: User;
  handReceiptItems: HandReceiptItem[];
  handReceiptVerifications: HandReceiptVerification[];
}
