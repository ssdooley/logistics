import { Request } from './request';

export class AuthorizedRegulation {
  id: number;
  name: string;
  reference: string;
  isDeleted: boolean;
  requests: Request[];
}
