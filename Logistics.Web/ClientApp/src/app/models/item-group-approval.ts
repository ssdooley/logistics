import { ApprovalGroup } from './approval-group';
import { ItemGroup } from './item-group';
import { User } from './user';

export class ItemGroupApproval {
  id: number;
  itemGroupId: number;
  approvalGroupId: number;
  userId?: number;
  isApproved: boolean;
  isRejected: boolean;
  isPostponed: boolean;
  postponedUntil?: Date;
  dateApproved?: Date;
  approvalGroup: ApprovalGroup;
  itemGroup: ItemGroup;
  user: User;
}
