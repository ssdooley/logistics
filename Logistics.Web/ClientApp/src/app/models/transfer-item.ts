import { Item } from './item';
import { Transfer } from './transfer';

export class TransferItem {
  id: number;
  itemId: number;
  transferId: number;
  item: Item;
  transfer: Transfer;
}
