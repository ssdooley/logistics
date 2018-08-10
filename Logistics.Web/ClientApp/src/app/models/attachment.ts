import { Order } from './order';
import { Request } from './request';
import { User } from './user';

export class Attachment {
  id: number;
  userId: number;
  file: string;
  path: string;
  url: string;
  attachmentType: string;
  dateUploaded: Date;
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
