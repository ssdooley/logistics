import { ApprovalGroup } from './approval-group';
import { ApprovalTemplate } from './approval-template';

export class ApprovalTemplateGroup {
  id: number;
  approvalGroupId: number;
  approvalTemplateId: number;
  approvalGroup: ApprovalGroup;
  approvalTemplate: ApprovalTemplate;
}
