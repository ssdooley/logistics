import { HandReceipt } from './hand-receipt';
import { NsnItem } from './item';

export class HandReceiptItem {
  id: number;
  handReceiptItem: number;
  itemId: number;
  quantity: number;
  handReceipt: HandReceipt;
  nsnItem: NsnItem;
}
