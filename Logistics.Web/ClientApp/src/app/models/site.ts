import { ApprovalTemplate } from './approval-template';
import { HandReceipt } from './hand-receipt';
import { NsnItem, SoftwareItem } from './item';
import { ItemGroup } from './item-group';
import { LogUser } from './log-user';
import { PropertyRecord } from './property-record';
import { Request } from './request';

export class Site {
  id: number;
  name: string;
  isDeleted: boolean;
  approvalTemplates: ApprovalTemplate[];
  handReceipts: HandReceipt[];
  itemGroups: ItemGroup[];
  logUsers: LogUser[];
  nsnItems: NsnItem[];
  propertyRecords: PropertyRecord[];
  requests: Request[];
  softwareItems: SoftwareItem[];
}
