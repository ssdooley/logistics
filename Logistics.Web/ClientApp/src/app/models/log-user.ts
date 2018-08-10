import { Site } from './site';
import { User } from './user';

export class LogUser {
  id: number;
  siteId: number;
  userId: number;
  site: Site;
  user: User;
}
