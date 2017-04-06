import {User} from "./user.model";
export class Session {
  id: string;
  title: string;
  description: string;
  slug: string;
  startTime: string;
  endTime: string;
  costType: number;
  members: User[] = [];
}
