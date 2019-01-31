import { Order } from './order';
import { Request } from './request';
import { User } from './user';

export class Attachment {
  id: number;
  userId: number;
  file: string;
  path: string;
  url: string;
  name: string;
  attachmentType: string;
  dateUploaded: Date;
  isDeleted: boolean;
  user: User;
}

export class OrderAttachment extends Attachment {
  orderId: number;
  order: Order;
}

export class RequestAttachment extends Attachment {
  requestId: number;
  request: Request;
}
