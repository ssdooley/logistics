import { RequestAttachment } from './attachment';
import { ItemGroup } from './item-group';
import { Priority } from './priority';
import { RequestItem } from './request-item';
import { Site } from './site';
import { User } from './user';

export class Request {
  id: number;
  priorityId: number;
  siteId: number;
  userId: number;
  guid: string;
  subject: string;
  requirement: string;
  authorizedRegulation: string;
  dateSubmitted: Date;
  lastModified: Date;
  isRecurring: boolean;
  renewalDate?: Date;
  isApproved: boolean;
  isComplete: boolean;
  priority: Priority;
  site: Site;
  user: User;
  itemGroups: ItemGroup[];
  requestAttachments: RequestAttachment[];
  requestItems: RequestItem[];
}
