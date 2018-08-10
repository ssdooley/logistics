import { Order } from './order';

export class Vendor {
  id: number;
  name: string;
  contact: string;
  phone: string;
  website: string;
  email: string;
  isDeleted: boolean;
  orders: Order[];
}
