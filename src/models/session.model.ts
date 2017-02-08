import {User} from "./user.model";
import {SessionCost} from "./session-cost.model";
export class Session {
  name: string;
  startTime: string;
  endTime: string;
  members: User[] = [];
  costExcluded: User[] = [];
  sessionCost: SessionCost;

  constructor(name: string, startTime: string, endTime: string){
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
