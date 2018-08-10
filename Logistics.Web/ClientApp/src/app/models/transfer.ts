import { PropertyRecord } from './property-record';
import { TransferItem } from './transfer-item';
import { TransferReceipt } from './transfer-receipt';
import { User } from './user';

export class Transfer {
  id: number;
  destinationRecordId: number;
  originRecordId: number;
  userId: number;
  remarks: string;
  isReceived: boolean;
  transferDate: Date;
  destinationRecord: PropertyRecord;
  originRecord: PropertyRecord;
  transferReceipt: TransferReceipt;
  user: User;
  transferItems: TransferItem[];
}
