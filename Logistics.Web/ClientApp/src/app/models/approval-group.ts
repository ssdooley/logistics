import { ApprovalTemplateGroup } from './approval-template-group';
import { Approver } from './approver';
import { ItemGroupApproval } from './item-group-approval';

export class ApprovalGroup {
  id: number;
  label: string;
  isLocal: boolean;
  isCommander: boolean;
  approvalTemplateGroups: ApprovalTemplateGroup[];
  approvers: Approver[];
  itemGroupApprovals: ItemGroupApproval[];
}
