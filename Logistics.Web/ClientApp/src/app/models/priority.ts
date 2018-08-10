import { Request } from './request';

export class Priority {
  id: number;
  label: string;
  isDeleted: boolean;
  requests: Request[];
}
