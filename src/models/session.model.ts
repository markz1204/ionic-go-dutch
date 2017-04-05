import {User} from "./user.model";
export class Session {
  id: string;
  name: string;
  slug: string;
  startTime: string;
  endTime: string;
  costType: number;
  members: User[] = [];
}
