import { ApprovalTemplateGroup } from './approval-template-group';
import { Site } from './site';

export class ApprovalTemplate {
  id: number;
  siteId: number;
  name: string;
  site: Site;
  approvalTemplateGroups: ApprovalTemplateGroup[];
}
