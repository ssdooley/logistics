import { PropertyRecord } from './property-record';
import { User } from './user';

export class PropertyCustodian {
  id: number;
  propertyRecordId: number;
  userId: number;
  propertyRecord: PropertyRecord;
  user: User;
}
