import { ApprovalGroup } from './approval-group';
import { User } from './user';

export class Approver {
  id: number;
  approvalGroupId: number;
  userId: number;
  approvalGroup: ApprovalGroup;
  user: User;
}
